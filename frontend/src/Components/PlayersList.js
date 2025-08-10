import React from "react";
import { Link } from "react-router-dom";

const dummyPlayers = [
  { id: 1, name: "Sabbir", height: "5'9", position: "Midfielder", team: "Dhaka United" },
  { id: 2, name: "Kamal", height: "6'0", position: "Defender", team: "Chittagong Kings" },
];

function PlayersList() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Players</h2>
      <ul>
        {dummyPlayers.map((player) => (
          <li key={player.id} className="mb-2">
            <Link to={`/players/${player.id}`} className="text-blue-600">
              {player.name} - {player.position} ({player.team})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayersList;
