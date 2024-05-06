import React from "react";
import "./Footer.css"; // Relative path to your CSS file
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="/">
            <img src="safarlogo1.png" alt="Safar logo" width="200" height="100"/>
          </a>{" "}
          {/* Add your text here */}
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <a href="https://www.instagram.com/safaroffical">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/safaroffical">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://web.whatsapp.com/send?phone=9923156756">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <p>Contact Us:</p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> +91 1234 567890
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> info@safar.com
          </p>
        </div>
      </div>
      <div className="footer-copyright">
      <p>
        For more details, read our{" "}
        <Link to="/terms-and-conditions">Terms & Conditions</Link>.
      </p>
        <p>&copy; 2024 Safar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
