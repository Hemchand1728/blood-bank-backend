const Donor = require('../models/Donor');
const Request = require('../models/Request');

exports.requestBlood = async (req, res) => {
  const { email, bloodGroup, location, reason } = req.body;

  try {
    // Check for a matching donor
    const matchingDonor = await Donor.findOne({
      bloodGroup,
      location
    });

    // Save the request to DB
    const newRequest = new Request({
      email,
      bloodGroup,
      location,
      reason
    });
    await newRequest.save();

    if (matchingDonor) {
      return res.status(200).json({
        available: true,
        message: "✅ Donor found nearby!",
        donorContact: matchingDonor.contact
      });
    } else {
      return res.status(200).json({
        available: false,
        message: "❌ No donor found for this blood group and location.",
        donorContact: null
      });
    }
  } catch (err) {
    console.error("❗ Error in requestBlood:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};