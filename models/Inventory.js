const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['donor', 'recipient', 'admin'] },
  // Add other fields as needed
});

module.exports = mongoose.model('User', UserSchema);
