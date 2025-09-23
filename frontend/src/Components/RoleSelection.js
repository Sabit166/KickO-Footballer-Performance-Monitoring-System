import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // Navigate to specific login pages based on role
    if (role === 'admin') {
      navigate('/admin-login');
    } else if (role === 'player') {
      navigate('/player-login');
    }
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
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Select Login Type
        </h1>
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleRoleSelect('admin')}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <span>🛡️</span>
            <span>Login as Admin</span>
          </button>
          
          <button
            onClick={() => handleRoleSelect('player')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <span>⚽</span>
            <span>Login as Player</span>
          </button>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 text-white text-sm hover:underline text-center"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default RoleSelection;