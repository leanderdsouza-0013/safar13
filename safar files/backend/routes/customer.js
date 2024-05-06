const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bodyParser = require('body-parser');
const sendPasswordResetEmail = require('../controllers/sendPasswordResetEmail');
const Route = require('../models/route');
const Bus = require('../models/bus');
const Customer = require('../models/users/customer');

// Route for customer signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newCustomer = await Customer.create({ name, email, password });

        // Store customer details in session upon successful signup
        req.session.customer = newCustomer;

        res.status(201).json({ message: 'Signup successful', customer: newCustomer });
    } catch (error) {
        console.error('Customer Signup Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch bus details along with route information
router.get('/busDetailss', async (req, res) => {
  try {
    // Fetch bus details with populated route information
    const busDetails = await Bus.findOne().populate('routeId');
    res.json(busDetails);
  } catch (error) {
    console.error('Error fetching bus details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




router.post('/busAndRouteDetails', async (req, res) => {
  try {
    const { routeId } = req.body;

    // Fetch route details based on the provided routeId
    const routeData = await Route.findById(routeId);

    if (!routeData) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Extract individual values for route details
    const { name, source, destination, stops } = routeData;

    const routeDetails = { name, source, destination, stops };

    // Fetch all bus details that match the routeId
    const busData = await Bus.find({ routeId });

    if (busData.length === 0) {
      return res.status(404).json({ error: 'No buses found for the given route' });
    }

    // Extract individual values for bus details
    const formattedBusDetails = busData.map(bus => ({
      busId: bus.busId,
      type: bus.type,
      registrationNumber: bus.registrationNumber,
      model: bus.model,
      capacity: bus.capacity,
      operatorId: bus.operatorId,
      driverId: bus.driverId,
      routeId: bus.routeId,
      rating: bus.rating,
      availability: bus.availability,
      Price: bus.Price,
      timetable: bus.timetable,
      seatsBooked: bus.seatsBooked
    }));

    // Combine bus and route details into a single object
    const combinedDetails = { busDetails: formattedBusDetails, routeDetails };

    // Send both bus details and route details to the frontend
    res.json(combinedDetails);
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Server-side route
router.get('/busDetails', async (req, res) => {
  try {
    // Fetch bus data from the database
    const busData = await Bus.findOne({ /* your query */ });

    if (!busData) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    // Extract individual values
    const { busId, type, registrationNumber, model, capacity, operatorId, driverId, routeId, rating, availability, Price, timetable, seatsBooked } = busData;

    // Create a new object containing only the necessary properties
    const busDetails = {
      busId,
      type,
      registrationNumber,
      model,
      capacity,
      operatorId,
      driverId,
      routeId,
      rating,
      availability,
      Price,
      timetable,
      seatsBooked
      // Add more properties as needed
    };

    // Send the bus details to the frontend
    res.json(busDetails);
  } catch (error) {
    console.error('Error fetching bus data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET request to fetch all bus details
router.get('/allBusDetails', async (req, res) => {
  try {
    // Fetch all bus data from the database
    const allBusData = await Bus.find();

    // Send the list of all bus details to the frontend
    res.json(allBusData);
  } catch (error) {
    console.error('Error fetching bus data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Handle POST request to fetch buses based on routeId
router.post('/buses', async (req, res) => {
  try {
    const { routeId } = req.body;

    // Find the corresponding route based on the provided routeId
    const route = await Route.findOne({ routeId });

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Fetch buses from the database based on the route _id
    const buses = await Bus.find({ routeId: route._id });

    // Send the list of buses as a response
    res.json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for customer login
router.post('/login', passport.authenticate('local'), (req, res) => {
    // Upon successful authentication, store customer details in session
    req.session.customer = req.user;
    res.json({ message: 'Login successful', customer: req.user });
});

// Route to get customer profile
router.get('/profile', (req, res) => {
    // Retrieve customer details from session
    const customer = req.session.customer;
    if (!customer) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json(customer);
});

// Route for customer logout
router.post('/logout', (req, res) => {
    // Destroy session to log out the customer
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json({ message: 'Logout successful' });
    });
});

const app = express();

// Middleware
app.use(bodyParser.json());


// Route to handle password reset request
app.post('/reset-password', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Lookup user by email in the database
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a password reset token (you can use a library like 'crypto' for this)
      const resetToken = generateResetToken();
  
      // Save the reset token in the user's document in the database
      user.resetToken = resetToken;
      await user.save();
  
      // Send a password reset email containing a link with the resetToken
      sendPasswordResetEmail(email, resetToken);
  
      // Return success response
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error handling password reset:', error);
      res.status(500).json({ message: 'An error occurred while resetting password' });
    }
  });
  
  // Route to handle setting new password after password reset
  app.post('/set-new-password', async (req, res) => {
    try {
      const { email, resetToken, newPassword } = req.body;
  
      // Lookup user by email and resetToken
      const user = await User.findOne({ email, resetToken });
  
      if (!user) {
        return res.status(404).json({ message: 'Invalid reset token' });
      }
  
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null; // Clear the reset token
      await user.save();
  
      // Return success response
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error setting new password:', error);
      res.status(500).json({ message: 'An error occurred while setting new password' });
    }
  });
  
  // Helper function to generate a random reset token
  function generateResetToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  


  const Razorpay = require('razorpay'); 
  const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
  
  const razorpayInstance = new Razorpay({
      key_id: "rzp_test_1mPqwe037sUAW8",
      key_secret: "34suD684QTSombUUxprxl9Sx"
  });
  
  const renderProductPage = async (req, res) => {
      try {
          res.render('product');
      } catch (error) {
          console.log(error.message);
          res.status(500).send({ success: false, msg: 'Internal Server Error' });
      }
  }
  
  const createOrder = async (req, res) => {
      try {
          const { amount, name, description } = req.body;
  
          // Calculate amount in paisa (multiply by 100)
          const amountInPaisa = amount * 100;
  
          const options = {
              amount: amountInPaisa,
              currency: 'INR',
              receipt: 'razorUser@gmail.com',
              notes: {
                  name: name,
                  description: description
              }
          }
  
          razorpayInstance.orders.create(options, (err, order) => {
              if (!err) {
                  res.status(200).send({
                      success: true,
                      msg: 'Order Created',
                      order_id: order.id,
                      amount: amountInPaisa,
                      key_id: RAZORPAY_ID_KEY,
                      product_name: name,
                      description: description,
                      contact: "8567345632", // Replace with actual contact information
                      name: "Sandeep Sharma", // Replace with actual user name
                      email: "sandeep@gmail.com" // Replace with actual user email
                  });
              } else {
                  console.log(err);
                  res.status(400).send({ success: false, msg: 'Something went wrong!' });
              }
          });
      } catch (error) {
          console.log(error.message);
          res.status(500).send({ success: false, msg: 'Internal Server Error' });
      }
  }
  
  module.exports = {
      renderProductPage,
      createOrder
  }
  






module.exports = router;
