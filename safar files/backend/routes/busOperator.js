// Import necessary modules
const express = require('express');
const router = express.Router();
const Driver = require('../models/users/driver');

// Route for adding a new driver
router.post('/new_drivers', async (req, res) => {
    try {
        // Extract data from the request body
        const { name, email, password, license, phone } = req.body;

        // Create a new driver instance
        const newDriver = new Driver({ name,email, password, license,phone});

        // Save the new driver to the database
        await newDriver.save();

        // Respond with success message
        res.status(201).json({ message: 'Driver added successfully', driver: newDriver });
    } catch (error) {
        // Handle errors
        console.error('Error adding driver:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/driver', async (req, res) => {
    try {
        // Fetch all bus operators with their associated buses and drivers
        const driver = await Driver.find()
        // Map the operators to include only required details
        const driverDetails = driver.map(driver => ({
            name: driver.name,
            email: driver.email,
            license: driver.license,
            phone: driver.phone,
            accountStatus: driver.accountStatus,
        }));

        res.status(200).json(operatorsDetails);
    } catch (error) {
        console.error('Error fetching bus operators:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the router
module.exports = router;