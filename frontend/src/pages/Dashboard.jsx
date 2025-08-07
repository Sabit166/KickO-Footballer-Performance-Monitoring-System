import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const role = localStorage.getItem("userRole");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard ({role})</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/players" className="p-4 bg-green-200">Players List</Link>
        <Link to="/teams" className="p-4 bg-yellow-200">Teams</Link>
        <div className="p-4 bg-red-200">Injury Alerts</div>
      </div>
    </div>
  );
}

export default Dashboard;
