from flask import Blueprint, request, jsonify
from db import get_db

match_bp = Blueprint('match', __name__)

@match_bp.route('/matches', methods=['GET'])
def get_matches():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM MATCH")
    return jsonify(cursor.fetchall())

@match_bp.route('/matches/<int:match_id>', methods=['PUT'])
def update_match(match_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE MATCH 
             SET TEAM_ONE=%s, TEAM_TWO=%s, WINNING_TEAM=%s, STADIUM=%s 
             WHERE MATCH_ID=%s"""
    cursor.execute(sql, (data['TEAM_ONE'], data['TEAM_TWO'], 
                         data['WINNING_TEAM'], data['STADIUM'], match_id))
    db.commit()
    return jsonify({"message": "Match updated"})

@match_bp.route('/matches/<int:match_id>', methods=['DELETE'])
def delete_match(match_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM MATCH WHERE MATCH_ID=%s", (match_id,))
    db.commit()
    return jsonify({"message": "Match deleted"})
