import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PlayersList from './Components/PlayersList';

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to KickO</h1>
      <button onClick={() => navigate('/players')}>View Player</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<PlayersList />} />
      </Routes>
    </Router>
  );
}

export default App;