import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem("userRole", "admin"); // simulate role
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen flex-col items-center justify-center bg-cover bg-center"
    >
      <div
        className="flex-col justify-center p-8 rounded-lg shadow-lg w-full max-w-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)', // transparent white
          backdropFilter: 'blur(10px)', // frosted glass
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-white mb-1" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
