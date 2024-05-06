const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Customer = require('../models/users/customer');

// Serialize customer data to store in session
passport.serializeUser((customer, done) => {
    done(null, customer.customerId);
});
passport.deserializeUser(async (customerId, done) => {
    try {
        const customer = await Customer.findOne({ customerId });
        done(null, customer);
    } catch (error) {
        done(error);
    }
});

// Configure Passport to use Local strategy for authentication
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        return done(null, customer);
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;
