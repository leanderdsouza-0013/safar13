// models/Route.js
const mongoose = require('mongoose');
const Counter = require('./counter');

const routeSchema = new mongoose.Schema({
  routeId: { type: String, unique: true },
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  stops: [{ type: String, required: true }],
  price: { type: Number, default: '20' }
});

// Auto-increment routeId using Counter model
routeSchema.pre('save', async function(next) {
  if (!this.routeId) {
    try {
      const counter = await Counter.findOneAndUpdate({ model: 'Route' }, { $inc: { value: 1 } }, { new: true, upsert: true });
      this.routeId = `ROUTE${counter.value}`; 
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
