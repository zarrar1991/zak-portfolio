import { MdArrowOutward, MdCopyright, MdEmail } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Get in touch</h4>
            <p>
              <a
                href="mailto:hello@zarrar.io"
                data-cursor="disable"
                className="contact-email"
              >
                <MdEmail /> hello@zarrar.io
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/zarrarkhan-io/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — zarrarkhan-io
              </a>
            </p>
            <h4>Education</h4>
            <p>
              Lancaster University
            </p>
            <p>
              COMSATS Institute of Information and Technology
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/zarrar1991"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/zarrarkhan-io/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/pulse/developers-develop-qas-destruct-other-truths-startups-zarrar-khan-h8pmf"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Latest Article <MdArrowOutward />
            </a>
            <a
              href="mailto:hello@zarrar.io"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Built by <br /> <span>Zarrar Khan</span>
            </h2>
            <h5>
              <MdCopyright /> 2026 · zarrar.io
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
