// backend/deleteAdmin.js
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function deleteAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteOne({ email: 'admin@bloodbank.com' });
    console.log('✅ Deleted old admin user');
    process.exit();
  } catch (err) {
    console.error('❌ Error deleting admin:', err);
    process.exit(1);
  }
}

deleteAdmin();