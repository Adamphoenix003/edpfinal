const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const vestRoutes = require('./routes/vestRoutes');
const groupRoutes = require("./routes/groupRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const sensorHistoryRoutes = require("./routes/sensorHistory");
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/vests', vestRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/alerts", sensorHistoryRoutes);

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/edp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB (edp)"))
.catch(err => console.error("❌ MongoDB connection error:", err));



const SensorAlert = require('./models/SensorAlert');

// Clear alerts every 30 seconds
setInterval(async () => {
  try {
    await SensorAlert.deleteMany({});
    console.log("SensorAlert collection cleared.");
  } catch (err) {
    console.error("Error clearing SensorAlert collection:", err);
  }
}, 30000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
