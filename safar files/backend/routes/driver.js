const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Driver = require('../models/users/driver');

// Route for driver signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if driver already exists
        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) {
            return res.status(400).json({ message: 'Driver already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new driver
        const newDriver = new Driver({
            name,
            email,
            password: hashedPassword
        });
        await newDriver.save();

        res.status(201).json({ message: 'Driver created successfully', driver: newDriver });
    } catch (error) {
        console.error('Driver Signup Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for driver login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find driver by email
        const driver = await Driver.findOne({ email });

        // Check if driver exists
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, driver.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create JWT payload
        const payload = {
            id: driver._id,
            email: driver.email,
            // You can include additional data as needed
        };

        // Sign token
        jwt.sign(
            payload,
            'your_secret_key', // Replace 'your_secret_key' with your actual secret key
            { expiresIn: '1h' }, // Token expiration time
            (err, token) => {
                if (err) throw err;
                res.json({
                    message: 'Driver login successful',
                    driver: driver, // Send entire driver object
                    token // Send token back to client
                });
            }
        );
    } catch (error) {
        console.error('Driver Login Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
