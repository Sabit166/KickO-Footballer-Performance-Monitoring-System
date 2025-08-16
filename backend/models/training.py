from flask import Blueprint, request, jsonify
from db import get_db

training_bp = Blueprint('training', __name__)

# CREATE a new training record
@training_bp.route('/trainings', methods=['POST'])
def add_training():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """INSERT INTO TRAINING (SESSION, DURATION, DISTANCE_COVERED, SPRINT_COUNT, SHOTS_ON_TARGET, PASSING_ACCURACY)
             VALUES (%s, %s, %s, %s, %s, %s)"""
    cursor.execute(sql, (data['SESSION'], data['DURATION'], data['DISTANCE_COVERED'], data['SPRINT_COUNT'], data['SHOTS_ON_TARGET'], data['PASSING_ACCURACY']))
    db.commit()
    return jsonify({"message": "Training added successfully", "TRAINING_ID": cursor.lastrowid})


@training_bp.route('/trainings', methods=['GET'])
def get_trainings():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM TRAINING")
    return jsonify(cursor.fetchall())

@training_bp.route('/trainings/<int:training_id>', methods=['PUT'])
def update_training(training_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE TRAINING 
             SET SESSION=%s, DURATION=%s, DISTANCE_COVERED=%s, SPRINT_COUNT=%s, 
             SHOTS_ON_TARGET=%s, PASSING_ACCURACY=%s
             WHERE TRAINING_ID=%s"""
    cursor.execute(sql, (data['SESSION'], data['DURATION'], 
                         data['DISTANCE_COVERED'], data['SPRINT_COUNT'], data['SHOTS_ON_TARGET'], data['PASSING_ACCURACY'], training_id))
    db.commit()
    return jsonify({"message": "Training updated"})

@training_bp.route('/trainings/<int:training_id>', methods=['DELETE'])
def delete_training(training_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM TRAINING WHERE TRAINING_ID=%s", (training_id,))
    db.commit()
    return jsonify({"message": "Training deleted"})
