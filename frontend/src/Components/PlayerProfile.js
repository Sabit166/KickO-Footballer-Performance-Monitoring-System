import React from "react";
import { useParams } from "react-router-dom";

function PlayerProfile() {
  const { id } = useParams();
  // Dummy data for display
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Player Profile: {id}</h2>
      <div className="mb-4">Height: 5'10"</div>
      <div className="mb-4">Weight: 72kg</div>
      <div className="mb-4">Team: Dhaka United</div>
      <div className="mb-4">Contract: Till 2026</div>
      <div className="flex gap-4">
        <button className="bg-blue-300 px-4 py-2">Match Stats</button>
        <button className="bg-blue-300 px-4 py-2">Training</button>
        <button className="bg-blue-300 px-4 py-2">Injuries</button>
        <button className="bg-blue-300 px-4 py-2">Contract</button>
      </div>
    </div>
  );
}

export default PlayerProfile;
