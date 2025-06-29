// API utility functions for connecting to the Flask backend

const API_BASE_URL = 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Player API functions
export const playerAPI = {
  // Get all players
  getAll: () => apiCall('/players'),
  
  // Get player by ID
  getById: (id) => apiCall(`/players/${id}`),
  
  // Create new player
  create: (playerData) => apiCall('/players', {
    method: 'POST',
    body: JSON.stringify(playerData)
  }),
  
  // Update player
  update: (id, playerData) => apiCall(`/players/${id}`, {
    method: 'PUT',
    body: JSON.stringify(playerData)
  }),
  
  // Delete player
  delete: (id) => apiCall(`/players/${id}`, {
    method: 'DELETE'
  })
};

// Match API functions
export const matchAPI = {
  // Get all matches
  getAll: () => apiCall('/matches'),
  
  // Get match by ID
  getById: (id) => apiCall(`/matches/${id}`),
  
  // Create new match
  create: (matchData) => apiCall('/matches', {
    method: 'POST',
    body: JSON.stringify(matchData)
  }),
  
  // Update match
  update: (id, matchData) => apiCall(`/matches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(matchData)
  }),
  
  // Delete match
  delete: (id) => apiCall(`/matches/${id}`, {
    method: 'DELETE'
  })
};

// Performance API functions
export const performanceAPI = {
  // Get player performance stats
  getPlayerStats: (playerId) => apiCall(`/performance/player/${playerId}`),
  
  // Get team performance stats
  getTeamStats: () => apiCall('/performance/team')
};

// Injury API functions
export const injuryAPI = {
  // Get all injuries
  getAll: () => apiCall('/injuries'),
  
  // Get injuries by player
  getByPlayer: (playerId) => apiCall(`/injuries/player/${playerId}`),
  
  // Create new injury record
  create: (injuryData) => apiCall('/injuries', {
    method: 'POST',
    body: JSON.stringify(injuryData)
  }),
  
  // Update injury record
  update: (id, injuryData) => apiCall(`/injuries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(injuryData)
  })
};

// Utility functions
export const utils = {
  // Format date for display
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  // Calculate age from birthdate
  calculateAge: (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  },
  
  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};

export default { playerAPI, matchAPI, performanceAPI, injuryAPI, utils };
