import React from 'react';
import { Fade } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Players from './Components/Players';
import PlayerPerformance from './Components/PlayerPerformance'
import Team from '.Components/Team'
import './App.css';
import HomePage from './Components/HomePage';
import Login from './Components/NewLogin';

function App() {


  return (
     <Router>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/players" element={<Players />} />
        <Route path="/player_performance" element={<PlayerPerformance />} />
        <Route path="/teams" element={<Team />} />
       </Routes>
     </Router>
  );
}

export default App;