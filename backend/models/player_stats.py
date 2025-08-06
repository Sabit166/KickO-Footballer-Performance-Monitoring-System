from flask import Blueprint, request, jsonify
from db import get_db

player_stats_bp = Blueprint('player_stats', __name__)

@player_stats_bp.route('/player_stats', methods=['GET'])
def get_stats():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM PLAYER_STATS")
    return jsonify(cursor.fetchall())

@player_stats_bp.route('/player_stats/<int:stats_id>', methods=['PUT'])
def update_stats(stats_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE PLAYER_STATS 
             SET GOALS=%s, ASSISTS=%s, MINUTES_PLAYED=%s, FOULS=%s 
             WHERE STATS_ID=%s"""
    cursor.execute(sql, (data['GOALS'], data['ASSISTS'], 
                         data['MINUTES_PLAYED'], data['FOULS'], stats_id))
    db.commit()
    return jsonify({"message": "Player stats updated"})

@player_stats_bp.route('/player_stats/<int:stats_id>', methods=['DELETE'])
def delete_stats(stats_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM PLAYER_STATS WHERE STATS_ID=%s", (stats_id,))
    db.commit()
    return jsonify({"message": "Player stats deleted"})
