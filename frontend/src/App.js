import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Players from './components/Players';
import Matches from './components/Matches';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  // Sample data - in a real app, this would come from your backend API
  useEffect(() => {
    // Mock player data
    setPlayers([
      { id: 1, name: 'Lionel Messi', position: 'Forward', goals: 25, assists: 12 },
      { id: 2, name: 'Virgil van Dijk', position: 'Defender', goals: 3, assists: 2 },
      { id: 3, name: 'Kevin De Bruyne', position: 'Midfielder', goals: 8, assists: 15 },
    ]);

    // Mock match data
    setMatches([
      { id: 1, homeTeam: 'Barcelona', awayTeam: 'Real Madrid', date: '2025-07-15', score: '2-1' },
      { id: 2, homeTeam: 'Liverpool', awayTeam: 'Manchester City', date: '2025-07-20', score: '3-2' },
      { id: 3, homeTeam: 'Arsenal', awayTeam: 'Chelsea', date: '2025-07-25', score: '1-1' },
    ]);
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'players':
        return <Players players={players} setPlayers={setPlayers} />;
      case 'matches':
        return <Matches matches={matches} setMatches={setMatches} />;
      default:
        return <Dashboard players={players} matches={matches} />;
    }
  };

  return (
    <div className="App">
      <Header />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main">
        <div className="container">
          {renderPage()}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
