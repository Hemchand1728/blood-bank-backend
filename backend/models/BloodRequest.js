const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  location: { type: String, required: true },
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now },
   status: {
    type: String,
    enum: ['Pending', 'Approved', 'Denied'],
    default: 'Pending'
  },
});

module.exports = mongoose.model('BloodRequest', BloodRequestSchema);