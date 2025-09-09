# Copilot Instructions for KickO-Footballer-Performance-Monitoring-System

## Project Overview
- **Monorepo** with `backend` (Flask, MySQL) and `frontend` (React, Create React App)
- Backend exposes REST APIs for footballer/team management; frontend consumes these APIs for UI
- Data model is modularized in `backend/models/` (one file per entity, each as a Flask Blueprint)

## Backend (Flask)
- Entry point: `backend/app.py` (registers all blueprints)
- DB connection: `backend/db.py` (MySQL, credentials hardcoded)
- Each model in `backend/models/` defines a Flask Blueprint (e.g., `player_bp`, `team_bp`)
- Blueprints are registered in `app.py` and expose REST endpoints for CRUD
- To run: `python backend/app.py` (runs Flask dev server)
- Requirements: see `requirements.txt` (Flask, flask-cors, mysql-connector, etc.)
- DB teardown handled via `@app.teardown_appcontext`

## Frontend (React)
- Bootstrapped with Create React App (`frontend/`)
- Main entry: `frontend/src/index.js`, main app: `frontend/src/App.js`
- Components in `frontend/src/Components/` (e.g., `PlayerProfile.js`, `PlayersList.js`)
- To run: `cd frontend && npm start`
- To test: `cd frontend && npm test`
- Uses React Router for navigation (see `useParams` in components)

## Cross-Component Patterns
- **API Integration**: Frontend fetches data from Flask backend (API URLs not hardcoded in current code, but expected pattern)
- **Blueprint Pattern**: Each backend model exposes a Flask Blueprint for modular routing
- **Dummy Data**: Some frontend components use placeholder data; real integration may require API calls

## Developer Workflows
- Backend: `python backend/app.py` (ensure MySQL is running and credentials match `db.py`)
- Frontend: `cd frontend && npm start`
- Install backend deps: `pip install -r requirements.txt`
- Install frontend deps: `cd frontend && npm install`
- No monorepo-level build/test scripts; handle backend/frontend separately

## Conventions & Notes
- Backend endpoints are grouped by entity (see `backend/models/`)
- Use Blueprints for all new backend modules
- Frontend uses functional React components and hooks
- No TypeScript or advanced state management (Redux, etc.)
- Database schema is referenced in `KickO_Schema.png`

## Key Files
- `backend/app.py`: Flask app, blueprint registration
- `backend/db.py`: DB connection logic
- `backend/models/`: All REST API logic per entity
- `frontend/src/Components/`: All React UI components
- `requirements.txt`, `frontend/package.json`: Dependency lists

---
For any new features, follow the modular blueprint/component pattern and keep backend/frontend concerns separated. When in doubt, check existing files for structure and naming.
