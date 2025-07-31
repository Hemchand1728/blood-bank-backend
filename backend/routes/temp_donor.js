const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Donor = require('../models/Donor');
const Donation = require('../models/Donation');
const Inventory = require('../models/Inventory');


// ====================
// Add New Donor
// POST /api/donor/add
// ====================
router.post('/add', async (req, res) => {
  try {
    const { name, email, bloodGroup, contact } = req.body;

    if (!name || !email || !bloodGroup || !contact) {
      return res.status(400).json({ message: '❌ Missing donor fields' });
    }

    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(409).json({ message: '❌ Donor already exists' });
    }

    const newDonor = new Donor({
      name,
      email,
      bloodGroup,
      contact,
      donations: []
    });

    await newDonor.save();
    res.status(201).json({ message: '✅ Donor added successfully' });
  } catch (error) {
    console.error('❌ Add Donor Error:', error.message);
    res.status(500).json({ message: '❌ Server error' });
  }
});

// ====================
// Schedule Donation
// POST /api/donor/donate
// ====================
router.post('/donate', async (req, res) => {
  try {
    const { email, date, location } = req.body;

    if (!email || !date || !location) {
      return res.status(400).json({ message: '❌ Missing fields' });
    }

    const donor = await donor.findOne({ email });
    if (!donor) {
      return res.status(404).json({ message: '❌ Donor not found' });
    }

    donor.donations.push({ date, location });
    await donor.save();

    res.status(200).json({ message: '✅ Donation scheduled successfully' });
  } catch (error) {
    console.error('❌ Donate Error:', error.message);
    res.status(500).json({ message: '❌ Server error' });
  }
});

// ====================
// Get Donation History
// GET /api/donor/history?email=someone@example.com
// ====================
// GET /api/donor/history/:email - Fetch donation history from Inventory by donorEmail
router.get('/history/:email', async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: '❌ Email is required' });
  }

  try {
    const donations = await Inventory.find({ donorEmail: email }).sort({ date: -1 });

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: '❌ No donation history found' });
    }

    res.status(200).json(donations);
  } catch (error) {
    console.error('❌ Donation History Error:', error.message);
    res.status(500).json({ message: '❌ Server error' });
  }
});




module.exports = router;