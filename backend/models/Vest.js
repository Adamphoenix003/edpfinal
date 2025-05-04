const mongoose = require('mongoose');

const vestSchema = new mongoose.Schema({
  vestId: { type: String, required: true, unique: true },
  sensorDetails: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Vest", vestSchema);
