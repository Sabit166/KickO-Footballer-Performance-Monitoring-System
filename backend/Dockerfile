# Use Python 3.10 slim image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements file from parent directory
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory
COPY backend/ /app/backend/

# Set environment variables
ENV FLASK_APP=backend.app
ENV PYTHONUNBUFFERED=1

# Expose Flask port
EXPOSE 5000

# Run the Flask application
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000"]
