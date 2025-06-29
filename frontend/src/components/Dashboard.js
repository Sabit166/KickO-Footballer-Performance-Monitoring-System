import React from 'react';

const Dashboard = ({ players, matches }) => {
  const totalGoals = players.reduce((sum, player) => sum + player.goals, 0);
  const totalAssists = players.reduce((sum, player) => sum + player.assists, 0);
  const upcomingMatches = matches.filter(match => new Date(match.date) > new Date());

  return (
    <div>
      <h1 className="section-title">Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{players.length}</div>
          <div className="stat-label">Total Players</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{matches.length}</div>
          <div className="stat-label">Total Matches</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalGoals}</div>
          <div className="stat-label">Total Goals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalAssists}</div>
          <div className="stat-label">Total Assists</div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Recent Activity</h2>
          <p>Welcome to KickO Football Management System!</p>
          <p>Here you can manage your players, track matches, and monitor team performance.</p>
          <button className="btn">View Full Report</button>
        </div>
        
        <div className="card">
          <h2>Upcoming Matches</h2>
          {upcomingMatches.length > 0 ? (
            upcomingMatches.slice(0, 3).map(match => (
              <div key={match.id} style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                <strong>{match.homeTeam} vs {match.awayTeam}</strong>
                <br />
                <small>{new Date(match.date).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <p>No upcoming matches scheduled.</p>
          )}
          <button className="btn btn-secondary">View All Matches</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
