from flask import Blueprint, request, jsonify
from db import get_db

coach_bp = Blueprint('coach', __name__)

@coach_bp.route('/coaches', methods=['GET'])
def get_coaches():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM ADMINISTERED")
    return jsonify(cursor.fetchall())

@coach_bp.route('/administered/<int:coach_id>', methods=['PUT'])
def update_coach(coach_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = "UPDATE ADMINISTERED SET TEAM_ID=%s WHERE COACH_ID=%s"
    cursor.execute(sql, (data['TEAM_ID'], coach_id))
    db.commit()
    return jsonify({"message": "Coach updated"})

@coach_bp.route('/administered/<int:coach_id>', methods=['DELETE'])
def delete_coach(coach_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM ADMINISTERED WHERE COACH_ID=%s", (coach_id,))
    db.commit()
    return jsonify({"message": "Coach deleted"})
