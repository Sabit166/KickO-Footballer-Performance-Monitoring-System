# backend/models/player.py

import mysql.connector
from mysql.connector import Error

# Database connection helper
def get_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="your_username",        # 🔹 change this
            password="your_password",    # 🔹 change this
            database="athlete_db"        # 🔹 your DB name
        )
        return connection
    except Error as e:
        print("Error connecting to MySQL:", e)
        return None


# ✅ 1. Fetch all players
def get_all_players():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT player_id, player_name, height, weight, contract FROM players")
    
    players = []
    for row in cursor.fetchall():
        players.append({
            "player_id": row[0],
            "player_name": row[1],
            "height": row[2],
            "weight": row[3],
            "contract": row[4]
        })
    cursor.close()
    conn.close()
    return players


# ✅ 2. Fetch single player by ID
def get_player_by_id(player_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT player_id, player_name, height, weight, contract 
        FROM players WHERE player_id = %s
    """, (player_id,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if row:
        return {
            "player_id": row[0],
            "player_name": row[1],
            "height": row[2],
            "weight": row[3],
            "contract": row[4]
        }
    return None


# ✅ 3. Add a new player
def add_player(player_name, height, weight, contract):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO players (player_name, height, weight, contract)
        VALUES (%s, %s, %s, %s)
    """, (player_name, height, weight, contract))
    conn.commit()
    cursor.close()
    conn.close()
    return True


# ✅ 4. Update player info
def update_player(player_id, player_name=None, height=None, weight=None, contract=None):
    conn = get_connection()
    cursor = conn.cursor()

    query = "UPDATE players SET "
    values = []
    updates = []

    if player_name:
        updates.append("player_name = %s")
        values.append(player_name)
    if height:
        updates.append("height = %s")
        values.append(height)
    if weight:
        updates.append("weight = %s")
        values.append(weight)
    if contract:
        updates.append("contract = %s")
        values.append(contract)

    query += ", ".join(updates) + " WHERE player_id = %s"
    values.append(player_id)

    cursor.execute(query, tuple(values))
    conn.commit()
    cursor.close()
    conn.close()
    return True


# ✅ 5. Delete a player
def delete_player(player_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM players WHERE player_id = %s", (player_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return True


# 🔹 Test block
if __name__ == "__main__":
    print("🔎 Testing Player Module...\n")

    # Add a player
    add_player("Rahim Uddin", 180, 75, "2 years contract")
    print("✅ Player added.")

    # Fetch all players
    print("\nAll Players:")
    for p in get_all_players():
        print(p)

    # Fetch one player
    player = get_player_by_id(1)
    print("\nPlayer with ID 1:", player)

    # Update player
    update_player(1, weight=78, contract="3 years contract")
    print("\n✅ Player updated.")

    # Delete player
    delete_player(1)
    print("\n✅ Player with ID 1 deleted.")
