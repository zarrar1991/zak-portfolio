import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello, I'm</h2>
            <h1>
              ZARRAR
              <br />
              <span>KHAN</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Full Stack QA Architect</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">I break code.</div>
            </h2>
            <h2>
              <div className="landing-h2-info">So your customers don't.</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
