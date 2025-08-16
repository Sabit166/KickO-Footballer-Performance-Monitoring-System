from flask import Blueprint, request, jsonify
from db import get_db

player_performance_bp = Blueprint('player_performance', __name__)

# POST endpoint to insert a new player performance record
@player_performance_bp.route('/player_performance', methods=['POST'])
def add_player_performance():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    # Adjust attributes as per your PLAYER_PERFORMANCE table
    sql = """
        INSERT INTO PLAYER_PERFORMANCE (PLAYER_ID, STATS_ID)
        VALUES (%s, %s)
    """
    cursor.execute(sql, (data['PLAYER_ID'], data['STATS_ID']))
    db.commit()
    return jsonify({"message": "Player performance added"}), 201

@player_performance_bp.route('/player_performance', methods=['GET'])
def get_stats():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM PLAYER_PERFORMANCE")
    return jsonify(cursor.fetchall())

@player_performance_bp.route('/player_performance/<int:player_id>', methods=['PUT'])
def update_stats(player_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE PLAYER_PERFORMANCE 
             SET STATS_ID=%s 
             WHERE PLAYER_ID=%s"""
    cursor.execute(sql, (data['STATS_ID'], player_id))
    db.commit()
    return jsonify({"message": "Player stats updated"})

@player_performance_bp.route('/player_performance/<int:player_id>', methods=['DELETE'])
def delete_stats(player_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM PLAYER_PERFORMANCE WHERE PLAYER_ID=%s", (player_id,))
    db.commit()
    return jsonify({"message": "Player performance deleted"})
