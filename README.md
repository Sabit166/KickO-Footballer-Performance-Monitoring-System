# ⚽ KickO - Footballer Performance Monitoring System

A comprehensive full-stack application for monitoring and analyzing footballer performance, team statistics, and training records.

## 🏗️ Architecture

- **Frontend**: React (Create React App) - Port 3000
- **Backend**: Flask (Python) - Port 5000
- **Auth Server**: Node.js/Express - Port 5001
- **Database**: MySQL 8.0 - Port 3306

## 🚀 Quick Start with Docker (Recommended)

### Prerequisites
- Docker
- Docker Compose

### Run the Application

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Flask Backend**: http://localhost:5000
- **Auth API**: http://localhost:5001

📖 For detailed Docker instructions, see [DOCKER_README.md](DOCKER_README.md)

## 🛠️ Manual Setup (Without Docker)

### Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL 8.0

### 1. Database Setup

```bash
# Start MySQL and create database
mysql -u root -p
CREATE DATABASE p_dbms;

# Import SQL files
mysql -u root -p p_dbms < SQL/database_forward_engineering.sql
```

### 2. Backend (Flask) Setup

```bash
cd backend
pip install -r ../requirements.txt
python app.py
```

The Flask backend will run on `http://localhost:5000`

### 3. Backend2 (Node.js Auth) Setup

```bash
cd Backend2
npm install
npm start
```

The Node.js auth server will run on `http://localhost:5001`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React frontend will run on `http://localhost:3000`

## 📂 Project Structure

```
KickO-Footballer-Performance-Monitoring-System/
├── backend/              # Flask REST API
│   ├── models/          # Database models & blueprints
│   ├── app.py           # Flask application entry point
│   ├── db.py            # Database connection
│   └── Dockerfile       # Docker configuration
├── Backend2/            # Node.js authentication server
│   ├── Server.js        # Express server
│   └── Dockerfile       # Docker configuration
├── frontend/            # React frontend
│   ├── src/
│   │   └── Components/  # React components
│   └── Dockerfile       # Docker configuration
├── SQL/                 # Database scripts
├── docker-compose.yml   # Docker orchestration
└── DOCKER_README.md     # Docker documentation
```

## 🎯 Features

- Player performance tracking
- Team statistics and analytics
- Training records management
- Match statistics
- Injury tracking
- User authentication and authorization
- Role-based access (Admin, Coach, Player)

## 🔧 Configuration

### Database Configuration

Edit database credentials in:
- `backend/db.py` (Flask)
- `Backend2/Server.js` (Node.js)

Or use environment variables (recommended for Docker):
```bash
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=p_dbms
```

## 📊 API Endpoints

### Flask Backend (Port 5000)
- `/api/players` - Player management
- `/api/teams` - Team management
- `/api/training` - Training records
- `/api/matches` - Match statistics
- `/api/injuries` - Injury tracking

### Auth Server (Port 5001)
- `POST /api/login` - User authentication
- `POST /api/signup` - User registration

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check database credentials
- Verify database `p_dbms` exists

### Port Conflicts
- Check if ports 3000, 5000, 5001, or 3306 are already in use
- Change ports in configuration files if needed

### Docker Issues
- Run `docker-compose down -v` to clear volumes
- Rebuild images: `docker-compose up --build`
- Check logs: `docker-compose logs -f`

## 📝 Development

### Backend Development
```bash
cd backend
python app.py  # Runs with debug mode
```

### Frontend Development
```bash
cd frontend
npm start  # Runs with hot-reload
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed by the KickO Team

---

For Docker-specific instructions and troubleshooting, please refer to [DOCKER_README.md](DOCKER_README.md)
