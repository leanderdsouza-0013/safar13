import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser, faUserCircle, faSignOutAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";
import { AuthContext } from './AuthProvider'; 

const Navbar = () => {
  const { user, userRole, logout } = useContext(AuthContext);
  const [showServicesMenu, setShowServicesMenu] = useState(false);

  const toggleServicesMenu = () => {
    setShowServicesMenu(!showServicesMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <a href="/">
            <img src="safarlogo1.png" alt="Safar logo" width="100" height="50"/>
          </a>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/FAQs" className="nav-link">FAQs</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us" className="nav-link">Contact Us</Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle" onClick={toggleServicesMenu}>
                Services
              </button>
              {showServicesMenu && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/services/booking" className="dropdown-item">Local Bus Booking</Link>
                  </li>
                  <li>
                    <Link to="/services/rentals" className="dropdown-item">Bus Rentals for Events</Link>
                  </li>
                  <li>
                    <Link to="/services/" className="dropdown-item">About services</Link>
                  </li>
                  <li>
                    <Link to="/employee/" className="dropdown-item">Employee Login</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <ul className="navbar-nav">
            {userRole ? (
              <>
                {userRole === 'admin' && (
                  <li className="nav-item">
                    <Link to="/admin_dashboard" className="nav-link">
                      <FontAwesomeIcon icon={faChartBar} /> Admin Dashboard
                    </Link>
                  </li>
                )}
                {userRole === 'driver' && (
                  <li className="nav-item">
                    <Link to="/driver_dashboard" className="nav-link">
                      <FontAwesomeIcon icon={faChartBar} /> Driver Dashboard
                    </Link>
                  </li>
                )}
                {userRole === 'busOperator' && (
                  <li className="nav-item">
                    <Link to="/operator_dashboard" className="nav-link">
                      <FontAwesomeIcon icon={faChartBar} /> Operator Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <FontAwesomeIcon icon={faUserCircle} /> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    <FontAwesomeIcon icon={faSignInAlt} /> Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <FontAwesomeIcon icon={faUser} /> Log In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
