from flask import Blueprint, request, jsonify
from db import get_db
import os
from datetime import datetime

training_records_bp = Blueprint('training_records', __name__)

@training_records_bp.route('/training_records', methods=['GET'])
def get_training_records():
    """Get training records with JOINs to get player and training details"""
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    # Allow filtering by player_id
    player_id = request.args.get('player_id')
    
    # Use JOIN to get player name and training details with GROUP BY for aggregation
    base_query = """
        SELECT 
            tr.*,
            p.PLAYER_NAME,
            t.type as training_type,
            t.focus as training_focus,
            t.intensity,
            COUNT(*) OVER (PARTITION BY tr.player_id) as player_total_sessions,
            AVG(tr.distance_covered) OVER (PARTITION BY tr.player_id) as player_avg_distance,
            AVG(tr.passing_accuracy) OVER (PARTITION BY tr.player_id) as player_avg_accuracy
        FROM training_records tr
        JOIN player p ON tr.player_id = p.PLAYER_ID
        JOIN training t ON tr.training_id = t.training_id
    """
    
    if player_id:
        cursor.execute(base_query + " WHERE tr.player_id = %s ORDER BY tr.day DESC, tr.training_id DESC", (player_id,))
    else:
        cursor.execute(base_query + " ORDER BY tr.day DESC, tr.training_id DESC")
        
    records = cursor.fetchall()
    # Convert date and time objects to strings for JSON serialization
    for record in records:
        if 'day' in record and record['day']:
            record['day'] = record['day'].isoformat()
        if 'duration' in record and record['duration']:
            # timedelta to string
            record['duration'] = str(record['duration'])
            
    return jsonify(records)

@training_records_bp.route('/training_records/summary', methods=['GET'])
def get_training_summary():
    """SQL aggregate metrics using GROUP BY and aggregate functions. Optional query params: player_id, days (int)."""
    db = get_db()
    cursor = db.cursor(dictionary=True)
    player_id = request.args.get('player_id')
    days = request.args.get('days')

    where = []
    params = []
    if player_id:
        where.append("tr.player_id = %s")
        params.append(player_id)
    if days:
        try:
            d = int(days)
            if d > 0:
                where.append("tr.day >= DATE_SUB(CURDATE(), INTERVAL %s DAY)")
                params.append(d)
        except Exception:
            pass

    # Use comprehensive SQL aggregates with JOIN and GROUP BY
    sql = """
        SELECT 
            AVG(tr.distance_covered) AS avgDistance,
            MAX(tr.distance_covered) AS maxDistance,
            MIN(tr.distance_covered) AS minDistance,
            SUM(tr.distance_covered) AS totalDistance,
            fn_avg_accuracy(%s) AS avgPassingAccuracy,
            MAX(tr.passing_accuracy) AS maxPassingAccuracy,
            MIN(tr.passing_accuracy) AS minPassingAccuracy,
            AVG(tr.sprint_count) AS avgSprintCount,
            SUM(tr.sprint_count) AS totalSprints,
            AVG(tr.shots_on_target) AS avgShotsOnTarget,
            SUM(tr.shots_on_target) AS totalShots,
            COUNT(*) AS totalSessions,
            COUNT(DISTINCT tr.player_id) AS uniquePlayers,
            COUNT(DISTINCT tr.training_id) AS trainingTypesUsed
        FROM training_records tr
        JOIN player p ON tr.player_id = p.PLAYER_ID
        JOIN training t ON tr.training_id = t.training_id
    """
    
    # Default to 30 days if not provided
    days_param = int(days) if days and str(days).isdigit() else 30
    
    if where:
        sql += " WHERE " + " AND ".join(where)
        cursor.execute(sql, (days_param,) + tuple(params))
    else:
        cursor.execute(sql, (days_param,))
        
    row = cursor.fetchone() or {}
    result = {
        'avgDistance': float(row.get('avgDistance') or 0),
        'maxDistance': float(row.get('maxDistance') or 0),
        'minDistance': float(row.get('minDistance') or 0),
        'totalDistance': float(row.get('totalDistance') or 0),
        'avgPassingAccuracy': float(row.get('avgPassingAccuracy') or 0),
        'maxPassingAccuracy': float(row.get('maxPassingAccuracy') or 0),
        'minPassingAccuracy': float(row.get('minPassingAccuracy') or 0),
        'avgSprintCount': float(row.get('avgSprintCount') or 0),
        'totalSprints': int(row.get('totalSprints') or 0),
        'avgShotsOnTarget': float(row.get('avgShotsOnTarget') or 0),
        'totalShots': int(row.get('totalShots') or 0),
        'totalSessions': int(row.get('totalSessions') or 0),
        'uniquePlayers': int(row.get('uniquePlayers') or 0),
        'trainingTypesUsed': int(row.get('trainingTypesUsed') or 0),
    }
    return jsonify(result)

@training_records_bp.route('/training_records/_since', methods=['GET'])
def get_training_records_since():
    """Return records updated/added since the provided ISO timestamp.
    Query params: since=ISO8601 date (uses day field as ordering proxy)
    Optional: player_id filter.
    """
    db = get_db()
    cursor = db.cursor(dictionary=True)
    since = request.args.get('since')
    player_id = request.args.get('player_id')

    where = []
    params = []
    if since:
        try:
            # Validate format; use as string in comparison on DATE column
            datetime.fromisoformat(since)
            where.append("day > %s")
            params.append(since)
        except Exception:
            pass
    if player_id:
        where.append("player_id = %s")
        params.append(player_id)

    base = "SELECT * FROM training_records"
    if where:
        base += " WHERE " + " AND ".join(where)
    base += " ORDER BY day DESC, training_id DESC"

    cursor.execute(base, tuple(params))
    records = cursor.fetchall()
    for record in records:
        if 'day' in record and record['day']:
            record['day'] = record['day'].isoformat()
        if 'duration' in record and record['duration']:
            record['duration'] = str(record['duration'])
    return jsonify(records)

@training_records_bp.route('/training_records', methods=['POST'])
def add_training_record():
    data = request.json
    required_fields = ['training_id', 'player_id', 'day', 'distance_covered', 'sprint_count', 'shots_on_target', 'duration', 'passing_accuracy']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields in request body"}), 400

    db = get_db()
    cursor = db.cursor()

    # Validate foreign keys early with clear messages
    try:
        cursor.execute("SELECT 1 FROM training WHERE training_id = %s", (data['training_id'],))
        if cursor.fetchone() is None:
            return jsonify({"error": f"Training ID {data['training_id']} does not exist"}), 400
        cursor.execute("SELECT 1 FROM player WHERE PLAYER_ID = %s", (data['player_id'],))
        if cursor.fetchone() is None:
            return jsonify({"error": f"Player ID {data['player_id']} does not exist"}), 400
    except Exception as e:
        return jsonify({"error": f"Validation failed: {str(e)}"}), 500

    # Upsert to avoid duplicate-key failures on (training_id, player_id, day)
    sql = (
        "INSERT INTO training_records (training_id, player_id, day, distance_covered, sprint_count, shots_on_target, duration, passing_accuracy) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) "
        "ON DUPLICATE KEY UPDATE distance_covered=VALUES(distance_covered), sprint_count=VALUES(sprint_count), "
        "shots_on_target=VALUES(shots_on_target), duration=VALUES(duration), passing_accuracy=VALUES(passing_accuracy)"
    )
    try:
        cursor.execute(sql, (
            data['training_id'], data['player_id'], data['day'],
            data['distance_covered'], data['sprint_count'], data['shots_on_target'],
            data['duration'], data['passing_accuracy']
        ))
        rowcount = cursor.rowcount  # 1 for insert, 2 for update in MySQL
        db.commit()
        # Echo back the upserted record for instant UI update
        created = {
            'training_id': data['training_id'],
            'player_id': data['player_id'],
            'day': data['day'],
            'distance_covered': data['distance_covered'],
            'sprint_count': data['sprint_count'],
            'shots_on_target': data['shots_on_target'],
            'duration': data['duration'],
            'passing_accuracy': data['passing_accuracy']
        }
        status = 201 if rowcount == 1 else 200
        msg = "Training record added successfully" if status == 201 else "Training record updated successfully"
        return jsonify({"message": msg, "record": created}), status
    except Exception as e:
        db.rollback()
        # Provide clearer MySQL integrity messages if any
        return jsonify({"error": f"Failed to upsert training record: {str(e)}"}), 500

@training_records_bp.route('/training_records', methods=['PUT'])
def update_training_record():
    data = request.json
    # Composite key fields
    training_id = data.get('training_id')
    player_id = data.get('player_id')
    day = data.get('day')

    if not all([training_id, player_id, day]):
        return jsonify({"error": "Missing composite key fields (training_id, player_id, day)"}), 400

    db = get_db()
    cursor = db.cursor()
    
    # Construct the SET part of the query dynamically
    update_fields = []
    update_values = []
    for key, value in data.items():
        if key not in ['training_id', 'player_id', 'day']:
            update_fields.append(f"{key}=%s")
            update_values.append(value)

    if not update_fields:
        return jsonify({"error": "No fields to update"}), 400

    sql = f"UPDATE training_records SET {', '.join(update_fields)} WHERE training_id=%s AND player_id=%s AND day=%s"
    update_values.extend([training_id, player_id, day])

    try:
        cursor.execute(sql, tuple(update_values))
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({"message": "No record found to update"}), 404
        return jsonify({"message": "Training record updated successfully"})
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

@training_records_bp.route('/training_records', methods=['DELETE'])
def delete_training_record():
    data = request.json
    training_id = data.get('training_id')
    player_id = data.get('player_id')
    day = data.get('day')

    if not all([training_id, player_id, day]):
        return jsonify({"error": "Missing composite key fields (training_id, player_id, day)"}), 400

    db = get_db()
    cursor = db.cursor()
    sql = "DELETE FROM training_records WHERE training_id=%s AND player_id=%s AND day=%s"
    
    try:
        cursor.execute(sql, (training_id, player_id, day))
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({"message": "No record found to delete"}), 404
        return jsonify({"message": "Training record deleted successfully"})
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

# Endpoint to get key performance metrics from training_records
@training_records_bp.route('/training_records/performance_metrics', methods=['GET'])
def get_performance_metrics():
    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Optional: prefer a stored procedure if provided via env var
    # Set METRICS_PROCEDURE_NAME to your procedure name (e.g., 'sp_training_performance_metrics').
    # If provided, we'll try to call it with optional player_id (if the proc accepts one argument).
    proc_name = os.getenv('METRICS_PROCEDURE_NAME')
    player_id = request.args.get('player_id')

    candidate_procs = [p for p in [proc_name, 'sp_training_performance_metrics', 'sp_training_metrics'] if p]
    for cand in candidate_procs:
        try:
            # Try calling with one parameter if player_id present, otherwise call without params
            if player_id:
                cursor.callproc(cand, [player_id])
            else:
                cursor.callproc(cand)

            # Fetch all result sets (MySQL returns results via nextset)
            results = []
            for result in cursor.stored_results():
                results.extend(result.fetchall())
            # Normalize dates
            for r in results:
                if 'day' in r and r['day']:
                    r['day'] = r['day'].isoformat()
            return jsonify(results)
        except Exception:
            # Fall back to direct SELECT if procedure call fails
            db.rollback()
            # and try next candidate
            continue
    # Fallback: direct SELECT (optionally filtered), ordered by day
    if player_id:
        sql = (
            "SELECT player_id, day, distance_covered, passing_accuracy, sprint_count, shots_on_target "
            "FROM training_records WHERE player_id = %s ORDER BY day ASC"
        )
        cursor.execute(sql, (player_id,))
    else:
        sql = (
            "SELECT player_id, day, distance_covered, passing_accuracy, sprint_count, shots_on_target "
            "FROM training_records ORDER BY day ASC"
        )
        cursor.execute(sql)

    records = cursor.fetchall()
    for record in records:
        if 'day' in record and record['day']:
            record['day'] = record['day'].isoformat()
    return jsonify(records)

# New endpoints using GROUP BY and aggregate functions
@training_records_bp.route('/training_records/player_performance', methods=['GET'])
def get_player_performance():
    """Get player performance summary using GROUP BY"""
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM player_performance_summary ORDER BY avg_distance DESC")
    result = cursor.fetchall()
    return jsonify(result)

@training_records_bp.route('/training_records/training_type_stats', methods=['GET'])
def get_training_type_stats():
    """Get training type performance using GROUP BY"""
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM training_type_performance ORDER BY avg_distance DESC")
    result = cursor.fetchall()
    return jsonify(result)

@training_records_bp.route('/training_records/daily_team_stats', methods=['GET'])
def get_daily_team_stats():
    """Get daily team performance using GROUP BY"""
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    # Optional date filter
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    sql = "SELECT * FROM daily_team_performance"
    params = []
    
    if start_date and end_date:
        sql += " WHERE day BETWEEN %s AND %s"
        params = [start_date, end_date]
    elif start_date:
        sql += " WHERE day >= %s"
        params = [start_date]
    
    sql += " ORDER BY day DESC LIMIT 30"  # Last 30 days
    
    cursor.execute(sql, params)
    result = cursor.fetchall()
    
    # Convert dates to strings for JSON
    for record in result:
        if 'day' in record and record['day']:
            record['day'] = record['day'].isoformat()
    
    return jsonify(result)

@training_records_bp.route('/training_records/weekly_stats', methods=['GET'])
def get_weekly_stats():
    """Get weekly performance using GROUP BY"""
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM weekly_performance ORDER BY week_year DESC LIMIT 10")
    result = cursor.fetchall()
    
    # Convert dates to strings for JSON
    for record in result:
        if 'week_start' in record and record['week_start']:
            record['week_start'] = record['week_start'].isoformat()
    
    return jsonify(result)

@training_records_bp.route('/training_records/player_rankings', methods=['GET'])
def get_player_rankings():
    """Get player rankings using GROUP BY and window functions"""
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM player_rankings ORDER BY distance_rank")
    result = cursor.fetchall()
    return jsonify(result)

@training_records_bp.route('/training_records/advanced_stats', methods=['GET'])
def get_advanced_stats():
    """Get advanced statistics using complex GROUP BY queries"""
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    # Complex query with multiple GROUP BY and aggregates
    sql = """
        SELECT 
            t.type as training_type,
            MONTH(tr.day) as month,
            YEAR(tr.day) as year,
            COUNT(*) as total_sessions,
            COUNT(DISTINCT tr.player_id) as unique_players,
            AVG(tr.distance_covered) as avg_distance,
            STDDEV(tr.distance_covered) as stddev_distance,
            AVG(tr.passing_accuracy) as avg_accuracy,
            STDDEV(tr.passing_accuracy) as stddev_accuracy,
            MAX(tr.distance_covered) as max_distance,
            MIN(tr.distance_covered) as min_distance,
            SUM(tr.distance_covered) as total_distance,
            AVG(tr.sprint_count) as avg_sprints,
            SUM(tr.sprint_count) as total_sprints
        FROM training_records tr
        JOIN training t ON tr.training_id = t.training_id
        WHERE tr.day >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY t.type, YEAR(tr.day), MONTH(tr.day)
        ORDER BY year DESC, month DESC, training_type
    """
    
    cursor.execute(sql)
    result = cursor.fetchall()
    return jsonify(result)
