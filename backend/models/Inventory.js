const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  hospital: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  units: {
    type: Number,
    required: true,
    min: 1,
  },
  donorEmail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Inventory', inventorySchema);