// models/driver.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Counter = require('../counter');

const driverSchema = new mongoose.Schema({
  driverId: { type: String, unique: true },
  role: { type: String, required: true, default: 'driver' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountStatus: { type: String, enum: ['active', 'deactivated'], default: 'active' } ,// Account status of the operator
  license: { type: String ,required: true , unique: true}, // License number of the driver
  profilePicture: { type: String , default:'' },
  phone: { type: String , required: true }
});

// Hash password before saving to database
driverSchema.pre('save', async function(next) {
  const driver = this;
  if (driver.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    driver.password = await bcrypt.hash(driver.password, salt);
  }
  next();
});

// Auto-increment driverId using Counter model
driverSchema.pre('save', async function(next) {
  if (!this.driverId) {
    try {
      const counter = await Counter.findOneAndUpdate({ model: 'Driver' }, { $inc: { value: 1 } }, { new: true, upsert: true });
      this.driverId = `DRID${counter.value}`;
      next();
    } catch (error) {
      console.error('Error generating driver ID:', error);
      throw new Error('Failed to generate driver ID');
    }
  } else {
    next();
  }

});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;