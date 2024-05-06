import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faHome } from '@fortawesome/free-solid-svg-icons';

const UnauthorizedError = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }} className="container-fluid error-container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 text-center">
          {/* Error icon */}
          <FontAwesomeIcon icon={faLock} style={{ color: '#dc3545' }} size="5x" className="mb-4" />

          {/* Error title */}
          <h1 style={{ fontSize: '3rem', color: '#dc3545' }} className="mb-4">Unauthorized Access</h1>

          {/* Error message */}
          <p style={{ fontSize: '1.5rem', color: '#6c757d' }} className="mb-4">You are not authorized to access this page.</p>

          {/* Back to home button */}
          <Link to="/" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }} className="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedError;
