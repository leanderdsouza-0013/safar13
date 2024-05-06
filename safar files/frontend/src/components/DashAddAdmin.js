import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import "./DashAddAdmin.css"; // Assuming you have a DashAddAdmin.css file for styling

const DashAddAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Name validation
    if (!name) { errors.name = "Please enter admin name"; }
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errors.email = "Please enter a valid email address"; }
    // Password validation
    if (password.length < 8) { errors.password = "Password must be at least 8 characters long"; }
    // If there are errors, display them
    if (Object.keys(errors).length > 0) { setError(errors); return; }

    try {
      const response = await axios.post("/api/admin/new_admin", { name, email, password });
      console.log("Response:", response);
      setSuccessMessage(response.data.message || "Admin created successfully");
      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setError({});
    } catch (error) {
      console.error("Error:", error);
      setError({ main: error.response ? error.response.data.message : "An error occurred" });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="add-admin-container">
      <h2 className="add-admin-header">Add New Admin</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form className="add-admin-form" onSubmit={handleSubmit}>
        <div className="mb-3 row align-items-center">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-10">
            <input
              className={`form-control ${error.name && 'is-invalid'}`}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter admin name"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
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
                placeholder="Enter admin password"
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
            <button className="btn btn-primary" type="submit">
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Add Admin
            </button>
          </div>
        </div>
      </form>
      {error.main && <div className="alert alert-danger" role="alert">{error.main}</div>}
    </div>
  );
};

export default DashAddAdmin;
