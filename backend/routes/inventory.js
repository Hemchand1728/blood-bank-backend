// backend/routes/inventory.js
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// 🩸 Get All Blood Inventory
router.get('/inventory', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// ➕ Add or Update Blood Units (Admin)
router.post('/inventory', async (req, res) => {
  const { bloodGroup, units } = req.body;
  try {
    let record = await Inventory.findOne({ bloodGroup });
    if (record) {
      record.units += units;
    } else {
      record = new Inventory({ bloodGroup, units });
    }
    await record.save();
    res.json({ message: 'Inventory updated successfully', record });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

// ➖ Reduce Blood Units (Admin or Post-donation logic)
router.put('/inventory/reduce', async (req, res) => {
  const { bloodGroup, units } = req.body;
  try {
    const record = await Inventory.findOne({ bloodGroup });
    if (!record || record.units < units) {
      return res.status(400).json({ error: 'Not enough blood units available' });
    }
    record.units -= units;
    await record.save();
    res.json({ message: 'Units reduced', record });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reduce units' });
  }
});

// ➕ Add Blood Donation Entry
router.post('/donate', async (req, res) => {
  try {
    const { hospital, location, bloodGroup, units, donorEmail } = req.body;

    const newEntry = new Inventory({ hospital, location, bloodGroup, units, donorEmail });
    await newEntry.save();

    res.status(201).json({ message: 'Donation recorded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/inventory - show grouped blood availability by hospital/location
router.get("/", async (req, res) => {
  try {
    const inventory = await Donation.aggregate();

    res.json(inventory);
  } catch (err) {
    console.error("Inventory Error:", err.message);
    res.status(500).json({ message: "Server Error"});
  }
});


module.exports = router;