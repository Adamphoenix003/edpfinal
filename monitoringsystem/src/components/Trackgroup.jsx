import React, { useState } from "react";

const TrackGroup = ({ onTrackGroup }) => {
  const [groupId, setGroupId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupId.trim() === "") {
      alert("Please enter a valid Group ID.");
      return;
    }
    onTrackGroup(groupId);
    setGroupId("");
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Track Operation Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Group ID:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Track
        </button>
      </form>
    </div>
  );
};

export default TrackGroup;
