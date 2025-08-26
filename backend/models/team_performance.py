from flask import Blueprint, request, jsonify
from db import get_db

team_performance_bp = Blueprint('team_performance', __name__)



@team_performance_bp.route('/team_performance', methods=['GET'])
def get_stats():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            T.TEAM_ID,
            T.TEAM_NAME,
            SUM(PS.GOALS) AS TOTAL_GOALS,
            SUM(PS.ASSISTS) AS TOTAL_ASSISTS,
            SUM(PS.FOULS) AS TOTAL_FOULS,
            SUM(PS.YELLOW_CARDS) AS TOTAL_YELLOW_CARDS,
            SUM(PS.RED_CARDS) AS TOTAL_RED_CARDS,
            SUM(PS.MINUTES_PLAYED) AS TOTAL_MINUTES_PLAYED
        FROM TEAM T
            JOIN PLAYER_TEAM PT ON T.TEAM_ID = PT.TEAM_ID
            JOIN PLAYER P ON PT.PLAYER_ID = P.PLAYER_ID
            JOIN PLAYER_PERFORMANCE PP ON P.PLAYER_ID = PP.PLAYER_ID
            JOIN PLAYER_STATS PS ON PP.STATS_ID = PS.STATS_ID
        GROUP BY T.TEAM_ID, T.TEAM_NAME
        ORDER BY T.TEAM_ID ASC;
    """)
    return jsonify(cursor.fetchall())

