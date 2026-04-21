import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            // ============================
            // FRIENDLY WARM COLOR PALETTE
            // ============================
            const COLORS = {
              SKIN: new THREE.Color("#F4C7A3"),
              HAIR: new THREE.Color("#3E2723"),
              SHIRT: new THREE.Color("#EA7C4F"),
              PANTS: new THREE.Color("#374151"),
              SHOES: new THREE.Color("#4E342E"),
              HAT: new THREE.Color("#1E293B"),
              EYES: new THREE.Color("#2C1810"),
              LIPS: new THREE.Color("#C17052"),
              SCREEN_GLOW: new THREE.Color("#FB923C"),
              HAT_ACCENT: new THREE.Color("#FB923C"),
              BRAND_ORANGE: new THREE.Color("#FB923C"),
            };

            // ========================================================
            // DEBUG: log all mesh names so we know what to target
            // Remove this block once colors are correct
            // ========================================================
            console.groupCollapsed("🎭 Character mesh inventory");
            character.traverse((c: any) => {
              if (c.isMesh) {
                const m = c as THREE.Mesh;
                const mat = m.material as any;
                const color = mat?.color ? `#${mat.color.getHexString()}` : "n/a";
                const emissive = mat?.emissive ? `#${mat.emissive.getHexString()}` : "n/a";
                console.log(
                  `mesh: "${m.name}"  color: ${color}  emissive: ${emissive}  emissiveIntensity: ${mat?.emissiveIntensity ?? 0}`
                );
              }
            });
            console.groupEnd();

            // ========================================================
            // COLOR-BASED PINK DETECTOR (automatic fallback)
            // Detects any pink/magenta material and retints it orange.
            // This catches the hat + monitor + anything else pink,
            // regardless of mesh name.
            // ========================================================
            const isPinkish = (color: THREE.Color | undefined): boolean => {
              if (!color) return false;
              const r = color.r;
              const g = color.g;
              const b = color.b;
              // Pink: high red, high blue, medium-low green
              // Magenta: R ≈ 0.9+, G ≈ 0.4-0.8, B ≈ 0.7-1.0
              const isHighRed = r > 0.5;
              const isHighBlue = b > 0.4;
              const isLowerGreen = g < r && g < b;
              const isPink = isHighRed && isHighBlue && isLowerGreen;
              return isPink;
            };

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                if (mesh.material) {
                  const name = mesh.name || "";
                  const lowerName = name.toLowerCase();
                  const mat = mesh.material as THREE.MeshStandardMaterial;

                  const applyColor = (color: THREE.Color, opts?: {
                    emissive?: THREE.Color;
                    emissiveIntensity?: number;
                    metalness?: number;
                    roughness?: number;
                  }) => {
                    const cloned = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    if (cloned.color) cloned.color = color.clone();
                    if (opts?.emissive && cloned.emissive) {
                      cloned.emissive = opts.emissive.clone();
                      cloned.emissiveIntensity = opts.emissiveIntensity ?? 0.5;
                    }
                    if (typeof cloned.metalness === "number" && typeof opts?.metalness === "number") {
                      cloned.metalness = opts.metalness;
                    }
                    if (typeof cloned.roughness === "number" && typeof opts?.roughness === "number") {
                      cloned.roughness = opts.roughness;
                    }
                    if (typeof cloned.envMapIntensity === "number") {
                      cloned.envMapIntensity = 0.3;
                    }
                    mesh.material = cloned;
                  };

                  // ---------- AUTOMATIC PINK DETECTION ----------
                  // If the material's base color OR emissive is pinkish,
                  // retint to orange. This catches hat and monitor regardless
                  // of mesh name.
                  const baseIsPink = isPinkish(mat.color);
                  const emissiveIsPink = isPinkish(mat.emissive);
                  if (baseIsPink || emissiveIsPink) {
                    const cloned = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    if (baseIsPink && cloned.color) {
                      cloned.color = COLORS.HAT.clone();
                    }
                    if (emissiveIsPink && cloned.emissive) {
                      cloned.emissive = COLORS.BRAND_ORANGE.clone();
                      cloned.emissiveIntensity = Math.max(cloned.emissiveIntensity || 0, 0.3);
                    }
                    if (typeof cloned.metalness === "number") {
                      cloned.metalness = Math.min(cloned.metalness, 0.2);
                    }
                    if (typeof cloned.envMapIntensity === "number") {
                      cloned.envMapIntensity = 0.3;
                    }
                    mesh.material = cloned;
                    console.log(`🎨 retinted pink mesh: "${name}"`);
                    child.castShadow = true;
                    child.receiveShadow = true;
                    (child as THREE.Mesh).frustumCulled = true;
                    return;
                  }

                  // ---------- Hat / cap ----------
                  if (
                    lowerName.includes("hat") ||
                    lowerName.includes("cap") ||
                    lowerName.includes("helmet") ||
                    lowerName.includes("headgear")
                  ) {
                    applyColor(COLORS.HAT, {
                      emissive: COLORS.HAT_ACCENT,
                      emissiveIntensity: 0.15,
                      metalness: 0.1,
                      roughness: 0.8,
                    });
                  }

                  // ---------- Screen / monitor / display ----------
                  else if (
                    lowerName.includes("screen") ||
                    lowerName.includes("monitor") ||
                    lowerName.includes("display") ||
                    lowerName.includes("tv") && !lowerName.includes("tvs") ||
                    lowerName.includes("computer") && !lowerName.includes("computeranim")
                  ) {
                    applyColor(new THREE.Color("#1E293B"), {
                      emissive: COLORS.SCREEN_GLOW,
                      emissiveIntensity: 0.8,
                      metalness: 0.1,
                      roughness: 0.3,
                    });
                  }

                  // ---------- Shirt ----------
                  else if (
                    name === "BODY.SHIRT" ||
                    lowerName.includes("shirt") ||
                    lowerName === "torso" ||
                    lowerName.includes("top") && !lowerName.includes("laptop")
                  ) {
                    applyColor(COLORS.SHIRT, { metalness: 0, roughness: 0.9 });
                  }

                  // ---------- Pants ----------
                  else if (
                    name === "Pant" ||
                    lowerName.includes("pant") ||
                    lowerName.includes("trouser")
                  ) {
                    applyColor(COLORS.PANTS, { metalness: 0, roughness: 0.95 });
                  }

                  // ---------- Skin ----------
                  else if (
                    lowerName.includes("skin") ||
                    lowerName.includes("face") ||
                    (lowerName.includes("head") && !lowerName.includes("headlight") && !lowerName.includes("headgear")) ||
                    lowerName.includes("hand") ||
                    lowerName.includes("neck") ||
                    lowerName.includes("ear")
                  ) {
                    applyColor(COLORS.SKIN, { metalness: 0, roughness: 0.7 });
                  }

                  // ---------- Hair ----------
                  else if (lowerName.includes("hair")) {
                    applyColor(COLORS.HAIR, { metalness: 0, roughness: 0.6 });
                  }

                  // ---------- Eyes ----------
                  else if (lowerName.includes("eye") && !lowerName.includes("eyebrow")) {
                    applyColor(COLORS.EYES, { metalness: 0, roughness: 0.3 });
                  }

                  // ---------- Mouth / lips ----------
                  else if (lowerName.includes("mouth") || lowerName.includes("lip")) {
                    applyColor(COLORS.LIPS, { metalness: 0, roughness: 0.7 });
                  }

                  // ---------- Shoes ----------
                  else if (
                    lowerName.includes("shoe") ||
                    lowerName.includes("foot") && !lowerName.includes("footrest") ||
                    lowerName.includes("boot")
                  ) {
                    applyColor(COLORS.SHOES, { metalness: 0.1, roughness: 0.7 });
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                (child as THREE.Mesh).frustumCulled = true;
              }
            });

            resolve(gltf);
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
