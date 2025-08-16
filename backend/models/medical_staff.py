from flask import Blueprint, request, jsonify
from db import get_db

medical_staff_bp = Blueprint('medical_staff', __name__)


# CREATE a new medical staff
@medical_staff_bp.route('/medical_staffs', methods=['POST'])
def add_staff():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = "INSERT INTO MEDICAL_STAFFS (STAFF_NAME, SPECIALIZATION) VALUES (%s, %s)"
    cursor.execute(sql, (data['STAFF_NAME'], data['SPECIALIZATION']))
    db.commit()
    return jsonify({"message": "Medical staff added successfully", "STAFF_ID": cursor.lastrowid})

@medical_staff_bp.route('/medical_staffs', methods=['GET'])
def get_staffs():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM MEDICAL_STAFFS")
    return jsonify(cursor.fetchall())

@medical_staff_bp.route('/medical_staffs/<int:staff_id>', methods=['PUT'])
def update_staff(staff_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    sql = "UPDATE MEDICAL_STAFFS SET STAFF_NAME=%s, SPECIALIZATION=%s WHERE STAFF_ID=%s"
    cursor.execute(sql, (data['STAFF_NAME'], data['SPECIALIZATION'], staff_id))
    db.commit()
    return jsonify({"message": "Medical staff updated"})

@medical_staff_bp.route('/medical_staffs/<int:staff_id>', methods=['DELETE'])
def delete_staff(staff_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM MEDICAL_STAFFS WHERE STAFF_ID=%s", (staff_id,))
    db.commit()
    return jsonify({"message": "Medical staff deleted"})
