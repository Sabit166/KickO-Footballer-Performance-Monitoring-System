from flask import Blueprint, request, jsonify
from db import get_db

match_bp = Blueprint('match', __name__)

# Existing endpoints ...
@match_bp.route('/matches', methods=['POST'])
def add_match():
    """Create a match.
    If client supplies MATCH_ID and it's not used, insert with that id (helpful for user-entered IDs).
    Otherwise let AUTO_INCREMENT assign it. Returns the effective MATCH_ID or an error JSON.
    """
    data = request.json or {}
    required = ['TEAM_ONE', 'TEAM_TWO', 'STADIUM']
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    db = get_db()
    cursor = db.cursor()
    supplied_id = data.get('MATCH_ID')
    try:
        if supplied_id:
            # Attempt explicit id insert
            sql = "INSERT INTO `match` (MATCH_ID, TEAM_ONE, TEAM_TWO, WINNING_TEAM, STADIUM) VALUES (%s,%s,%s,%s,%s)"
            cursor.execute(sql, (supplied_id, data['TEAM_ONE'], data['TEAM_TWO'], data.get('WINNING_TEAM'), data['STADIUM']))
            match_id = supplied_id
        else:
            sql = "INSERT INTO `match` (TEAM_ONE, TEAM_TWO, WINNING_TEAM, STADIUM) VALUES (%s,%s,%s,%s)"
            cursor.execute(sql, (data['TEAM_ONE'], data['TEAM_TWO'], data.get('WINNING_TEAM'), data['STADIUM']))
            match_id = cursor.lastrowid
        db.commit()
        return jsonify({"message": "Match added successfully", "MATCH_ID": match_id}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

@match_bp.route('/matches', methods=['GET'])
def get_matches():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM `MATCH`")
    return jsonify(cursor.fetchall())

@match_bp.route('/matches/<int:match_id>', methods=['PUT'])
def update_match(match_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE `MATCH`
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
    cursor.execute("DELETE FROM `MATCH` WHERE MATCH_ID=%s", (match_id,))
    db.commit()
    return jsonify({"message": "Match deleted"})

# New endpoint to get team scorecard (pr.sql query)
@match_bp.route('/matches/<int:match_id>/scorecard', methods=['GET'])
def get_scorecard(match_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    query = """
    SELECT t.TEAM_NAME, SUM(s.GOALS) AS TOTAL_GOALS
    FROM stat_match ms
    JOIN stats s ON ms.STATS_ID = s.STATS_ID
    JOIN player_stats ps ON ms.STATS_ID = ps.STATS_ID
    JOIN player p ON ps.PLAYER_ID = p.PLAYER_ID
    JOIN player_team pt ON p.PLAYER_ID = pt.PLAYER_ID
    JOIN team t ON pt.TEAM_ID = t.TEAM_ID
    WHERE ms.MATCH_ID = %s
    GROUP BY t.TEAM_NAME
    """
    cursor.execute(query, (match_id,))
    scorecard = cursor.fetchall()
    return jsonify(scorecard)

# New endpoint to get scorers (scored.sql query)
@match_bp.route('/matches/<int:match_id>/scorers', methods=['GET'])
def get_scorers(match_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    query = """
    SELECT p.PLAYER_NAME, s.GOALS
    FROM stat_match sm
    JOIN stats s ON sm.STATS_ID = s.STATS_ID
    JOIN player_stats ps ON s.STATS_ID = ps.STATS_ID
    JOIN player p ON ps.PLAYER_ID = p.PLAYER_ID
    WHERE sm.MATCH_ID = %s
      AND s.GOALS > 0
    """
    cursor.execute(query, (match_id,))
    scorers = cursor.fetchall()
    return jsonify(scorers)