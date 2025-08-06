from flask import Blueprint, request, jsonify
from db import get_db

training_bp = Blueprint('training_records', __name__)

@training_bp.route('/training_records', methods=['GET'])
def get_trainings():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM TRAINING_RECORDS")
    return jsonify(cursor.fetchall())

@training_bp.route('/training_records/<int:player_id>', methods=['PUT'])
def update_training(player_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE TRAINING_RECORDS 
             SET TRAINING_ID=%s
             WHERE PLAYER_ID=%s"""
    cursor.execute(sql, (data['TRAINING_ID'], player_id))
    db.commit()
    return jsonify({"message": "Training updated"})

@training_bp.route('/training_records/<int:player_id>', methods=['DELETE'])
def delete_training(player_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM TRAINING_RECORDS WHERE PLAYER_ID=%s", (player_id,))
    db.commit()
    return jsonify({"message": "Training record deleted"})
