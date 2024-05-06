import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash,faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Set default role to "customer"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError({});
    setSuccessMessage("");

    // Perform client-side validation
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!formData.role) {
      errors.role = "Please select a user role";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setLoading(false);
      return; // Stop form submission
    }

    try {
      const response = await axios.post(`/api/customer/signup/`, formData); // Hardcode role as "customer"
      console.log("Signup successful:", response.data);
      setSuccessMessage("Signup successful!"); // Set success message
    } catch (error) {
      console.error("Signup error:", error.response.data);
      setError(error.response.data.message || "An error occurred during signup, Please try again");
    }

    setLoading(false);
  };
  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      {successMessage ? (
        <p className="success">{successMessage}</p>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="mb-3 row align-items-center">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Name:
            </label>
            <div className="col-sm-10">
              <input
                className={`form-control ${error.name && 'is-invalid'}`}
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {error.name && <div className="invalid-feedback">{error.name}</div>}
            </div>
          </div>
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
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
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
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
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
          <div className="mb-3 row">
            <div className="col-sm-10 offset-sm-2">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      )}
      {typeof error === 'string' && <p className="error">{error}</p>}
    </div>
  );
};


export default Signup;
