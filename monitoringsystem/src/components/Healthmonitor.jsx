import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/healthmonitor.css";
import soldierBg from "../assets/bg2pic.jpg";
import healthImage from "../assets/pic3.jpg";

const SENSOR_LIMIT = 50;

const HealthMonitor = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [spo2, setSpo2] = useState(null);
  const [status, setStatus] = useState("offline");
  const [sensors, setSensors] = useState(Array(8).fill(0));
  const [sensorStatus, setSensorStatus] = useState(["normal", "normal"]);
  const [alertHistory, setAlertHistory] = useState([]);
  const navigate = useNavigate();

  // Fetch vitals and simulate sensors
  useEffect(() => {
    const fetchVitalsFromMongo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensors");
        const data = await response.json();

        if (data && data.heartRate && data.spo2) {
          setHeartRate(data.heartRate);
          setSpo2(data.spo2);

          if (data.heartRate >= 60 && data.heartRate <= 100 && data.spo2 >= 95) {
            setStatus("normal");
          } else if ((data.heartRate > 100 && data.heartRate <= 120) || (data.spo2 >= 90 && data.spo2 < 95)) {
            setStatus("risk");
          } else if (data.heartRate > 120 || data.spo2 < 90) {
            setStatus("critical");
          } else {
            setStatus("offline");
          }

          const simulatedSensorData = [
            Math.random() * 100,
            Math.random() * 100,
            10, 10, 10, 10, 10, 10,
          ];
          setSensors(simulatedSensorData);
        } else {
          setStatus("offline");
        }
      } catch (error) {
        console.error("MongoDB fetch error:", error);
        setStatus("offline");
      }
    };

    const interval = setInterval(fetchVitalsFromMongo, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate sensor status and log alerts
  useEffect(() => {
    const simulateSensorChanges = async () => {
      const updated = sensorStatus.map((_, i) => {
        if (i < 2) {
          const isCritical = Math.random() > 0.7;
          if (isCritical) {
            logAlertToDB(i);
            return "critical";
          }
          return "normal";
        }
        return "normal";
      });
      setSensorStatus(updated);
    };

    const interval = setInterval(simulateSensorChanges, 2000);
    return () => clearInterval(interval);
  }, [sensorStatus]);

  const logAlertToDB = async (index) => {
    const sensorNames = ["Chest", "Abdomen", "Arm", "Leg", "Back", "Shoulder", "Knee", "Foot"];
    try {
      await fetch("http://localhost:5000/api/alerts/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sensorId: `sensor${index + 1}`,
          sensorName: sensorNames[index],
          level: "critical",
        }),
      });
    } catch (err) {
      console.error("Error logging alert:", err);
    }
  };

  // Fetch alert history and clear every 30 sec
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/alerts/history");
        const data = await res.json();
        setAlertHistory(data);
      } catch (err) {
        console.error("Error fetching alert history:", err);
      }
    };

    const fetchInterval = setInterval(fetchHistory, 3000);
    const clearTerminalInterval = setInterval(() => {
      setAlertHistory([]); // Clear frontend terminal
      fetch("http://localhost:5000/api/alerts/clear", { method: "DELETE" }); // Clear backend
    }, 30000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(clearTerminalInterval);
    };
  }, []);

  return (
    <div
      className="main-layout"
      style={{
        backgroundImage: `url(${soldierBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left: All sensors and monitoring */}
      <div className="left-pane">
        <h2>Health Monitor</h2>

        <div className="sensor-layout">
          <div className="sensor-column">
            <div className={`sensor-box ${sensorStatus[0]}`}>Sensor1 - Chest</div>
            <div className={`sensor-box ${sensorStatus[1]}`}>Sensor2 - Abdomen</div>
            <div className="sensor-box normal">Sensor3 - Arm</div>
            <div className="sensor-box normal">Sensor4 - Leg</div>
          </div>

          <img src={healthImage} alt="Health Monitor" className="monitor-image" />

          <div className="sensor-column">
            <div className="sensor-box normal">Sensor5 - Back</div>
            <div className="sensor-box normal">Sensor6 - Shoulder</div>
            <div className="sensor-box normal">Sensor7 - Knee</div>
            <div className="sensor-box normal">Sensor8 - Foot</div>
          </div>
        </div>

        <div className={`health-status ${status}`}>
          <div className="status-indicator"></div>
          <h3>Status: {status.toUpperCase()}</h3>
        </div>

        <div className="sensor-data">
          <p><strong>Heart Rate:</strong> {heartRate ? `${heartRate} bpm` : "N/A"}</p>
          <p><strong>SpO2:</strong> {spo2 ? `${spo2}%` : "N/A"}</p>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      </div>

      {/* Right: Alert Terminal only */}
      <div className="right-pane">
        <div className="alert-terminal">
          <h4>Alert History</h4>
          <div className="terminal-box">
            {alertHistory.map((alert, index) => (
              <p key={index}>
                [{new Date(alert.timestamp).toLocaleTimeString()}] {alert.sensorName} - {alert.level.toUpperCase()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitor;
