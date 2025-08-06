from flask import Blueprint, request, jsonify
from db import get_db

player_stats_bp = Blueprint('belongs_to', __name__)

@player_stats_bp.route('/belongs_to', methods=['GET'])
def get_stats():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM BELONGS_TO")
    return jsonify(cursor.fetchall())

@player_stats_bp.route('/belongs_to/<int:stats_id>', methods=['PUT'])
def update_stats(stats_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE BELONGS_TO 
             SET MATCH_ID=%s 
             WHERE STATS_ID=%s"""
    cursor.execute(sql, (data['MATCH_ID'], stats_id))
    db.commit()
    return jsonify({"message": "Player stats updated"})

@player_stats_bp.route('/belongs_to/<int:stats_id>', methods=['DELETE'])
def delete_stats(stats_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM BELONGS_TO WHERE STATS_ID=%s", (stats_id,))
    db.commit()
    return jsonify({"message": "Player stats deleted"})
