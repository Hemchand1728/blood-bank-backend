const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  date: String,
  location: String
});

const donorSchema = new mongoose.Schema({
  name: String,
  email: String,
  bloodGroup: String,
  contact: String,
  donations: [donationSchema]
});

module.exports = mongoose.model('Donor', donorSchema);