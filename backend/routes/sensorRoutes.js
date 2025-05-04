const express = require("express");
const router = express.Router();
const SensorData = require("../models/SensorData");

// Function to determine health status


router.get("/sensors", async (req, res) => {
  try {
    const latestSensorData = await SensorData.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$memberId",
          latestRecord: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$latestRecord" }
      }
    ]);

    const responseData = latestSensorData.map((sensor) => ({
      memberId: sensor.memberId,
      heartRate: sensor.heartRate,
      spo2: sensor.spo2,
      objectData: {
        location: sensor.objectData?.location || "Unknown"
      },
      sensor1Vibration: sensor.sensor1Vibration,
      sensor2Vibration: sensor.sensor2Vibration
    }));

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

