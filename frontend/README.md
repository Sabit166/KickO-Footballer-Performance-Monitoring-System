# KickO Frontend

This is the React frontend for the KickO Football Management System.

## Features

- **Dashboard**: Overview of team statistics and upcoming matches
- **Player Management**: Add, view, and manage player information
- **Match Management**: Schedule and track matches
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # App header with title
│   ├── Navigation.js   # Main navigation menu
│   ├── Dashboard.js    # Dashboard overview
│   ├── Players.js      # Player management
│   ├── Matches.js      # Match management
│   └── Footer.js       # App footer
├── utils/
│   └── api.js          # API utility functions
├── App.js              # Main App component
├── App.css             # App-specific styles
├── index.js            # React entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Integration

The frontend includes utility functions in `src/utils/api.js` for connecting to the Flask backend API. The API base URL is configured for `http://localhost:5000/api`.

### API Functions Available:

- **Player API**: CRUD operations for players
- **Match API**: CRUD operations for matches
- **Performance API**: Player and team statistics
- **Injury API**: Injury tracking and management

## Styling

The app uses modern CSS with:
- CSS Grid and Flexbox for layouts
- Responsive design principles
- CSS variables for consistent theming
- Smooth animations and transitions

## Components Overview

### Header
Displays the app title and subtitle.

### Navigation
Tab-based navigation between different sections.

### Dashboard
Shows overview statistics and recent activity.

### Players
Full CRUD interface for managing players with forms and cards.

### Matches
Interface for scheduling and managing matches.

### Footer
Simple footer with copyright information.

## Future Enhancements

- User authentication
- Real-time updates
- Advanced statistics and charts
- Player photos and detailed profiles
- Match live scoring
- Export functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the KickO Football Management System.
