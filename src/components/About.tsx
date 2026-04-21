import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Full Stack QA Architect with 10+ years of building quality into SaaS
          products — from test automation and performance testing to security
          and production observability. Currently Principal QA at iClosed,
          where I built the QA function from the ground up. On the side, I'm
          building three SaaS products in the QA space: StressIQ (performance
          testing with real telemetry), Spectra (AI-powered test generation
          for UI and API), and a security testing tool that makes OWASP-level
          testing accessible to QA teams without security specialization.
          Deep user of AI-augmented workflows — Claude Code is my daily
          collaborator.
        </p>
      </div>
    </div>
  );
};

export default About;
