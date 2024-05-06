import React from "react";
import "./Contact-us.css";


const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <div className="office-info">
          <h2>Our Offices</h2>
          <div className="office-address">
            <div className="contact-item">
              <span className="contact-label">Head Office:</span>
              <span className="contact-value">
                123 Main Street, Mapusa Goa, India
              </span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Office in Goa:</span>
              <span className="contact-value">
                456 Beach Road, Miramar Goa, India
              </span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Branch Office:</span>
              <span className="contact-value">
                789 Business Street, Panaji Goa, India
              </span>
            </div>
          </div>
        </div>
        <div className="contact-details">
          <h2>Contact Information</h2>
          <div className="contact-item">
            <span className="contact-label">Telephone:</span>
            <span className="contact-value">+91 1234 567890</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <span className="contact-value">info@safar.com</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">WhatsApp:</span>
            <span className="contact-value">9923156756</span>
          </div>
        </div>
      </div>
      <div className="social-media">
        <p>Follow us on social media:</p>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/safarofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://twitter.com/safarofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;
