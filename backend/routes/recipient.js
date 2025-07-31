// backend/routes/recipient.js
const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const Donor = require('../models/Donor'); // For cross-checking donations
const Recipient = require('../models/Recipient'); // ✅ Required for recipient lookup

// POST /api/recipient/request
router.post('/request/add', async (req, res) => {
  try {
    const { email, bloodGroup, location, reason } = req.body;
    if (!email || !bloodGroup || !location || !reason) {
      return res.status(400).json({ message: '❌ Missing request fields' });
    }

  // Create and save blood request
    const newRequest = new BloodRequest({
      email,
      bloodGroup,
      location,
      reason,
      date: new Date(),
    });

    await newRequest.save();

    return res.status(200).json({ message: "✅ Your Request Submitted Successfully" });

  } catch (error) {
    console.error("❌ Request error:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/recipient/requests?email=someone@example.com
router.get('/requests', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const requests = await BloodRequest.find({ email }).sort({ date: -1 });
    return res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching requests:", err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;