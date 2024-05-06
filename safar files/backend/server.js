const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport-config');
require('./controllers/testEntries');
const cors = require('cors');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customer');
const driverRoutes = require('./routes/driver');
const busOperatorRoutes = require('./routes/busOperator');
const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/booking'); 
const app = express();
require('dotenv').config(); 
// Middleware
app.use(cors());
app.use(express.json());

// Configure express-session middleware
app.use(session({
    secret: 'your_secret_key', // Set a secret key for session encryption
    resave: false,
    saveUninitialized: false
}));


// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/customer', customerRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/busOperator', busOperatorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/booking', bookingRoutes);

// MongoDB Connection
mongoose.connect(process.env.LOCAL_MONGODB_CONNECTION_STRING)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
