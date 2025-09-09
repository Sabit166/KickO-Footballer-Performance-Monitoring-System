# Contributing to KickO-Footballer-Performance-Monitoring-System

Thank you for your interest in contributing! This guide will help new contributors get the project running locally without issues.

---
## 1. Clone the Repository
```bash
git clone https://github.com/Sabit166/KickO-Footballer-Performance-Monitoring-System.git
cd KickO-Footballer-Performance-Monitoring-System
```

## 2. Backend Setup (Python + Flask)
1. Create and activate a virtual environment:
   - Windows (PowerShell):
     ```powershell
     python -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
   - macOS/Linux:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Configure MySQL:
   - Ensure MySQL Server is running and you have a `root` (or equivalent) user.
   - Create the `p_dbms` database if it doesn’t exist.

4. Load the database schema and seed data:
   - PowerShell:
     ```powershell
     Get-Content .\database_forward_engineering.sql | mysql -u root -p p_dbms
     ```
   - Or inside the MySQL client:
     ```sql
     CREATE DATABASE IF NOT EXISTS p_dbms;
     USE p_dbms;
     SOURCE D:/KickO-Footballer-Performance-Monitoring-System/database_forward_engineering.sql;
     ```

5. Start the Flask API:
```bash
python -m backend.app
```
By default the API listens on `http://127.0.0.1:5000`.

---
## 3. Frontend Setup (React + Tailwind)
1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Ensure Tailwind is installed and configured:
   - Tailwind, PostCSS, and Autoprefixer should already be listed in `devDependencies`.
   - The `tailwind.config.js` and `postcss.config.js` files should exist at `frontend/` root.

4. Start the React dev server:
```bash
npm start
```
The app will open at `http://localhost:3000` by default.

---
## 4. Development Workflow
- Create a feature branch:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- Commit changes with clear messages:
  ```bash
  git add .
  git commit -m "feat: add XYZ endpoint"
  ```
- Push your branch and open a pull request against `feature-x` or `main`:
  ```bash
  git push origin feature/your-feature-name
  ```

---
## 5. Coding Standards
- Follow existing code style in Python (PEP8) and JavaScript (ESLint rules).
- Write clear, concise commit messages prefixed with `feat:`, `fix:`, `docs:`, etc.
- Include unit tests where appropriate.

---
## 6. Questions
If you encounter any issues setting up or running the project, please open an issue or reach out to the maintainers. Thank you for helping improve KickO!
