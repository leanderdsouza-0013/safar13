import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    // If there are errors, display them
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      const response = await axios.post(`/api/${role}/login`, { email, password });
      login(response.data);
      console.log("employee response",response.data);
      setSuccessMessage("Login successful!");
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "An error occurred during login");
      } else {
        setError("An unknown error occurred during login");
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2 className="login-header">EMPLOYEE LOGIN</h2>
      {successMessage ? (
        <p className="success">{successMessage}</p>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="mb-3 row align-items-center">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              Email:
            </label>
            <div className="col-sm-10">
              <input
                className={`form-control ${error.email && 'is-invalid'}`}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
              {error.email && <div className="invalid-feedback">{error.email}</div>}
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Password:
            </label>
            <div className="col-sm-10">
              <div className="input-group">
                <input
                  className={`form-control ${error.password && 'is-invalid'}`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleTogglePassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {error.password && <div className="invalid-feedback">{error.password}</div>}
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label htmlFor="role" className="col-sm-2 col-form-label">
              Role:
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="busoperator">Bus Operator</option>
                <option value="driver">Driver</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-sm-10 offset-sm-2">
              <button className="btn btn-primary" type="submit">
                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                Login
              </button>
            </div>
          </div>
        </form>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
