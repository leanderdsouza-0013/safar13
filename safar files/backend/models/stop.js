// models/Stop.js
const mongoose = require('mongoose');
const Counter = require('./counter');

const stopSchema = new mongoose.Schema({
  stopId: { type: String, unique: true },
  name: { type: String, required: true },
  description: { type: String }
});

// Auto-increment stopId using Counter model
stopSchema.pre('save', async function(next) {
  if (!this.stopId) {
    try {
      const counter = await Counter.findOneAndUpdate({ _id: 'stopId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
      this.stopId = `STOP${counter.seq}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Stop = mongoose.model('Stop', stopSchema);

module.exports = Stop;
