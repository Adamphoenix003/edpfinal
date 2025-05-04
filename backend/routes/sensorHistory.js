const express = require("express");
const router = express.Router();
const SensorAlert = require("../models/SensorAlert");

// Save a new alert
router.post("/log", async (req, res) => {
  try {
    const { sensorId, sensorName, level } = req.body;
    if (level !== "critical") return res.status(400).json({ message: "Only critical levels logged" });

    const newAlert = new SensorAlert({ sensorId, sensorName, level });
    await newAlert.save();
    res.status(201).json({ message: "Alert logged" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get latest alerts
router.get("/history", async (req, res) => {
  try {
    const alerts = await SensorAlert.find().sort({ timestamp: -1 }).limit(10);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
