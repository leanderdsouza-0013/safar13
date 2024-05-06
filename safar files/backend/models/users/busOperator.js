// models/BusOperator.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Counter = require('../counter');

const busOperatorSchema = new mongoose.Schema({
  operatorId: { type: String, unique: true},  
  role: { type: String, required: true, default: 'busOperator' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true }, // Company name of the bus 
  accountStatus: { type: String, enum: ['active', 'deactivated'], default: 'active' }, // Account status of the operator
  profilePicture: { type: String, default:''},
  buses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }], // Buses handled by the operator
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }] ,
  phone: { type: String , required: true }
});

// Hash password before saving to database
busOperatorSchema.pre('save', async function(next) {
  const busOperator = this;
  if (busOperator.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    busOperator.password = await bcrypt.hash(busOperator.password, salt);
  }
  next();
});

// Auto-increment operatorId using Counter model
busOperatorSchema.pre('save', async function(next) {
  if (!this.operatorId) {
    try {
      const counter = await Counter.findOneAndUpdate({ model: 'BusOperator'}, { $inc: { value: 1 } }, { new: true, upsert: true });
      this.operatorId = `BOID${counter.value}`; 
      next();
    } catch (error) {
      console.error('Error generating busoperator ID:', error);
      throw new Error('Failed to generate busoperator ID');
    }
  } else {
    next();
  }
});

const BusOperator = mongoose.model('BusOperator', busOperatorSchema);

module.exports = BusOperator;

