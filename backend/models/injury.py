from flask import Blueprint, request, jsonify
from db import get_db

injury_bp = Blueprint('injury', __name__)

# CREATE a new injury case
@injury_bp.route('/injuries', methods=['POST'])
def add_injury():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = "INSERT INTO INJURY (TYPE, SEVERITY, RESTING_PERIOD) VALUES (%s, %s, %s)"
    cursor.execute(sql, (data['TYPE'], data['SEVERITY'], data['RESTING_PERIOD']))
    db.commit()
    return jsonify({"message": "Injury added successfully", "INJURY_CASE_ID": cursor.lastrowid})


@injury_bp.route('/injuries', methods=['GET'])
def get_injuries():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM INJURY")
    return jsonify(cursor.fetchall())

@injury_bp.route('/injuries/<int:case_id>', methods=['PUT'])
def update_injury(case_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = """UPDATE INJURY 
             SET TYPE=%s, SEVERITY=%s, RESTING_PERIOD=%s 
             WHERE INJURY_CASE_ID=%s"""
    cursor.execute(sql, (data['TYPE'], data['SEVERITY'], 
                         data['RESTING_PERIOD'], case_id))
    db.commit()
    return jsonify({"message": "Injury updated"})

@injury_bp.route('/injuries/<int:case_id>', methods=['DELETE'])
def delete_injury(case_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM INJURY WHERE INJURY_CASE_ID=%s", (case_id,))
    db.commit()
    return jsonify({"message": "Injury deleted"})
