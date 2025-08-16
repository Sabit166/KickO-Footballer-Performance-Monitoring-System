from flask import Blueprint, request, jsonify
from db import get_db

coach_bp = Blueprint('coach', __name__)


# CREATE a new coach
@coach_bp.route('/coaches', methods=['POST'])
def add_coach():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = "INSERT INTO COACH (COACH_NAME, TEAM_ID) VALUES (%s, %s)"
    cursor.execute(sql, (data['COACH_NAME'], data['TEAM_ID']))
    db.commit()
    return jsonify({"message": "Coach added successfully", "COACH_ID": cursor.lastrowid})


@coach_bp.route('/coaches', methods=['GET'])
def get_coaches():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM COACH")
    return jsonify(cursor.fetchall())

@coach_bp.route('/coaches/<int:coach_id>', methods=['PUT'])
def update_coach(coach_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = "UPDATE COACH SET COACH_NAME=%s, TEAM_ID=%s WHERE COACH_ID=%s"
    cursor.execute(sql, (data['COACH_NAME'], data['TEAM_ID'], coach_id))
    db.commit()
    return jsonify({"message": "Coach updated"})

@coach_bp.route('/coaches/<int:coach_id>', methods=['DELETE'])
def delete_coach(coach_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM COACH WHERE COACH_ID=%s", (coach_id,))
    db.commit()
    return jsonify({"message": "Coach deleted"})
