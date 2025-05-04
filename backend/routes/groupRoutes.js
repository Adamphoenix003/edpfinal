const express = require("express");
const router = express.Router();
const OperationGroup = require("../models/Operationgroup");
const SensorData = require("../models/SensorData");
// Create an Operation Group
router.post("/", async (req, res) => {
  try {
    const { groupName, members } = req.body;

    if (!groupName || members.length === 0) {
      return res.status(400).json({ message: "Group name and members are required." });
    }

    const newGroup = new OperationGroup({ groupName, members });
    await newGroup.save();

    res.status(201).json({ message: "✅ Group Created Successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
});

// Fetch All Groups
router.get("/", async (req, res) => {
  try {
    const groups = await OperationGroup.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});



// Delete (Dismantle) a Group by Group Name
router.delete("/:groupName", async (req, res) => {
  try {
    const { groupName } = req.params;

    const deletedGroup = await OperationGroup.findOneAndDelete({ groupName });

    if (!deletedGroup) {
      return res.status(404).json({ message: "❌ Group Not Found" });
    }

    res.json({ message: `✅ Group '${groupName}' has been dismantled.` });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
});
const determineHealthStatus = (heartRate, spo2) => {
  if (heartRate < 50 || heartRate > 120 || spo2 < 90) {
    return "critical";
  } else if ((heartRate >= 50 && heartRate <= 60) || (spo2 >= 90 && spo2 <= 94)) {
    return "risk";
  }
  return "normal";
};

// Fetch operation groups and include health status
router.get("/groups", async (req, res) => {
  try {
    const groups = await OperationGroup.find();

    const groupsWithHealthStatus = await Promise.all(
      groups.map(async (group) => {
        const updatedMembers = await Promise.all(
          group.members.map(async (member) => {
            const latestSensorData = await SensorData.findOne({ memberId: member.id })
              .sort({ timestamp: -1 }); // Get the latest sensor data
            
            const health = latestSensorData
              ? determineHealthStatus(latestSensorData.heartRate, latestSensorData.spo2)
              : "offline"; // Default to offline if no data

            return { ...member.toObject(), health };
          })
        );

        return { ...group.toObject(), members: updatedMembers };
      })
    );

    res.json(groupsWithHealthStatus);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch operation groups" });
  }
});



module.exports = router;


module.exports = router;
