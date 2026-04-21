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
              Node + Next.js). Built the QA function from the ground up — hired
              and lead a team of 4, designed the automation stack (Playwright +
              WebdriverIO for UI, Postman and a custom Node-based framework for
              APIs), and drove pre-production defect detection above 93%.
              Architected in-house performance testing (StressIQ), introduced
              OWASP / IDOR / RBAC security testing as a first-class QA
              responsibility, and pioneered AI-augmented QA using Claude Code
              daily.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead</h4>
                <h5>Systems Limited · Lahore</h5>
              </div>
              <h3>2020–23</h3>
            </div>
            <p>
              Led QA functions across enterprise engagements. Designed test
              strategy, automation frameworks, and release sign-off processes
              for multi-team programs. Mentored engineers on test automation
              and shift-left practices.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Test Automation Engineer</h4>
                <h5>NorthBay Solutions · Lahore</h5>
              </div>
              <h3>2019–20</h3>
            </div>
            <p>
              Designed automation framework and architecture. Owned performance
              testing strategy and execution across client projects. Introduced
              best practices for scalable, maintainable test suites.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Test Automation Engineer</h4>
                <h5>Soliton Technologies · Lahore</h5>
              </div>
              <h3>2019</h3>
            </div>
            <p>
              Designed automation framework and architecture. Contributed to
              performance testing strategy and delivery across product teams.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Quality Assurance Engineer</h4>
                <h5>CureMD · Lahore</h5>
              </div>
              <h3>2015–19</h3>
            </div>
            <p>
              Created detailed test plans with time estimations. Formulated
              testing strategy for healthcare SaaS products. Built foundational
              QA discipline that informs my approach to quality today.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Education</h4>
                <h5>Lancaster University</h5>
              </div>
              <h3>Degree</h3>
            </div>
            <p>
              Lancaster University · Computer Science-adjacent program. Built
              the engineering foundation that powers a decade of shipping
              reliable software.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
