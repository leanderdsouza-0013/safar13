import React from "react";
import { Link } from "react-router-dom";
import "./Services.css"; // Assuming you have a CSS file

function Services() {
  return (
    <div className="services-page">
      <header className="header">
        <div className="logo-container">
          <img src="safarlogo1.png" alt="Safar logo" className="logo2" />
          <a href="/">
            <img src="safarlogo1.png" alt="Safar logo" width="200" height="100"/>
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h3>Our Services</h3>
          <p>
            Welcome to our comprehensive range of transportation solutions
            designed to make your journey seamless and stress-free. At Safar, we
            are dedicated to providing efficient and reliable transportation
            services tailored to meet your diverse needs. Explore our offerings
            below:
          </p>
          <div className="services-list">
            <div className="service">
              <h4>Local Bus Booking</h4>
              <p>
                Say goodbye to the hassle of waiting in long queues or searching
                for transport options. With our easy-to-use platform, you can
                book local buses conveniently, ensuring a comfortable and timely
                commute for your everyday travels.
              </p>
            </div>
            <div className="service">
              <h4>Private Bus Hire</h4>
              <p>
                Planning a special event or group outing? Look no further! Our
                private bus hire services offer a flexible and customizable
                solution to meet your specific requirements. Whether it's a
                corporate event, school trip, or family gathering, we've got you
                covered.
              </p>
            </div>
            <div className="service">
              <h4>Business Solutions</h4>
              <p>
                Are you a bus owner looking to expand your business? Partner
                with us to maximize your potential and reach a wider audience.
                Our platform provides a seamless way to connect with customers,
                manage bookings, and grow your business efficiently.
              </p>
            </div>
            <div className="service">
              <h4>Pass System</h4>
              <p>
                For regular commuters, we offer a convenient pass system that
                allows you to travel hassle-free without the need to purchase
                tickets every time. Enjoy discounted rates and exclusive
                benefits as a part of our pass program.
              </p>
            </div>
            <div className="service">
              <h4>Customized Services Selection</h4>
              <p>
                Conveniently choose the services that best suit your needs from
                the dropdown button in our navbar. Whether you're looking to
                book a local bus, hire a private bus, explore business
                solutions, or join our pass program, you can easily access all
                our services with just a click.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Services;
