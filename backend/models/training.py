from flask import Blueprint, request, jsonify
from db import get_db
import json

training_bp = Blueprint('training', __name__, url_prefix='/trainings')

# Generate next training_id using sequence
def get_next_training_id():
    db = get_db()
    cursor = db.cursor()
    # Update sequence and get next value
    cursor.execute("UPDATE training_sequence SET next_val = next_val + 1")
    cursor.execute("SELECT next_val - 1 as current_val FROM training_sequence")
    result = cursor.fetchone()
    db.commit()
    return f"TRN{result['current_val']:03d}"  # Format as TRN001, TRN002, etc.

# GET all training session types with aggregated stats using GROUP BY
@training_bp.route('/', methods=['GET'])
def get_all_trainings():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    # Use JOIN and GROUP BY to get training with performance stats
    cursor.execute("""
        SELECT 
            t.*,
            COUNT(tr.player_id) as total_sessions,
            AVG(tr.distance_covered) as avg_distance,
            AVG(tr.passing_accuracy) as avg_accuracy,
            MAX(tr.day) as last_session_date
        FROM training t
        LEFT JOIN training_records tr ON t.training_id = tr.training_id
        GROUP BY t.training_id, t.time_of_day, t.type, t.focus, t.activities, t.intensity, t.duration
        ORDER BY t.training_id
    """)
    trainings = cursor.fetchall()
    # Convert JSON string from DB to list/dict
    for training in trainings:
        if 'activities' in training and isinstance(training['activities'], str):
            try:
                training['activities'] = json.loads(training['activities'])
            except json.JSONDecodeError:
                training['activities'] = [] # Or some other default
    return jsonify(trainings)

# GET a single training session type by ID with aggregated performance
@training_bp.route('/<string:training_id>', methods=['GET'])
def get_training_by_id(training_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    # Use JOIN and aggregate functions to get detailed stats
    cursor.execute("""
        SELECT 
            t.*,
            COUNT(tr.player_id) as total_participants,
            COUNT(DISTINCT tr.player_id) as unique_players,
            AVG(tr.distance_covered) as avg_distance,
            MAX(tr.distance_covered) as max_distance,
            MIN(tr.distance_covered) as min_distance,
            AVG(tr.passing_accuracy) as avg_accuracy,
            AVG(tr.sprint_count) as avg_sprints,
            AVG(tr.shots_on_target) as avg_shots,
            MAX(tr.day) as last_session,
            MIN(tr.day) as first_session
        FROM training t
        LEFT JOIN training_records tr ON t.training_id = tr.training_id
        WHERE t.training_id = %s
        GROUP BY t.training_id, t.time_of_day, t.type, t.focus, t.activities, t.intensity, t.duration
    """, (training_id,))
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
    
    # Generate next training_id using sequence
    training_id = get_next_training_id()
    
    # Handle activities which is a JSON field
    activities = data.get('activities')
    if activities:
        activities = json.dumps(activities)

    sql = """INSERT INTO training (training_id, time_of_day, type, focus, activities, intensity, duration)
             VALUES (%s, %s, %s, %s, %s, %s, %s)"""
    try:
        cursor.execute(sql, (
            training_id, data['time_of_day'], data['type'], data['focus'],
            activities, data['intensity'], data['duration']
        ))
        db.commit()
        return jsonify({"message": "Training session type added successfully", "training_id": training_id}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

# UPDATE a training session type
@training_bp.route('/<string:training_id>', methods=['PUT'])
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
