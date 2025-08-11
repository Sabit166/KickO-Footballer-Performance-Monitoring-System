import React, { useEffect, useState } from 'react';

function PlayersList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/players')
      .then(response => response.json())
      .then(data => setPlayers(data));
  }, []);

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlayersList;