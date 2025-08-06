from flask import Blueprint, request, jsonify
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from db import get_db

player_bp = Blueprint('player', __name__)

# READ all players
@player_bp.route('/plays_for', methods=['GET'])
def get_players():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM PLAYS_FOR")
    result = cursor.fetchall()
    return jsonify(result)

# UPDATE a player
@player_bp.route('/plays_for/<int:player_id>', methods=['PUT'])
def update_player(player_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE PLAYS_FOR
             SET TEAM_ID=%s 
             WHERE PLAYER_ID=%s"""
    cursor.execute(sql, (data['TEAM_ID'], player_id))
    db.commit()
    return jsonify({"message": "Player updated successfully"})

# DELETE a player
@player_bp.route('/plays_for/<int:player_id>', methods=['DELETE'])
def delete_player(player_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM PLAYS_FOR WHERE PLAYER_ID=%s", (player_id,))
    db.commit()
    return jsonify({"message": "Player deleted successfully"})
