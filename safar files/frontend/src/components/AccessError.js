import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';

const AccessError = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }} className="container-fluid error-container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 text-center">
          {/* Error icon */}
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: '#dc3545' }} size="5x" className="mb-4" />

          {/* Error title */}
          <h1 style={{ fontSize: '3rem', color: '#dc3545' }} className="mb-4">Oops! Error 404</h1>

          {/* Error message */}
          <p style={{ fontSize: '1.5rem', color: '#6c757d' }} className="mb-4">The page you're looking for cannot be found.</p>

          {/* Back to home button */}
          <Link to="/" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }} className="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccessError;
