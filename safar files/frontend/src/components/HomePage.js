import React , { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Assuming you have additional custom styles
import Carousel from "./Carousel";
import TestimonialSlider from "./TestimonialSlider";
import { AuthContext } from './AuthProvider';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="home-page">
      <header className="header text-center py-5">
        <h1>Travel in Comfort and Style</h1>
        <p className="lead">Your Journey Starts with Us</p>
        <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {/* Conditionally render cards if user is logged in */}
          {user ? (
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card">
                  <img src="localBus.png" className="card-img-top" alt="Local Bus Booking" />
                  <div className="card-body">
                    <h5 className="card-title">Local Bus Booking</h5>
                    <p className="card-text">Book local bus tickets.</p>
                    {/* Add link to local bus booking page */}
                    <Link to="/services/booking" className="btn btn-primary">Book Now</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card">
                  <img src="eventBus.jpg" className="card-img-top" alt="Event Booking" />
                  <div className="card-body">
                    <h5 className="card-title">Event Booking</h5>
                    <p className="card-text">Book buses for events.</p>
                    {/* Add link to event booking page */}
                    <Link to="/services/rentals" className="btn btn-primary">Book Now</Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Render default "Book Now" link if user is not logged in
            <div className="text-center">
              <p className="lead">Please login to book buses</p>
              <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
      </header>
      <Carousel />
      <div className="container">
  <div className="row">
    <div className="col-lg-6">
      <section className="about-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Experience Effortless Travel</h2>
              <p>
                We're dedicated to providing exceptional bus services that make
                your journey comfortable, convenient, and memorable. Whether
                you're traveling for business, leisure, or visiting loved ones,
                we'll get you there safely and in style.
              </p>
              <ul className="about-features">
                <li>Spacious and modern buses with comfortable seating</li>
                <li>
                  Onboard amenities like Wi-Fi, entertainment systems, and
                  refreshments
                </li>
                <li>Professional and courteous drivers</li>
                <li>Multiple routes and flexible schedules</li>
                <li>Online booking and easy ticket management</li>
                <li>Dedicated customer support</li>
              </ul>
              <Link to="/about-us" className="btn btn-secondary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div className="col-lg-6">
<section className="services-section py-5 bg-light">
  <div className="container">
    <h2 className="text-center mb-4">Our Features</h2>
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-4">
            <div className="service-item text-center">
              <i className="fas fa-route fa-3x mb-3"></i>
              <h3>Local Routes</h3>
              <p>
               Discover nearby places with our convenient and extensive route network.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-item text-center">
              <i className="fas fa-couch fa-3x mb-3"></i>
              <h3>On Time Service</h3>
              <p>
              Enjoy more punctual arrivals and departures for your local trips.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-item text-center">
              <i className="fas fa-wifi fa-3x mb-3"></i>
              <h3>Smooth Rides</h3>
              <p>
              Enjoy a smoother journey with our reliable bus services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  </div>
</div>
      <TestimonialSlider />
    </div>
  );
};

export default HomePage;
