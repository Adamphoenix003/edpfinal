const express = require('express');
const Vest = require('../models/Vest');

const router = express.Router();

// Route to add a tracking vest
router.post('/add', async (req, res) => {
  try {
    const { vestId, sensorDetails } = req.body;

    // Check if vest already exists
    const existingVest = await Vest.findOne({ vestId });
    if (existingVest) {
      return res.status(400).json({ message: "Vest ID already exists!" });
    }

    const newVest = new Vest({ vestId, sensorDetails });
    await newVest.save();

    res.status(201).json({ message: "Vest added successfully", vest: newVest });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});
router.delete('/remove', async (req, res) => {
    const { vestId } = req.body;
  
    try {
      const deletedVest = await Vest.findOneAndDelete({ vestId });
  
      if (!deletedVest) {
        return res.status(404).json({ message: "❌ Vest not found!" });
      }
  
      res.json({ message: `✅ Vest with ID ${vestId} has been removed.` });
    } catch (error) {
      res.status(500).json({ message: "❌ Server error. Try again later." });
    }
  });

module.exports = router;
