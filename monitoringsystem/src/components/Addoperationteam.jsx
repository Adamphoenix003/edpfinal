import React, { useState } from "react";

const AddOperationTeam = ({ onAddTeam }) => {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([""]);

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim() === "" || members.some((m) => m.trim() === "")) {
      alert("Please provide a team name and fill in all member fields.");
      return;
    }
    onAddTeam({ teamName, members });
    setTeamName("");
    setMembers([""]);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Operation Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Team Name:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Team Members:</label>
          {members.map((member, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border rounded"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveMember(index)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                disabled={members.length === 1}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMember}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Member
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddOperationTeam;
