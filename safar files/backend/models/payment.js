const mongoose = require('mongoose');
const { generatePaymentId } = require('./counter');

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, unique: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Pending', 'Success', 'Failed'], required: true }
});

// Pre-save hook to generate and assign a unique paymentId
paymentSchema.pre('save', async function(next) {
  if (!this.paymentId) {
    try {
      const counter = await Counter.findOneAndUpdate({ _id: 'paymentId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
      this.paymentId = `PaYID${counter.seq}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

