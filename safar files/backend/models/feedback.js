// models/Feedback.js
const mongoose = require('mongoose');
const Counter = require('./counter');

const feedbackSchema = new mongoose.Schema({
  feedbackId: { type: String ,unique: true },
  message: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }, // Reference to the customer who provided the feedback
  createdAt: { type: Date, default: Date.now }
});

// Auto-increment feedbackId using Counter model
feedbackSchema.pre('save', async function(next) {
  if (!this.feedbackId) {
    try {
      const counter = await Counter.findOneAndUpdate({ _id: 'feedbackId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
      this.feedbackId = `FeBID${counter.seq}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
