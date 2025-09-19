import uuid
from flask import Blueprint, request, jsonify
from db import get_db

# Use a unique blueprint name to avoid collision with existing player_stats blueprint
addmatchwiz_bp = Blueprint('addmatchwiz', __name__)

def generate_id(prefix=''):
    # Generate a 10-character hexadecimal part and prepend a prefix
    return prefix + uuid.uuid4().hex[:10]


@addmatchwiz_bp.route('/teams/<team_id>/players', methods=['GET'])
def get_team_players(team_id):
    """
    Returns players for a given team_id. Optionally include stats for a specific match
    if the query param `match_id` is provided. Response is an array of objects with:
      - PLAYER_ID, PLAYER_NAME
      - STATS_ID (nullable), GOALS, ASSISTS, FOULS, YELLOW_CARDS, RED_CARDS, MINUTES_PLAYED
    """
    match_id = request.args.get('match_id')
    db = get_db()
    cursor = db.cursor()
    # Allow caller to pass either TEAM_ID or TEAM_NAME; resolve name -> id if needed
    try:
        cursor.execute("SELECT TEAM_ID FROM team WHERE TEAM_ID = %s", (team_id,))
        exists_id = cursor.fetchone()
        if not exists_id:
            cursor.execute("SELECT TEAM_ID FROM team WHERE TEAM_NAME = %s", (team_id,))
            row_id = cursor.fetchone()
            if row_id:
                team_id = row_id[0]
    except Exception:
        pass  # fallback to original team_id if resolution fails
    try:
        if match_id:
            # Restrict stats to only those tied to this match to avoid duplicates (one row per player)
            sql = """
                SELECT p.PLAYER_ID, p.PLAYER_NAME,
                       s.STATS_ID, s.GOALS, s.ASSISTS, s.FOULS, s.YELLOW_CARDS, s.RED_CARDS, s.MINUTES_PLAYED
                FROM player_team pt
                JOIN player p ON pt.PLAYER_ID = p.PLAYER_ID
                LEFT JOIN (
                    SELECT ps.PLAYER_ID, st.*
                    FROM stat_match sm
                    JOIN stats st ON st.STATS_ID = sm.STATS_ID
                    JOIN player_stats ps ON ps.STATS_ID = sm.STATS_ID
                    WHERE sm.MATCH_ID = %s
                ) s ON s.PLAYER_ID = p.PLAYER_ID
                WHERE pt.TEAM_ID = %s
                GROUP BY p.PLAYER_ID, p.PLAYER_NAME, s.STATS_ID, s.GOALS, s.ASSISTS, s.FOULS, s.YELLOW_CARDS, s.RED_CARDS, s.MINUTES_PLAYED
            """
            cursor.execute(sql, (match_id, team_id))
        else:
            sql = """
                SELECT p.PLAYER_ID, p.PLAYER_NAME,
                       NULL AS STATS_ID, 0 AS GOALS, 0 AS ASSISTS, 0 AS FOULS, 0 AS YELLOW_CARDS, 0 AS RED_CARDS, 0 AS MINUTES_PLAYED
                FROM player_team pt
                JOIN player p ON pt.PLAYER_ID = p.PLAYER_ID
                WHERE pt.TEAM_ID = %s
            """
            cursor.execute(sql, (team_id,))

        rows = cursor.fetchall()
        players = []
        for row in rows:
            # row is expected as a tuple: map by position
            players.append({
                'PLAYER_ID': row[0],
                'PLAYER_NAME': row[1],
                'STATS_ID': row[2],
                'GOALS': int(row[3]) if row[3] is not None else 0,
                'ASSISTS': int(row[4]) if row[4] is not None else 0,
                'FOULS': int(row[5]) if row[5] is not None else 0,
                'YELLOW_CARDS': int(row[6]) if row[6] is not None else 0,
                'RED_CARDS': int(row[7]) if row[7] is not None else 0,
                'MINUTES_PLAYED': int(row[8]) if row[8] is not None else 0,
            })

        return jsonify(players), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@addmatchwiz_bp.route('/matches/<match_id>/players-stats', methods=['GET'])
def get_players_stats_for_match(match_id):
    """Return all players (both teams) participating in a match with any stats recorded for that match.
    If a player has no stats yet, stats fields are zero and STATS_ID null."""
    db = get_db()
    cursor = db.cursor()
    try:
        sql = """
            SELECT DISTINCT
                   p.PLAYER_ID,
                   p.PLAYER_NAME,
                   s.STATS_ID,
                   COALESCE(s.GOALS,0) AS GOALS,
                   COALESCE(s.ASSISTS,0) AS ASSISTS,
                   COALESCE(s.FOULS,0) AS FOULS,
                   COALESCE(s.YELLOW_CARDS,0) AS YELLOW_CARDS,
                   COALESCE(s.RED_CARDS,0) AS RED_CARDS,
                   COALESCE(s.MINUTES_PLAYED,0) AS MINUTES_PLAYED
            FROM team_match tm
            JOIN player_team pt ON tm.TEAM_ID = pt.TEAM_ID
            JOIN player p ON pt.PLAYER_ID = p.PLAYER_ID
            LEFT JOIN player_stats ps ON ps.PLAYER_ID = p.PLAYER_ID
            LEFT JOIN stat_match sm ON sm.STATS_ID = ps.STATS_ID AND sm.MATCH_ID = %s
            LEFT JOIN stats s ON s.STATS_ID = sm.STATS_ID
            WHERE tm.MATCH_ID = %s
            ORDER BY p.PLAYER_NAME
        """
        cursor.execute(sql, (match_id, match_id))
        rows = cursor.fetchall()
        result = []
        for r in rows:
            result.append({
                'PLAYER_ID': r[0],
                'PLAYER_NAME': r[1],
                'STATS_ID': r[2],
                'GOALS': int(r[3]) if r[3] is not None else 0,
                'ASSISTS': int(r[4]) if r[4] is not None else 0,
                'FOULS': int(r[5]) if r[5] is not None else 0,
                'YELLOW_CARDS': int(r[6]) if r[6] is not None else 0,
                'RED_CARDS': int(r[7]) if r[7] is not None else 0,
                'MINUTES_PLAYED': int(r[8]) if r[8] is not None else 0,
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@addmatchwiz_bp.route('/player_performance/<match_id>', methods=['POST'])
def insert_player_performance(match_id):
    """
    Expects a JSON payload as an array of objects, each containing:
      - PLAYER_NAME (string)
      - TEAM_NAME (string)
      - GOALS (int)
      - ASSISTS (int)
      - FOULS (int)
      - YELLOW_CARDS (int)
      - RED_CARDS (int)
      - Optionally, MINUTES_PLAYED (int) [default is 0 if not provided]
      
    This endpoint:
      1. Inserts a new record into the stats table.
      2. Checks if the player exists in the player table (by PLAYER_NAME); if not, inserts a new player.
      3. Inserts a link between the player and the stats record in player_stats.
      4. Inserts a link between the stats record and the match in stat_match.
    """
    # Get the payload data
    data = request.get_json()
    if not isinstance(data, list):
        return jsonify({"error": "Payload must be an array of player performance objects"}), 400

    db = get_db()
    cursor = db.cursor()

    try:
        for record in data:
            player_name = record.get('PLAYER_NAME', '').strip()
            if not player_name:
                continue  # skip empty rows

            goals = int(record.get('GOALS', 0))
            assists = int(record.get('ASSISTS', 0))
            fouls = int(record.get('FOULS', 0))
            yellow_cards = int(record.get('YELLOW_CARDS', 0))
            red_cards = int(record.get('RED_CARDS', 0))
            minutes_played = int(record.get('MINUTES_PLAYED', 0))

            provided_stats_id = record.get('STATS_ID')

            # 1. Resolve (or create) player
            cursor.execute("SELECT PLAYER_ID FROM player WHERE PLAYER_NAME = %s", (player_name,))
            row = cursor.fetchone()
            if row:
                player_id = row[0] if isinstance(row, tuple) else row['PLAYER_ID']
            else:
                player_id = generate_id('pl_')
                cursor.execute("INSERT INTO player (PLAYER_ID, PLAYER_NAME) VALUES (%s, %s)", (player_id, player_name))

            # 2. If STATS_ID provided (trigger already created placeholder) -> UPDATE stats
            if provided_stats_id:
                # Update existing stats row (ignore if not found)
                update_sql = """
                    UPDATE stats
                    SET GOALS=%s, ASSISTS=%s, FOULS=%s, YELLOW_CARDS=%s, RED_CARDS=%s, MINUTES_PLAYED=%s
                    WHERE STATS_ID = %s
                """
                cursor.execute(update_sql, (goals, assists, fouls, yellow_cards, red_cards, minutes_played, provided_stats_id))
                stats_id = provided_stats_id
            else:
                # Need a new stats row (new player manually added in UI)
                # Prefer numeric sequence used by trigger for consistency
                try:
                    cursor.execute("INSERT INTO stats_id_seq VALUES (NULL)")
                    cursor.execute("SELECT LAST_INSERT_ID()")
                    stats_id_row = cursor.fetchone()
                    stats_id = str(stats_id_row[0] if isinstance(stats_id_row, tuple) else stats_id_row['LAST_INSERT_ID()'])
                except Exception:
                    stats_id = generate_id('st_')  # fallback
                cursor.execute(
                    """INSERT INTO stats (STATS_ID, GOALS, ASSISTS, FOULS, YELLOW_CARDS, RED_CARDS, MINUTES_PLAYED)
                        VALUES (%s,%s,%s,%s,%s,%s,%s)""",
                    (stats_id, goals, assists, fouls, yellow_cards, red_cards, minutes_played)
                )

            # 3. Ensure linkage player_stats
            cursor.execute(
                "SELECT 1 FROM player_stats WHERE PLAYER_ID=%s AND STATS_ID=%s",
                (player_id, stats_id)
            )
            if not cursor.fetchone():
                cursor.execute(
                    "INSERT INTO player_stats (STATS_ID, PLAYER_ID) VALUES (%s,%s)",
                    (stats_id, player_id)
                )

            # 4. Ensure linkage stat_match
            cursor.execute(
                "SELECT 1 FROM stat_match WHERE STATS_ID=%s AND MATCH_ID=%s",
                (stats_id, match_id)
            )
            if not cursor.fetchone():
                cursor.execute(
                    "INSERT INTO stat_match (STATS_ID, MATCH_ID) VALUES (%s,%s)",
                    (stats_id, match_id)
                )

        db.commit()
        return jsonify({"message": "Player performance records upserted successfully"}), 201

    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500