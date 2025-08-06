from flask import Blueprint, request, jsonify
from db import get_db

injury_bp = Blueprint('injury_records', __name__)

@injury_bp.route('/injury_records', methods=['GET'])
def get_injuries():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM INJURY_RECORDS")
    return jsonify(cursor.fetchall())

@injury_bp.route('/injury_records/<int:player_id>', methods=['PUT'])
def update_injury(player_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE INJURY_RECORDS
             SET INJURY_CASE=%s, STAFF_ID=%s
             WHERE PLAYER_ID=%s"""
    cursor.execute(sql, (data['INJURY_CASE'], data['STAFF_ID'], player_id))
    db.commit()
    return jsonify({"message": "Injury updated"})

@injury_bp.route('/injury_records/<int:player_id>', methods=['DELETE'])
def delete_injury(player_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM INJURY_RECORDS WHERE PLAYER_ID=%s", (player_id,))
    db.commit()
    return jsonify({"message": "Injury deleted"})
