import React, { useState } from 'react';

const AddTrackingVest = () => {
  const [vestId, setVestId] = useState('');
  const [sensorDetails, setSensorDetails] = useState('');

  const handleVestSubmit = (e) => {
    e.preventDefault();
    // Send the vestId and sensorDetails to the backend or API for processing
    console.log({ vestId, sensorDetails });
  };

  return (
    <div className="add-vest-container">
      <h2>Add a Tracking Vest</h2>
      <form onSubmit={handleVestSubmit}>
        <div className="form-group">
          <label htmlFor="vestId">Vest ID</label>
          <input
            type="text"
            id="vestId"
            value={vestId}
            onChange={(e) => setVestId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sensorDetails">Sensor Details</label>
          <textarea
            id="sensorDetails"
            value={sensorDetails}
            onChange={(e) => setSensorDetails(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Vest</button>
      </form>
    </div>
  );
};

export default AddTrackingVest;
