import "./DashManageOperators.css"; // Assuming you have a DashAddAdmin.css file for styling
import DriverDetails from "./DriverDetail"; // Import the OperatorDetails component
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash, faUserPlus } from "@fortawesome/free-solid-svg-icons";


const DashManageOperator = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [license, setLicense] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Name validation
    if (!name) { errors.name = "Please enter operator name"; }
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errors.email = "Please enter a valid email address"; }
    // Password validation
    if (password.length < 8) { errors.password = "Password must be at least 8 characters long"; }
    // Company name validation
    if (!license) { errors.license = "Please enter licence name"; }
    // Phone number validation
    if (!phone) { errors.phoneNumber = "Please enter phone number"; }
    // If there are errors, display them
    if (Object.keys(errors).length > 0) { setError(errors); return; }

    try {
      const response = await axios.post("/api/busOperator/new_drivers", { name, email, password, license, phone});
      console.log("Response:", response); 
      setSuccessMessage(response.data.message || "Operator created successfully");
      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setLicence("");
      setPhone("");
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
    <div>
      <div className="add-operator-container">
        <h2 className="add-operator-header">Add New Operator</h2>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <form className="add-operator-form" onSubmit={handleSubmit}>
          {/* Form fields for adding a new operator */}
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              className={`form-control ${error.name && 'is-invalid'}`}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {error.name && <div className="invalid-feedback">{error.name}</div>}
          </div>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                Email:</label>
            <input
              type="email"
              className={`form-control ${error.email && 'is-invalid'}`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && <div className="invalid-feedback">{error.email}</div>}
          </div>
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
            <FontAwesomeIcon icon={faLock} className="me-2" />

                Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${error.password && 'is-invalid'}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleTogglePassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
              {error.password && <div className="invalid-feedback">{error.password}</div>}
            </div>
          </div>
          {/* Company Name */}
          <div className="mb-3">
            <label htmlFor="license" className="form-label">License:</label>
            <input
              type="text"
              className={`form-control ${error.licence && 'is-invalid'}`}
              id="license"
              value={license}
              onChange={(e) => setLicence(e.target.value)}
              required
            />
            {error.companyName && <div className="invalid-feedback">{error.license}</div>}
          </div>
          {/* Phone Number */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number:</label>
            <input
              type="tel"
              className={`form-control ${error.phoneNumber && 'is-invalid'}`}
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {error.phoneNumber && <div className="invalid-feedback">{error.phoneNumber}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Add Operator</button>
        </form>
        {/* Error message */}
        {error.main && <div className="alert alert-danger" role="alert">{error.main}</div>}
      </div>
      
      {/* Operator Details */}
      <DriverDetails />

    </div>
  );
};

export default DashManageOperator;
