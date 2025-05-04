const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
  
  heartRate: Number,
 
  objectData: {
    location: String
  },
  spo2: Number,
  timestamp: { type: Date, default: Date.now },
  sensorVibration: Number,
  sensorVibrationt: Number,
  
});

// Third argument ensures it pulls from the "vitals" collection inside "edp"
module.exports = mongoose.model("SensorData", sensorDataSchema, "vitals");
