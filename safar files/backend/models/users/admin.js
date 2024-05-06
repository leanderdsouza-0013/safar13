// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Counter = require('../counter');

const adminSchema = new mongoose.Schema({
  adminId: { type: String, unique: true },
  role: { type: String, default: 'admin'  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default:''}
});

adminSchema.pre('save', async function (next) {
  if (!this.adminId) {
    try {
      const counter = await Counter.findOneAndUpdate({ model: 'Admin' }, { $inc: { value: 1 } }, { new: true, upsert: true });
      this.adminId = `ADM${counter.value}`;
    } catch (error) {
      console.error('Error generating admin ID:', error);
      throw new Error('Failed to generate admin ID');
    }
  }
  next();
});

adminSchema.pre('save', async function (next) {
  const admin = this;
  if (admin.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
  }
  next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
