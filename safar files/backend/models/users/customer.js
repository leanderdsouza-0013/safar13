// models/customer.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Counter = require('../counter');

const customerSchema = new mongoose.Schema({
  customerId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'customer' },
  profilePicture: { type: String , default:''},
  resetToken: { type: String ,default:''} // Add resetToken field 
});

// Hash password before saving to database
customerSchema.pre('save', async function (next) {
  const customer = this;
  if (customer.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
  }
  next();
});

// Generate customerId using counter
customerSchema.pre('save', async function (next) {
  if (!this.customerId) {
    try {
      const counter = await Counter.findOneAndUpdate({ model: 'Customer' }, { $inc: { value: 1 } }, { new: true, upsert: true });
      this.customerId = `CSID${counter.value}`;
    } catch (error) {
      console.error('Error generating customer ID:', error);
      throw new Error('Failed to generate customer ID');
    }
  }
  next();
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
