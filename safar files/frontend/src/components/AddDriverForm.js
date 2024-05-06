import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faIdCard, faMobile } from '@fortawesome/free-solid-svg-icons';

const AddDriverForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    license: '',
    phone: ''
  });

  // State for form submission status
  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div className="container mt-4">
      <h2>Add Driver</h2>
      {submitted && <Alert variant="success">Form submitted successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <FontAwesomeIcon icon={faUser} className="form-icon" />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <FontAwesomeIcon icon={faLock} className="form-icon" />
        </Form.Group>

        <Form.Group controlId="license">
          <Form.Label>License Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter license number"
            name="license"
            value={formData.license}
            onChange={handleInputChange}
            required
          />
          <FontAwesomeIcon icon={faIdCard} className="form-icon" />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <FontAwesomeIcon icon={faMobile} className="form-icon" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddDriverForm;
