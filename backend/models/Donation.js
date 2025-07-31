const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorEmail: { type: String, required: true },
  date: { type: Date, required: true },
  hospital: { type: String, required: true },
  location: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true }
});

module.exports = mongoose.model('Donation', donationSchema);