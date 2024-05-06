// models/Review.js
const mongoose = require('mongoose');
const Counter = require('./counter');

const reviewSchema = new mongoose.Schema({
  reviewId: { type: String, unique: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }, // Reference to the customer who provided the review
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true }, // Reference to the bus being reviewed
  createdAt: { type: Date, default: Date.now }
});

// Auto-increment reviewId using Counter model
reviewSchema.pre('save', async function(next) {
  if (!this.reviewId) {
    try {
      const counter = await Counter.findOneAndUpdate({ _id: 'reviewId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
      this.reviewId = `ReVID${counter.seq}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
