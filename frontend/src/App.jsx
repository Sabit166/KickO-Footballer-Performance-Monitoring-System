import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PlayersList from "./pages/PlayersList";
import PlayerProfile from "./pages/PlayerProfile";
import TeamsList from "./pages/TeamsList";
import TeamProfile from "./pages/TeamProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/players" element={<PlayersList />} />
        <Route path="/players/:id" element={<PlayerProfile />} />
        <Route path="/teams" element={<TeamsList />} />
        <Route path="/teams/:id" element={<TeamProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
