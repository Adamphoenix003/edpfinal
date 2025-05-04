import React from 'react';
import { useNavigate } from 'react-router-dom';  // Navigation hook
import "../styles/homepage.css";
const Homepage = () => {
  const navigate = useNavigate();

  // Function to handle each action
  const handleAction = (action) => {
    switch(action) {
      case 'addVest':
        console.log('Add a tracking vest');
        navigate('/addvest');
        break;
      case 'addGroup':
        console.log('Add an operation group');
        navigate('/addgroup');
        break;
      case 'trackGroup':
        console.log('Track an operation group');
        navigate('/track-group');
        break;
      case 'dismantleGroup':
        console.log('Dismantle an operation group');
        navigate('/dismantle');
        break;
      case 'removeVest':
        console.log('Remove a tracking vest');
        navigate('/removevest');
        break;
      default:
        console.log('Invalid action');
    }
  };

  return (
    <div className="homepage-container">
      <h2>Operation Dashboard</h2>
      <div className="action-buttons">
        <button className="action-button" onClick={() => handleAction('addVest')}>Add A Tracking Vest</button>
        <button className="action-button" onClick={() => handleAction('addGroup')}>Add An Operation Group</button>
        <button className="action-button" onClick={() => handleAction('trackGroup')}>Track An Operation Group</button>
        <button className="action-button" onClick={() => handleAction('dismantleGroup')}>Dismantle An Operation Group</button>
        <button className="action-button" onClick={() => handleAction('removeVest')}>Remove A Tracking Vest</button>
      </div>
    </div>
  );
};

export default Homepage;
