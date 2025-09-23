import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import Login from './Components/NewLogin';
import NewPlayerLogin from './Components/NewPlayerLogin';
import NewAdminLogin from './Components/NewAdminLogin';
import PlayerProfile from './Components/singlePlayer';
import Emne from './Components/Welcome';
import Adminpage from './Components/Adminpage';
import RoleSelection from './Components/RoleSelection';
import Players from './Components/Players';
import MatchPage from './Components/Match';
import TeamPerformancePage from './Components/TeamPerformance';
import TrainingDashboard from './Components/TrainingDashboard';
import PlayersPerformancePage from './Components/PlayerPerformance';
import AddMatchWizard from './Components/AddMatchWizard';
import CoachPage from './Components/Coach';
import Playerpage from './Components/Playerpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player-login" element={<NewPlayerLogin />} />
        <Route path="/admin-login" element={<NewAdminLogin />} />
        <Route path="/emne" element={<Emne />} />
        <Route path="/adminpage" element={<Adminpage />}>
          <Route index element={<Emne />} />
          <Route path="player" element={<Players />} />
          <Route path="match" element={<MatchPage />} />
          <Route path="add-match" element={<AddMatchWizard />} />
          <Route path="teamperformance" element={<TeamPerformancePage />} />
          <Route path="training" element={<TrainingDashboard />} />
          <Route path="playerperformance" element={<PlayersPerformancePage />} />
          <Route path="coach" element={<CoachPage />} />
        </Route>
        <Route path="/playerdashboard" element={<Playerpage />}>
          <Route index element={<Emne />} />
          <Route path="player-profile" element={<PlayerProfile />} />
          {/* <Route path="profile" element={<PlayerProfile />} />
          <Route path="performance" element={<PlayersPerformancePage />} />
          <Route path="injury" element={<Injury />} />
          <Route path="team" element={<TeamProfile />} />
          <Route path="match" element={<MatchPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;