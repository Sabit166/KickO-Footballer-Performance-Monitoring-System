import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import Login from './Components/NewLogin';
import Emne from './Components/Welcome';
import Adminpage from './Components/Adminpage';
import Players from './Components/Players';
import MatchPage from './Components/Match';
import TeamPerformancePage from './Components/TeamPerformance';
import PlayersPerformancePage from './Components/PlayerPerformance';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emne" element={<Emne />} />
        <Route path="/adminpage" element={<Adminpage />}>
          <Route index element={<Emne />} />
          <Route path="addplayer" element={<Players />} />
          <Route path="match" element={<MatchPage />} />
          <Route path="teamperformance" element={<TeamPerformancePage />} />
          <Route path="playerperformance" element={<PlayersPerformancePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;