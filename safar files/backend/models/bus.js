const mongoose = require('mongoose');
const Counter = require('./counter');
const Route = require('../models/route');
const BusOperator = require('../models/users/busOperator');
const Driver = require('../models/users/driver');

const busSchema = new mongoose.Schema({
  busId: { type: String, unique: true },
  type: { type: String, enum: ['local', 'event'], required: true },
  registrationNumber: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  capacity: { type: Number, required: true },
  operatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'BusOperator' },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  rating: { type: Number, default: 0 }, // Rating of the bus
  availability: { type: Boolean, default: true }, 
  Price: { type: Number , default:'20' },
  timetable: [{ type: String }], // Array of strings to hold timetable details
  seatsBooked: [{ 
    date: { type: Date },
    count: { type: Number, default: 0 }
  }]
});

// Auto-increment busId using Counter model
busSchema.pre('save', async function(next) {
  if (!this.busId) {
    try {
      const counter = await Counter.findOneAndUpdate({ model: 'Bus' }, { $inc: { value: 1 } }, { new: true, upsert: true });
      this.busId = `BUSID${counter.value}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
