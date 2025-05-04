import React, { useState } from 'react';

const DismantleGroup = () => {
  const [groupId, setGroupId] = useState('');
  const [message, setMessage] = useState('');

  const handleDismantleSubmit = (e) => {
    e.preventDefault();
    // Logic to dismantle group
    setMessage(`Group with ID ${groupId} has been dismantled.`);
  };

  return (
    <div className="dismantle-group-container">
      <h2>Dismantle a Tracking Group</h2>
      <form onSubmit={handleDismantleSubmit}>
        <div className="form-group">
          <label htmlFor="groupId">Group ID</label>
          <input
            type="text"
            id="groupId"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Dismantle Group</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DismantleGroup;
