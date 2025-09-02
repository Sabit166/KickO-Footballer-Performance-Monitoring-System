from flask import Blueprint, request, jsonify
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from db import get_db

player_bp = Blueprint('player', __name__)


# CREATE a new player
@player_bp.route('/players', methods=['POST'])
def add_player():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = "INSERT INTO PLAYER (PLAYER_ID, PLAYER_NAME, HEIGHT, CONTRACT, WEIGHT) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(sql, (data['PLAYER_ID'], data['PLAYER_NAME'], data['HEIGHT'], data['CONTRACT'], data['WEIGHT']))
    db.commit()
    return jsonify({"message": "Player added successfully", "PLAYER_ID": cursor.lastrowid})


# READ all players
@player_bp.route('/players', methods=['GET'])
def get_players():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM PLAYER")
    result = cursor.fetchall()
    return jsonify(result)

# READ PARTICULAR PLAYER 
@player_bp.route('/players/search/<player_name>', methods=['GET'])
def search_player_by_name(player_name):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM PLAYER WHERE PLAYER_NAME = %s", (player_name,))
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
