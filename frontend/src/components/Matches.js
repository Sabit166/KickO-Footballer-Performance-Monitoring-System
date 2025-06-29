import React, { useState } from 'react';

const Matches = ({ matches, setMatches }) => {
  const [newMatch, setNewMatch] = useState({
    homeTeam: '',
    awayTeam: '',
    date: '',
    score: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMatch = (e) => {
    e.preventDefault();
    if (newMatch.homeTeam && newMatch.awayTeam && newMatch.date) {
      const match = {
        id: Date.now(),
        ...newMatch
      };
      setMatches([...matches, match]);
      setNewMatch({ homeTeam: '', awayTeam: '', date: '', score: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteMatch = (id) => {
    setMatches(matches.filter(match => match.id !== id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h1 className="section-title">Matches Management</h1>
      
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <button 
          className="btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Match'}
        </button>
      </div>

      {showAddForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2>Add New Match</h2>
          <form onSubmit={handleAddMatch}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Home Team"
                value={newMatch.homeTeam}
                onChange={(e) => setNewMatch({...newMatch, homeTeam: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
                required
              />
              <input
                type="text"
                placeholder="Away Team"
                value={newMatch.awayTeam}
                onChange={(e) => setNewMatch({...newMatch, awayTeam: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
                required
              />
              <input
                type="date"
                value={newMatch.date}
                onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
                required
              />
              <input
                type="text"
                placeholder="Score (e.g., 2-1)"
                value={newMatch.score}
                onChange={(e) => setNewMatch({...newMatch, score: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
              />
            </div>
            <button type="submit" className="btn">Add Match</button>
          </form>
        </div>
      )}

      <div className="grid">
        {matches.map(match => (
          <div key={match.id} className="card">
            <h2>{match.homeTeam} vs {match.awayTeam}</h2>
            <p><strong>Date:</strong> {formatDate(match.date)}</p>
            {match.score && <p><strong>Score:</strong> {match.score}</p>}
            <p><strong>Status:</strong> {new Date(match.date) > new Date() ? '🔜 Upcoming' : '✅ Completed'}</p>
            <button 
              className="btn btn-secondary"
              onClick={() => handleDeleteMatch(match.id)}
              style={{ backgroundColor: '#e74c3c', marginTop: '1rem' }}
            >
              Remove Match
            </button>
          </div>
        ))}
      </div>

      {matches.length === 0 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>No Matches Found</h2>
          <p>Add your first match to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Matches;
