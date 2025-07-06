from flask import Flask, request, jsonify, render_template
import cx_Oracle
from db_config import get_db_connection

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# GET all sessions
@app.route('/api/sessions', methods=['GET'])
def get_sessions():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM training_sessions")
    columns = [col[0].lower() for col in cursor.description]
    sessions = [dict(zip(columns, row)) for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    return jsonify(sessions)

# POST a new session
@app.route('/api/sessions', methods=['POST'])
def add_session():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO training_sessions (id, player_id, type, duration, load, session_date, remarks)
        VALUES (:id, :player_id, :type, :duration, :load, TO_DATE(:session_date, 'YYYY-MM-DD'), :remarks)
    """, data)
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Session added successfully'}), 201

# PUT (update) a session
@app.route('/api/sessions/<int:session_id>', methods=['PUT'])
def update_session(session_id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE training_sessions
        SET player_id=:player_id, type=:type, duration=:duration, load=:load,
            session_date=TO_DATE(:session_date, 'YYYY-MM-DD'), remarks=:remarks
        WHERE id=:id
    """, {**data, 'id': session_id})
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Session updated successfully'})

# DELETE a session
@app.route('/api/sessions/<int:session_id>', methods=['DELETE'])
def delete_session(session_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM training_sessions WHERE id = :id", {'id': session_id})
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Session deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
# File: training_fitness/db_config.py
# This file contains the database connection configuration.