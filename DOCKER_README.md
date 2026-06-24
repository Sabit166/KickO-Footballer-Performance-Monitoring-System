# Docker Setup Guide

This project ships with Docker support for the full KickO stack:

- `frontend` - React application
- `backend` - Flask API
- `backend2` - Node.js authentication server
- `db` - MySQL 8.0 database

The root `README.md` links here for Docker-specific usage.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose available on your machine
- Ports `3000`, `5000`, `5001`, and `3307` free for the development stack

## Project Docker Files

- [docker-compose.yml](docker-compose.yml) - development stack
- [docker-compose.prod.yml](docker-compose.prod.yml) - production stack
- [backend/Dockerfile](backend/Dockerfile) - Flask image
- [Backend2/Dockerfile](Backend2/Dockerfile) - Node.js auth server image
- [frontend/Dockerfile](frontend/Dockerfile) - React development image
- [frontend/Dockerfile.prod](frontend/Dockerfile.prod) - React production image

## Development Setup

The default compose file starts the app in development mode with live reloading where supported.

### Start All Services

```bash
docker-compose up --build
```

To run in the background:

```bash
docker-compose up -d --build
```

### Stop the Stack

```bash
docker-compose down
```

To remove the database volume as well:

```bash
docker-compose down -v
```

### Development Ports

- Frontend: http://localhost:3000
- Flask backend: http://localhost:5000
- Auth server: http://localhost:5001
- MySQL: localhost:3307

## What Each Service Does

### MySQL Database

The `db` service uses `mysql:8.0` with these defaults in the development compose file:

- root password: `root`
- database name: `p_dbms`
- host port: `3307`

The `SQL/` folder is mounted into `/docker-entrypoint-initdb.d`, so any SQL files in that folder are executed when the database volume is created for the first time.

### Flask Backend

The Flask service is built from [backend/Dockerfile](backend/Dockerfile).

It:

- installs Python dependencies from `requirements.txt`
- copies the backend package into the image
- runs the Flask app on port `5000`

The container uses these database environment variables:

- `MYSQL_HOST=db`
- `MYSQL_USER=root`
- `MYSQL_PASSWORD=root`
- `MYSQL_DATABASE=p_dbms`

### Node.js Auth Server

The auth server is built from [Backend2/Dockerfile](Backend2/Dockerfile).

It:

- installs dependencies from `Backend2/package.json`
- exposes port `5001`
- starts `Server.js`

### React Frontend

The development frontend is built from [frontend/Dockerfile](frontend/Dockerfile).

It:

- installs frontend dependencies
- starts the React dev server
- exposes port `3000`

The frontend container is configured to talk to:

- `http://localhost:5000` for the Flask API
- `http://localhost:5001` for the auth API

## Production Setup

Use the production compose file when you want the frontend served from Nginx and want the services configured from environment variables.

### Recommended Environment Variables

Create a `.env` file in the project root before running production compose:

```env
MYSQL_ROOT_PASSWORD=your-root-password
MYSQL_DATABASE=p_dbms
MYSQL_USER=root
MYSQL_PASSWORD=your-root-password
```

### Start the Production Stack

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Production Ports

- Frontend: http://localhost
- Flask backend: http://localhost:5000
- Auth server: http://localhost:5001
- MySQL: localhost:3306

### Production Frontend Build

The production frontend uses [frontend/Dockerfile.prod](frontend/Dockerfile.prod), which performs a multi-stage build:

1. builds the React app with Node.js
2. serves the static build with Nginx on port `80`

## Useful Commands

### View Logs

```bash
docker-compose logs -f
```

To inspect a single service:

```bash
docker-compose logs -f backend
docker-compose logs -f backend2
docker-compose logs -f frontend
docker-compose logs -f db
```

### Rebuild One Service

```bash
docker-compose up --build backend
```

### Restart After Code Changes

If you change source files and want the containers rebuilt, run:

```bash
docker-compose up --build
```

If volumes are in the way, reset them first:

```bash
docker-compose down -v
```

## Troubleshooting

### Database Will Not Start

- Check that Docker Desktop is running
- Make sure port `3307` is not already in use
- Remove the database volume with `docker-compose down -v` and start again if the schema is corrupted

### Frontend Cannot Reach the APIs

- Confirm the backend containers are running
- Check that the frontend environment variables still point to `http://localhost:5000` and `http://localhost:5001`
- Open the backend logs to confirm the services are healthy

### Authentication Fails

- Confirm the MySQL container started successfully
- Verify the `team` and `users` tables were created by the auth server on startup
- Check `Backend2/Server.js` for the login and signup request payloads expected by the API

### Compose Rebuild Seems Stale

- Run `docker-compose down -v`
- Then run `docker-compose up --build` again

## Notes

- The development compose file maps MySQL to host port `3307`, not `3306`, to avoid conflicts with local MySQL installations.
- The production compose file maps MySQL to host port `3306` and expects secrets to come from environment variables.
- The current backend image runs Flask with the built-in development server as defined in [backend/Dockerfile](backend/Dockerfile).
