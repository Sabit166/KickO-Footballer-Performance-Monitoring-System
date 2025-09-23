from flask import Blueprint, request, jsonify
from db import get_db

"""Player Self Performance Blueprint

Adds player-centric endpoints:
  1) /player/self/matches?email=...       -> list matches for the player's team(s)
  2) /player/self/performance/<match_id>?email=... -> that player's stats for the chosen match
     (Aggregated with GROUP BY – no window functions.)

Keeps logic simple and parameterized (no hardcoded emails).
"""

player_self_performance_bp = Blueprint('player_self_performance', __name__)


def _get_player(email, cursor):
    """Fetch basic player + team info. Returns dict or None."""
    cursor.execute(
        """
        SELECT p.PLAYER_ID, p.PLAYER_NAME, p.EMAIL, pt.TEAM_ID, t.TEAM_NAME
        FROM player p
        LEFT JOIN player_team pt ON p.PLAYER_ID = pt.PLAYER_ID
        LEFT JOIN team t ON pt.TEAM_ID = t.TEAM_ID
        WHERE p.EMAIL = %s
        ORDER BY pt.TEAM_ID DESC
        LIMIT 1
        """,
        (email,)
    )
    return cursor.fetchone()


@player_self_performance_bp.route('/player/self/matches', methods=['GET'])
def get_player_team_matches():
    """List matches involving the player's current team.

    Query param: email
    Response: { player: {...}, matches: [ {MATCH_ID, TEAM_ONE, TEAM_TWO, STADIUM} ... ] }
    """
    email = request.args.get('email')
    if not email:
        return jsonify({'error': 'email query parameter is required'}), 400
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        player_row = _get_player(email, cursor)
        if not player_row:
            return jsonify({'error': 'Player not found'}), 404

        # Fetch matches via team_match
        if player_row.get('TEAM_ID'):
            cursor.execute(
                """
                SELECT m.MATCH_ID, m.TEAM_ONE, m.TEAM_TWO, m.STADIUM
                FROM team_match tm
                JOIN `match` m ON tm.MATCH_ID = m.MATCH_ID
                WHERE tm.TEAM_ID = %s
                ORDER BY m.MATCH_ID DESC
                """,
                (player_row['TEAM_ID'],)
            )
            matches = cursor.fetchall()
        else:
            matches = []
        return jsonify({
            'player': player_row,
            'matches': matches
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@player_self_performance_bp.route('/player/self/performance/<int:match_id>', methods=['GET'])
def get_player_match_performance(match_id):
    """Return the player's aggregated stats for a specific match.

    Query param: email
    Aggregates duplicate stat rows using SUM + GROUP BY (no ranking/window functions).
    If the player has no stats for that match but the match involves their team, returns zeros.
    """
    email = request.args.get('email')
    if not email:
        return jsonify({'error': 'email query parameter is required'}), 400
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        player_row = _get_player(email, cursor)
        if not player_row:
            return jsonify({'error': 'Player not found'}), 404

        # Aggregated stats for this match
        cursor.execute(
            """
            SELECT 
                m.MATCH_ID,
                p.PLAYER_ID,
                p.PLAYER_NAME,
                t.TEAM_NAME AS PLAYER_TEAM,
                SUM(s.GOALS)        AS GOALS,
                SUM(s.ASSISTS)      AS ASSISTS,
                SUM(s.FOULS)        AS FOULS,
                SUM(s.YELLOW_CARDS) AS YELLOW_CARDS,
                SUM(s.RED_CARDS)    AS RED_CARDS,
                SUM(s.MINUTES_PLAYED) AS MINUTES_PLAYED,
                COUNT(DISTINCT s.STATS_ID) AS RAW_ROWS
            FROM player p
            JOIN player_stats ps   ON p.PLAYER_ID = ps.PLAYER_ID
            JOIN stats s           ON ps.STATS_ID = s.STATS_ID
            JOIN stat_match sm     ON s.STATS_ID = sm.STATS_ID AND sm.MATCH_ID = %s
            JOIN `match` m         ON sm.MATCH_ID = m.MATCH_ID
            LEFT JOIN player_team pt ON p.PLAYER_ID = pt.PLAYER_ID
            LEFT JOIN team t          ON pt.TEAM_ID = t.TEAM_ID
            WHERE p.EMAIL = %s
            GROUP BY m.MATCH_ID, p.PLAYER_ID, p.PLAYER_NAME, t.TEAM_NAME
            """,
            (match_id, email)
        )
        agg = cursor.fetchone()

        if not agg:
            # Determine if match exists and involves player's team; if yes, return zeros
            cursor.execute("SELECT MATCH_ID, TEAM_ONE, TEAM_TWO, STADIUM FROM `match` WHERE MATCH_ID = %s", (match_id,))
            match_row = cursor.fetchone()
            if not match_row:
                return jsonify({'error': 'Match not found'}), 404
            # Check involvement
            involved = False
            if player_row.get('TEAM_ID'):
                cursor.execute("SELECT 1 FROM team_match WHERE MATCH_ID=%s AND TEAM_ID=%s", (match_id, player_row['TEAM_ID']))
                involved = cursor.fetchone() is not None
            if not involved:
                return jsonify({'error': 'Player/team not involved in this match'}), 403
            # Zero stats response
            performance = {
                'MATCH_ID': match_id,
                'PLAYER_ID': player_row['PLAYER_ID'],
                'PLAYER_NAME': player_row['PLAYER_NAME'],
                'PLAYER_TEAM': player_row.get('TEAM_NAME'),
                'GOALS': 0, 'ASSISTS': 0, 'FOULS': 0, 'YELLOW_CARDS': 0, 'RED_CARDS': 0, 'MINUTES_PLAYED': 0, 'RAW_ROWS': 0
            }
        else:
            performance = {
                'MATCH_ID': agg['MATCH_ID'],
                'PLAYER_ID': agg['PLAYER_ID'],
                'PLAYER_NAME': agg['PLAYER_NAME'],
                'PLAYER_TEAM': agg['PLAYER_TEAM'],
                'GOALS': int(agg['GOALS'] or 0),
                'ASSISTS': int(agg['ASSISTS'] or 0),
                'FOULS': int(agg['FOULS'] or 0),
                'YELLOW_CARDS': int(agg['YELLOW_CARDS'] or 0),
                'RED_CARDS': int(agg['RED_CARDS'] or 0),
                'MINUTES_PLAYED': int(agg['MINUTES_PLAYED'] or 0),
                'RAW_ROWS': int(agg['RAW_ROWS'] or 0)
            }

        return jsonify({
            'player': player_row,
            'match_id': match_id,
            'performance': performance
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# (Optional / Deprecated) Previous aggregate-all endpoint kept for backward compatibility.
@player_self_performance_bp.route('/player/self/performance', methods=['GET'])
def deprecated_list_all():
    """Return aggregated stats for all matches (GROUP BY version). Deprecated in favor of
    /player/self/matches (list) + /player/self/performance/<match_id> (detail)."""
    email = request.args.get('email')
    if not email:
        return jsonify({'error': 'email query parameter is required'}), 400
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        player_row = _get_player(email, cursor)
        if not player_row:
            return jsonify({'error': 'Player not found'}), 404
        cursor.execute(
            """
            SELECT 
                m.MATCH_ID,
                m.TEAM_ONE,
                m.TEAM_TWO,
                t.TEAM_NAME AS PLAYER_TEAM,
                SUM(s.GOALS)        AS GOALS,
                SUM(s.ASSISTS)      AS ASSISTS,
                SUM(s.FOULS)        AS FOULS,
                SUM(s.YELLOW_CARDS) AS YELLOW_CARDS,
                SUM(s.RED_CARDS)    AS RED_CARDS,
                SUM(s.MINUTES_PLAYED) AS MINUTES_PLAYED
            FROM player p
            JOIN player_stats ps   ON p.PLAYER_ID = ps.PLAYER_ID
            JOIN stats s           ON ps.STATS_ID = s.STATS_ID
            JOIN stat_match sm     ON s.STATS_ID = sm.STATS_ID
            JOIN `match` m         ON sm.MATCH_ID = m.MATCH_ID
            LEFT JOIN player_team pt ON p.PLAYER_ID = pt.PLAYER_ID
            LEFT JOIN team t          ON pt.TEAM_ID = t.TEAM_ID
            WHERE p.EMAIL = %s
            GROUP BY m.MATCH_ID, m.TEAM_ONE, m.TEAM_TWO, t.TEAM_NAME
            ORDER BY m.MATCH_ID DESC
            """,
            (email,)
        )
        rows = cursor.fetchall()
        for r in rows:
            for key in ['GOALS','ASSISTS','FOULS','YELLOW_CARDS','RED_CARDS','MINUTES_PLAYED']:
                r[key] = int(r[key] or 0)
        return jsonify({'player': player_row, 'performance': rows}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
