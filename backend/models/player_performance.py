from flask import Blueprint, request, jsonify
from db import get_db

player_performance_bp = Blueprint('player_performance', __name__)

# Create or replace the view for player stats per match
def create_player_match_performance_view():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        CREATE OR REPLACE VIEW player_match_performance_view AS
        SELECT 
            sm.MATCH_ID,
            p.PLAYER_ID,
            p.PLAYER_NAME,
            s.GOALS,
            s.ASSISTS,
            s.FOULS,
            s.YELLOW_CARDS,
            s.RED_CARDS,
            s.MINUTES_PLAYED
        FROM stat_match sm
        JOIN stats s ON sm.STATS_ID = s.STATS_ID
        JOIN player_stats ps ON s.STATS_ID = ps.STATS_ID
        JOIN player p ON ps.PLAYER_ID = p.PLAYER_ID
    """)
    db.commit()


# GET endpoint to fetch all players' performance for a specific match
@player_performance_bp.route('/player_performance/<match_id>', methods=['GET'])
def get_match_player_performance(match_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Ensure the view exists
    create_player_match_performance_view()

    # Directly fetch player stats for the given match_id
    cursor.execute("""
        SELECT PLAYER_ID, PLAYER_NAME, GOALS, ASSISTS, FOULS, YELLOW_CARDS, RED_CARDS, MINUTES_PLAYED
        FROM player_match_performance_view
        WHERE MATCH_ID = %s
    """, (match_id,))
    result = cursor.fetchall()

    if not result:
        return jsonify({"message": f"No player performance found for match {match_id}"}), 404

    return jsonify(result), 200


# Optional: GET all matches and players stats
@player_performance_bp.route('/player_performance', methods=['GET'])
def get_all_match_performance():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    create_player_match_performance_view()

    cursor.execute("SELECT * FROM player_match_performance_view")
    result = cursor.fetchall()

    return jsonify(result), 200
