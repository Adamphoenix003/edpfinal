const mongoose = require("mongoose");

const SensorAlertSchema = new mongoose.Schema({
  sensorId: { type: String, required: true },
  sensorName: { type: String, required: true },
  level: { type: String, enum: ["normal", "critical"], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SensorAlert", SensorAlertSchema);
