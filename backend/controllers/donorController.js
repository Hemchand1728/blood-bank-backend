const User = require('../models/User');
const Donation = require('../models/Donation');

// Update Donor Profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};

// Schedule Donation
exports.scheduleDonation = async (req, res) => {
  const { date, location } = req.body;
  const userId = req.user.id;

  try {
    const donation = new Donation({ donor: userId, date, location });
    await donation.save();
    res.json({ success: true, message: 'Donation scheduled successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to schedule donation.' });
  }
};

// Get Donation History
exports.getDonationHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await Donation.find({ donor: userId }).sort({ date: -1 });
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch history.' });
  }
};