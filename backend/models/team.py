from flask import Blueprint, request, jsonify
from db import get_db

team_bp = Blueprint('team', __name__)

# READ all teams
@team_bp.route('/teams', methods=['GET'])
def get_teams():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM TEAM")
    result = cursor.fetchall()
    return jsonify(result)

# UPDATE a team
@team_bp.route('/teams/<int:team_id>', methods=['PUT'])
def update_team(team_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = "UPDATE TEAM SET TEAM_NAME=%s WHERE TEAM_ID=%s"
    cursor.execute(sql, (data['TEAM_NAME'], team_id))
    db.commit()
    return jsonify({"message": "Team updated successfully"})

# DELETE a team
@team_bp.route('/teams/<int:team_id>', methods=['DELETE'])
def delete_team(team_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM TEAM WHERE TEAM_ID=%s", (team_id,))
    db.commit()
    return jsonify({"message": "Team deleted successfully"})
