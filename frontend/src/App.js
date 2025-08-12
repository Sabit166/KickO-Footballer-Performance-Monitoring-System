import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PlayersList from './Components/PlayersList';
import './App.css';
import { Box, Typography, Button, Container } from '@mui/material';
import backgroundImage from './background_home.png'; // Make sure this file is in src/ folder
import HomePage from './Components/HomePage';

function App() {


  return (
     <Router>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/players" element={<PlayersList />} />
         <Route path="/test" element={<Test />} />
       </Routes>
     </Router>
  );
}

export default App;