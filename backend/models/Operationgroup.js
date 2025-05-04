const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true } // Unique ID for linking with sensor data
});

const OperationGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  members: [MemberSchema] // Members are stored within the group
});

module.exports = mongoose.model("OperationGroup", OperationGroupSchema);
