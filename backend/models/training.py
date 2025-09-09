from flask import Blueprint, request, jsonify
from db import get_db
import json

training_bp = Blueprint('training', __name__, url_prefix='/trainings')

# GET all training session types
@training_bp.route('/', methods=['GET'])
def get_all_trainings():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM training")
    trainings = cursor.fetchall()
    # Convert JSON string from DB to list/dict
    for training in trainings:
        if 'activities' in training and isinstance(training['activities'], str):
            try:
                training['activities'] = json.loads(training['activities'])
            except json.JSONDecodeError:
                training['activities'] = [] # Or some other default
    return jsonify(trainings)

# GET a single training session type by ID
@training_bp.route('/<int:training_id>', methods=['GET'])
def get_training_by_id(training_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM training WHERE training_id = %s", (training_id,))
    training = cursor.fetchone()
    if training:
        if 'activities' in training and isinstance(training['activities'], str):
            try:
                training['activities'] = json.loads(training['activities'])
            except json.JSONDecodeError:
                training['activities'] = []
        return jsonify(training)
    return jsonify({"message": "Training not found"}), 404

# CREATE a new training session type
@training_bp.route('/', methods=['POST'])
def add_training():
    data = request.json
    required_fields = ['time_of_day', 'type', 'focus', 'intensity', 'duration']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    db = get_db()
    cursor = db.cursor()
    
    # Handle activities which is a JSON field
    activities = data.get('activities')
    if activities:
        activities = json.dumps(activities)

    sql = """INSERT INTO training (time_of_day, type, focus, activities, intensity, duration)
             VALUES (%s, %s, %s, %s, %s, %s)"""
    try:
        cursor.execute(sql, (
            data['time_of_day'], data['type'], data['focus'],
            activities, data['intensity'], data['duration']
        ))
        db.commit()
        return jsonify({"message": "Training session type added successfully", "training_id": cursor.lastrowid}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

# UPDATE a training session type
@training_bp.route('/<int:training_id>', methods=['PUT'])
def update_training(training_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()

    update_fields = []
    update_values = []
    for key, value in data.items():
        if key == 'activities':
            update_fields.append("activities=%s")
            update_values.append(json.dumps(value))
        else:
            update_fields.append(f"{key}=%s")
            update_values.append(value)

    if not update_fields:
        return jsonify({"error": "No fields to update"}), 400

    sql = f"UPDATE training SET {', '.join(update_fields)} WHERE training_id=%s"
    update_values.append(training_id)

    try:
        cursor.execute(sql, tuple(update_values))
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({"message": "Training not found"}), 404
        return jsonify({"message": "Training session type updated successfully"})
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

# DELETE a training session type
@training_bp.route('/<int:training_id>', methods=['DELETE'])
def delete_training(training_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM training WHERE training_id=%s", (training_id,))
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({"message": "Training not found"}), 404
        return jsonify({"message": "Training session type deleted successfully"})
    except Exception as e:
        db.rollback()
        # Check for foreign key constraint error
        if "1451" in str(e):
             return jsonify({"error": "Cannot delete training session type because it is referenced by training records."}), 409
        return jsonify({"error": str(e)}), 500
