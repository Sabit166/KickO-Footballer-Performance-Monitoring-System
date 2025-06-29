import React, { useState } from 'react';

const Players = ({ players, setPlayers }) => {
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    position: '',
    goals: 0,
    assists: 0
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (newPlayer.name && newPlayer.position) {
      const player = {
        id: Date.now(),
        ...newPlayer,
        goals: Number(newPlayer.goals),
        assists: Number(newPlayer.assists)
      };
      setPlayers([...players, player]);
      setNewPlayer({ name: '', position: '', goals: 0, assists: 0 });
      setShowAddForm(false);
    }
  };

  const handleDeletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  return (
    <div>
      <h1 className="section-title">Players Management</h1>
      
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <button 
          className="btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Player'}
        </button>
      </div>

      {showAddForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2>Add New Player</h2>
          <form onSubmit={handleAddPlayer}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Player Name"
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
                required
              />
              <input
                type="text"
                placeholder="Position"
                value={newPlayer.position}
                onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
                required
              />
              <input
                type="number"
                placeholder="Goals"
                value={newPlayer.goals}
                onChange={(e) => setNewPlayer({...newPlayer, goals: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
                min="0"
              />
              <input
                type="number"
                placeholder="Assists"
                value={newPlayer.assists}
                onChange={(e) => setNewPlayer({...newPlayer, assists: e.target.value})}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
                min="0"
              />
            </div>
            <button type="submit" className="btn">Add Player</button>
          </form>
        </div>
      )}

      <div className="grid">
        {players.map(player => (
          <div key={player.id} className="card">
            <h2>{player.name}</h2>
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Goals:</strong> {player.goals}</p>
            <p><strong>Assists:</strong> {player.assists}</p>
            <button 
              className="btn btn-secondary"
              onClick={() => handleDeletePlayer(player.id)}
              style={{ backgroundColor: '#e74c3c', marginTop: '1rem' }}
            >
              Remove Player
            </button>
          </div>
        ))}
      </div>

      {players.length === 0 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>No Players Found</h2>
          <p>Add your first player to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Players;
