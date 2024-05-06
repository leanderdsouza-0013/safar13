const mongoose = require('mongoose');
const { generateBookingId } = require('./counter');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  numberOfSeats: { type: Number, required: true },
  boardingStop: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop', required: true },
  droppingStop: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop', required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }
});

// Pre-save hook to generate and assign a unique bookingId
bookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    try {
      const counter = await Counter.findOneAndUpdate({ _id: 'bookingId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
      this.bookingId = `BoKID${counter.seq}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
