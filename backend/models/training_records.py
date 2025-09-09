from flask import Blueprint, request, jsonify
from db import get_db
import os
from datetime import datetime

training_records_bp = Blueprint('training_records', __name__)

@training_records_bp.route('/training_records', methods=['GET'])
def get_training_records():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    # Allow filtering by player_id
    player_id = request.args.get('player_id')
    
    if player_id:
        cursor.execute("SELECT * FROM training_records WHERE player_id = %s ORDER BY day DESC, training_id DESC", (player_id,))
    else:
        cursor.execute("SELECT * FROM training_records ORDER BY day DESC, training_id DESC")
        
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
    """SQL aggregate metrics. Optional query params: player_id, days (int)."""
    db = get_db()
    cursor = db.cursor(dictionary=True)
    player_id = request.args.get('player_id')
    days = request.args.get('days')

    where = []
    params = []
    if player_id:
        where.append("player_id = %s")
        params.append(player_id)
    if days:
        try:
            d = int(days)
            if d > 0:
                where.append("day >= DATE_SUB(CURDATE(), INTERVAL %s DAY)")
                params.append(d)
        except Exception:
            pass

    sql = (
        "SELECT AVG(distance_covered) AS avgDistance, "
        "AVG(passing_accuracy) AS avgPassingAccuracy, "
        "AVG(sprint_count) AS avgSprintCount, "
        "AVG(shots_on_target) AS avgShotsOnTarget "
        "FROM training_records"
    )
    if where:
        sql += " WHERE " + " AND ".join(where)

    cursor.execute(sql, tuple(params))
    row = cursor.fetchone() or {}
    # Normalize None to 0
    result = {
        'avgDistance': float(row.get('avgDistance') or 0),
        'avgPassingAccuracy': float(row.get('avgPassingAccuracy') or 0),
        'avgSprintCount': float(row.get('avgSprintCount') or 0),
        'avgShotsOnTarget': float(row.get('avgShotsOnTarget') or 0),
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
