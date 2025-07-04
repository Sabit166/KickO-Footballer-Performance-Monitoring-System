# My Web App

## Overview
This project is a web application designed to manage player information, match performance, training and fitness data, medical injuries, and analytics reports. It is structured into several modules, each handling a specific aspect of the application.

## Project Structure
The project is organized into the following main directories:

- **player_mgmt/**: Manages player information.
- **match_performance/**: Handles match data and statistics.
- **training_fitness/**: Manages training sessions and fitness data.
- **medical_injury/**: Tracks medical injuries and reports.
- **analytics_reports/**: Generates and displays analytics reports.
- **shared_core/**: Contains shared components and utilities used across the application.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-web-app
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Set up the database:
   - Run the SQL scripts located in the `db/` directories of each module to create the necessary tables.

6. Start the application:
   - Run the backend server:
     ```
     python shared_core/backend/app.py
     ```

## Usage
- Access the frontend application in your web browser at `http://localhost:3000`.
- Use the navigation components to explore different sections of the application.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.