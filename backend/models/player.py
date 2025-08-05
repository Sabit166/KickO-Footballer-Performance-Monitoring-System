from flask import Blueprint, request, jsonify
from db import get_db

player_bp = Blueprint('player', __name__)

# READ all players
@player_bp.route('/players', methods=['GET'])
def get_players():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM PLAYER")
    result = cursor.fetchall()
    return jsonify(result)

# UPDATE a player
@player_bp.route('/players/<int:player_id>', methods=['PUT'])
def update_player(player_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE PLAYER 
             SET PLAYER_NAME=%s, HEIGHT=%s, CONTRACT=%s, WEIGHT=%s 
             WHERE PLAYER_ID=%s"""
    cursor.execute(sql, (data['PLAYER_NAME'], data['HEIGHT'], 
                         data['CONTRACT'], data['WEIGHT'], player_id))
    db.commit()
    return jsonify({"message": "Player updated successfully"})

# DELETE a player
@player_bp.route('/players/<int:player_id>', methods=['DELETE'])
def delete_player(player_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM PLAYER WHERE PLAYER_ID=%s", (player_id,))
    db.commit()
    return jsonify({"message": "Player deleted successfully"})
