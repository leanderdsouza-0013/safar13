const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  model: { type: String, required: true }, // Model name for which the counter is being used
  value: { type: Number, required: true , default: 10000 }, // Counter value
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;