import React, { useState } from 'react';

const RemoveVest = () => {
  const [vestId, setVestId] = useState('');
  const [message, setMessage] = useState('');

  const handleRemoveVestSubmit = (e) => {
    e.preventDefault();
    // Logic to remove the vest
    setMessage(`Tracking vest with ID ${vestId} has been removed.`);
  };

  return (
    <div className="remove-vest-container">
      <h2>Remove a Tracking Vest</h2>
      <form onSubmit={handleRemoveVestSubmit}>
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
        <button type="submit" className="submit-btn">Remove Vest</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RemoveVest;
