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

            // Log all mesh names once so we know what to target by name
            // (kept minimal — comment out in prod if noisy)
            // character.traverse((c: any) => { if (c.isMesh) console.log("mesh:", c.name); });

            const BRAND_ORANGE = new THREE.Color("#FB923C");

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                if (mesh.material) {
                  const name = mesh.name || "";
                  const lowerName = name.toLowerCase();

                  // Keep original template's clothing color overrides
                  if (name === "BODY.SHIRT") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#8B4513");
                    mesh.material = newMat;
                  } else if (name === "Pant") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000000");
                    mesh.material = newMat;
                  }

                  // Surgical: retint ONLY named hat/cap/screen/monitor/screenlight meshes.
                  // We do NOT touch anything else — that caused the whole character to turn orange.
                  const isHat =
                    lowerName === "hat" ||
                    lowerName === "cap" ||
                    lowerName.endsWith("_hat") ||
                    lowerName.endsWith(".hat") ||
                    lowerName.endsWith("_cap") ||
                    lowerName.endsWith(".cap");

                  const isScreen =
                    lowerName === "screen" ||
                    lowerName === "monitor" ||
                    lowerName === "screenlight" ||
                    lowerName.endsWith("_screen") ||
                    lowerName.endsWith(".screen") ||
                    lowerName.endsWith("_monitor") ||
                    lowerName.endsWith(".monitor");

                  if (isHat || isScreen) {
                    const cloned = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    if (cloned.emissive) {
                      cloned.emissive = BRAND_ORANGE.clone();
                    }
                    // Reduce reflectivity of these surfaces so the HDR environment
                    // doesn't project pink onto them.
                    if (typeof cloned.metalness === "number") {
                      cloned.metalness = Math.min(cloned.metalness, 0.2);
                    }
                    if (typeof cloned.envMapIntensity === "number") {
                      cloned.envMapIntensity = 0.2;
                    }
                    mesh.material = cloned;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            resolve(gltf);
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

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
