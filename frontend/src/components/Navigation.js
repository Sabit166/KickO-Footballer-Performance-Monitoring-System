import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'players', label: '👥 Players' },
    { id: 'matches', label: '⚽ Matches' },
  ];

  return (
    <nav className="nav">
      <div className="container">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id);
                }}
                style={{
                  backgroundColor: currentPage === item.id ? '#2c3e50' : 'transparent'
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
