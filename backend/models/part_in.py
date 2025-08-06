from flask import Blueprint, request, jsonify
from db import get_db

match_bp = Blueprint('match', __name__)

@match_bp.route('/part_in', methods=['GET'])
def get_part_in():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM PART_IN")
    return jsonify(cursor.fetchall())

@match_bp.route('/part_in/<int:match_id>', methods=['PUT'])
def update_part_in(match_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE PART_IN 
             SET TEAM_ID=%s
             WHERE PART_IN_ID=%s"""
    cursor.execute(sql, (data['TEAM_ID'], match_id))
    db.commit()
    return jsonify({"message": "Part in updated"})

@match_bp.route('/part_in/<int:match_id>', methods=['DELETE'])
def delete_part_in(match_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM PART_IN WHERE PART_IN_ID=%s", (match_id,))
    db.commit()
    return jsonify({"message": "Part in deleted"})
