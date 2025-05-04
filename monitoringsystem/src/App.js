import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/Authentication';
import Homepage from './components/Homepage';
import Trackgroup from './components/Trackgroup'; 
import AddTrackingVest from './components/Addtrackvest';
import AddOperationGroup from './components/Addoperationteam';

import Dashboard from './components/Dashboard';
import DismantleGroup from './components/Dismantlegroup';
import RemoveVest from './components/Removevest';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/track-group" element={<Trackgroup />} />  {/* Route for tracking group */}
        <Route path="/addvest" element={<AddTrackingVest />} />
        <Route path="/addgroup" element={<AddOperationGroup />} />
        <Route path="/dismantle" element={<DismantleGroup />} />
        <Route path="/removevest" element={<RemoveVest />} />
      </Routes>
    </Router>
  );
};

export default App;

