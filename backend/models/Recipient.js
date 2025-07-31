const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  bloodGroup: String,
  location: String,
  reason: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const recipientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  bloodGroup: String,
  contact: String,
  requests: [requestSchema]
});

module.exports = mongoose.model('Recipient', recipientSchema);

