const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/users/admin');
const BusOperator = require('../models/users/busOperator');

// Route for admin signup
router.post('/new_admin', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        // Create new admin
        const newAdmin = new Admin({name, email, password });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
        console.error('Admin Signup Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch admin details
router.get('/adminDetails', async (req, res) => {
    try {
      // Retrieve admin details from the database, selecting only specific fields
      const adminDetails = await Admin.find({}, 'adminId name email');
  
      // Check if admin details exist
      if (!adminDetails || adminDetails.length === 0) {
        return res.status(404).json({ message: 'Admin details not found' });
      }
  
      // If admin details exist, return them as a response
      const formattedAdminDetails = adminDetails.map(admin => ({
        adminId: admin.adminId,
        name: admin.name,
        email: admin.email
      }));
      
      res.status(200).json({ adminDetails: formattedAdminDetails });
    } catch (error) {
      console.error('Error fetching admin details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Route for admin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ email });

        // Check if admin exists
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create JWT payload
        const payload = {
            id: admin._id,
            email: admin.email,
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
                    message: 'Admin login successful',
                    admin: admin, // Send entire admin object
                    token // Send token back to client
                });
            }
        );
    } catch (error) {
        console.error('Admin Login Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/new_busOperator', async (req, res) => {
    try {
        const { name, email, password, companyName, phone } = req.body;

        // Check if bus operator already exists
        const existingOperator = await BusOperator.findOne({ email });
        if (existingOperator) { 
            return res.status(400).json({ message: 'Bus operator already exists' });
        }
        // Create new bus operator
        const newOperator = new BusOperator({ name, email, password ,companyName,phone });
        await newOperator.save();
        res.status(201).json({ message: 'Bus operator created successfully', operator: newOperator });
    } catch (error) {
        console.error('Bus Operator Signup Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/bus_operators', async (req, res) => {
    try {
        // Fetch all bus operators with their associated buses and drivers
        const operators = await BusOperator.aggregate([
            {
                $lookup: {
                    from: 'buses',
                    localField: '_id',
                    foreignField: 'operator',
                    as: 'buses'
                }
            },
            {
                $lookup: {
                    from: 'drivers',
                    localField: '_id',
                    foreignField: 'operator',
                    as: 'drivers'
                }
            },
            {
                $group: {
                    _id: '$companyName',
                    operators: {
                        $push: {
                            busOperatorId: '$_id',
                            Id: '$operatorId',
                            name: '$name',
                            email: '$email',
                            phone: '$phone',
                            accountStatus: '$accountStatus',
                            buses: {
                                $map: {
                                    input: '$buses',
                                    as: 'bus',
                                    in: {
                                        busId: '$$bus.busId',
                                        type: '$$bus.type',
                                        registrationNumber: '$$bus.registrationNumber'
                                    }
                                }
                            },
                            drivers: {
                                $map: {
                                    input: '$drivers',
                                    as: 'driver',
                                    in: {
                                        driverId: '$$driver.driverId',
                                        name: '$$driver.name',
                                        license: '$$driver.license'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]);

        res.status(200).json(operators);
    } catch (error) {
        console.error('Error fetching bus operators:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/bus_operator', async (req, res) => {
    try {
        // Fetch all bus operators with their associated buses and drivers
        const operators = await BusOperator.find()
            .populate('buses', 'busNumber')
            .populate('drivers', 'name');

        // Map the operators to include only required details
        const operatorsDetails = operators.map(operator => ({
            name: operator.name,
            email: operator.email,
            companyName: operator.companyName,
            phone: operator.phone,
            accountStatus: operator.accountStatus,
            buses: operator.buses.map(bus => bus.busNumber),
            drivers: operator.drivers.map(driver => driver.name)
        }));

        res.status(200).json(operatorsDetails);
    } catch (error) {
        console.error('Error fetching bus operators:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/bus_operators/deactivate/:busOperatorId', async (req, res) => {
    try {
        const { busOperatorId } = req.params;

        // Find the bus operator by ID
        const operator = await BusOperator.findById(busOperatorId);
        
        if (!operator) {
            return res.status(404).json({ message: 'Bus operator not found' });
        }
        // Update the account status to "deactivated"
        operator.accountStatus = 'deactivated';
        await operator.save();

        res.status(200).json({ message: 'Bus operator deactivated successfully' });
    } catch (error) {
        console.error('Error deactivating bus operator:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/bus_operators/activate/:busOperatorId', async (req, res) => {
    try {
        const { busOperatorId } = req.params;

        // Find the bus operator by ID
        const operator = await BusOperator.findById(busOperatorId);
        
        if (!operator) {
            return res.status(404).json({ message: 'Bus operator not found' });
        }
        // Update the account status to "deactivated"
        operator.accountStatus = 'active';
        await operator.save();

        res.status(200).json({ message: 'Bus operator activated successfully' });
    } catch (error) {
        console.error('Error activating bus operator:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
