import React from "react";
import { Link } from "react-router-dom";

const dummyTeams = [
  { id: 1, name: "Dhaka United", coach: "Coach A", stadium: "Bangabandhu Stadium" },
  { id: 2, name: "Chittagong Kings", coach: "Coach B", stadium: "M. A. Aziz Stadium" },
];

function TeamsList() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Teams</h2>
      <ul>
        {dummyTeams.map((team) => (
          <li key={team.id} className="mb-2">
            <Link to={`/teams/${team.id}`} className="text-green-700">
              {team.name} - {team.coach} ({team.stadium})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsList;
