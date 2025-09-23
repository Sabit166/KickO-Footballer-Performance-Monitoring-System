import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the selected role from navigation state
  const selectedRole = location.state?.selectedRole || 'player';

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      // Store the selected role in localStorage
      localStorage.setItem("userRole", selectedRole);
      
      // Navigate based on role
      if (selectedRole === 'admin') {
        navigate("/admin-dashboard"); // You'll need to create this route
      } else {
        // For player login, you might want to pass player data
        navigate("/player-dashboard", { 
          state: { 
            playerName: username, 
            teamid: "TEAM001", // This should come from your API
            email: "player@example.com" // This should come from your API
          } 
        });
      }
    }
  };

  const getRoleIcon = () => {
    return selectedRole === 'admin' ? '🛡️' : '⚽';
  };

  const getRoleTitle = () => {
    return selectedRole === 'admin' ? 'Admin Login' : 'Player Login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div
        className="flex flex-col justify-center p-8 rounded-lg shadow-lg w-full max-w-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{getRoleIcon()}</div>
          <h1 className="text-2xl font-bold text-white">{getRoleTitle()}</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-white mb-1" htmlFor="username">
              {selectedRole === 'admin' ? 'Admin Username' : 'Player Username'}
            </label>
            <input
              id="username"
              type="text"
              placeholder={`Enter your ${selectedRole} username`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded bg-gray-700 bg-opacity-60 text-white placeholder-gray-300 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-white mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 rounded bg-gray-700 bg-opacity-60 text-white placeholder-gray-300 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <button
            type="submit"
            className={`w-full font-semibold py-2 rounded transition duration-200 text-white ${
              selectedRole === 'admin' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Login as {selectedRole === 'admin' ? 'Admin' : 'Player'}
          </button>
        </form>

        <button
          onClick={() => navigate('/role-selection')}
          className="mt-4 text-white text-sm hover:underline text-center"
        >
          ← Choose different role
        </button>
      </div>
    </div>
  );
}

export default LoginPage;