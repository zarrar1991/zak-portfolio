import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack QA Architect</h4>
                <h5>iClosed · Remote</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading QA architecture and strategy at iClosed (SaaS, React +
              Node + Next.js). Built the QA function from the ground up —
              hired and lead a team of 4, designed the automation stack
              (Playwright + WebdriverIO for UI, Postman and a custom
              Node-based framework for APIs), and drove pre-production defect
              detection above 93%. Architected in-house performance testing
              (StressIQ), introduced OWASP / IDOR / RBAC security testing as
              a first-class QA responsibility, and pioneered AI-augmented QA
              using Claude Code daily.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>QA Lead</h4>
                <h5>Systems Limited</h5>
              </div>
              <h3>2019–22</h3>
            </div>
            <p>
              Led QA functions across enterprise and product engagements.
              Designed test strategy, automation frameworks, and release
              sign-off processes for multi-team programs. Mentored junior QA
              engineers on test automation and shift-left practices.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior QA Engineer</h4>
                <h5>Previous Roles</h5>
              </div>
              <h3>2014–19</h3>
            </div>
            <p>
              10+ years across multiple product and services companies —
              test automation, API testing, performance validation, and
              end-to-end release management. Building the pattern-recognition
              that informs the QA architecture work I do today.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Education</h4>
                <h5>Lancaster University · COMSATS</h5>
              </div>
              <h3>Degree</h3>
            </div>
            <p>
              Lancaster University · Computer Science-adjacent program.
              COMSATS Institute of Information and Technology · Computer
              Science foundation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
