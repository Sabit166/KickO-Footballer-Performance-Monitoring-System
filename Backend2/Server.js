import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "p_dbms"
});

try {
    await db.execute(
        `CREATE TABLE IF NOT EXISTS team (
            TEAM_ID VARCHAR(20) PRIMARY KEY,
            TEAM_NAME VARCHAR(100) NOT NULL
        )`
    );
    console.log("Team table created or already exists.");
}
catch (err) {
    console.error("Error creating team table:", err);
};

// Create Player_User table
try {
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Player_User (
            Player_ID VARCHAR(20) PRIMARY KEY,
            Player_Name VARCHAR(100) NOT NULL,
            Team VARCHAR(100) NOT NULL,
            Email VARCHAR(100) NOT NULL UNIQUE,
            Password VARCHAR(255) NOT NULL
        )`
    );
    console.log("Player_User table created or already exists.");
}
catch (err) {
    console.error("Error creating Player_User table:", err);
}

// Create Admin_User table
try {
    await db.execute(
        `CREATE TABLE IF NOT EXISTS Admin_User (
            Admin_ID VARCHAR(20) PRIMARY KEY,
            Email VARCHAR(100) NOT NULL UNIQUE,
            Password VARCHAR(255) NOT NULL
        )`
    );
    console.log("Admin_User table created or already exists.");
}
catch (err) {
    console.error("Error creating Admin_User table:", err);
}


// Player Login
app.post("/api/player/login", async (req, res) => {
    const { playerId, playerName, teamName, email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const [players] = await db.execute(
            "SELECT * FROM Player_User WHERE Email = ?",
            [email]
        );

        if (players.length === 0) {
            return res.status(401).json({ error: "Invalid player credentials" });
        }

        const player = players[0];

        const isPasswordValid = await bcrypt.compare(password, player.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Player login successful!",
            user: {
                playerId: player.Player_ID,
                playerName: player.Player_Name,
                team: player.Team,
                email: player.Email,
                role: 'player'
            }
        });
    } catch (err) {
        console.error("Player login error details:", err);
        res.status(500).json({ error: "Error during player login: " + err.message });
    }
});

// Admin Login
app.post("/api/admin/login", async (req, res) => {
    const { adminId, email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const [admins] = await db.execute(
            "SELECT * FROM Admin_User WHERE Email = ?",
            [email]
        );

        if (admins.length === 0) {
            return res.status(401).json({ error: "Invalid admin credentials" });
        }

        const admin = admins[0];

        const isPasswordValid = await bcrypt.compare(password, admin.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Admin login successful!",
            user: {
                adminId: admin.Admin_ID,
                email: admin.Email,
                role: 'admin'
            }
        });
    } catch (err) {
        console.error("Admin login error details:", err);
        res.status(500).json({ error: "Error during admin login: " + err.message });
    }
});

// Player Signup
app.post("/api/player/signup", async (req, res) => {
    const { playerId, playerName, team, email, password } = req.body;

    try {
        if (!playerId || !playerName || !team || !email || !password) {
            return res.status(400).json({ error: "Player ID, player name, team, email, and password are required" });
        }

        // Check if Player_ID already exists
        const [existingPlayerId] = await db.execute(
            "SELECT Player_ID FROM Player_User WHERE Player_ID = ?",
            [playerId]
        );

        if (existingPlayerId.length > 0) {
            return res.status(400).json({ error: "Player ID already exists" });
        }

        // Check if email already exists in Player_User
        const [existingPlayer] = await db.execute(
            "SELECT Player_ID FROM Player_User WHERE Email = ?",
            [email]
        );

        if (existingPlayer.length > 0) {
            return res.status(400).json({ error: "Email already registered as player" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new player
        await db.execute(
            "INSERT INTO Player_User (Player_ID, Player_Name, Team, Email, Password) VALUES (?, ?, ?, ?, ?)",
            [playerId, playerName, team, email, hashedPassword]
        );

        res.status(201).json({
            message: "Player registered successfully!",
            playerId: playerId,
            playerName: playerName,
            team: team
        });

    } catch (err) {
        console.error("Player signup error details:", err);
        res.status(500).json({ error: "Error registering player: " + err.message });
    }
});

// Admin Signup
app.post("/api/admin/signup", async (req, res) => {
    const { adminId, email, password } = req.body;

    try {
        if (!adminId || !email || !password) {
            return res.status(400).json({ error: "Admin ID, email, and password are required" });
        }

        // Check if Admin_ID already exists
        const [existingAdminId] = await db.execute(
            "SELECT Admin_ID FROM Admin_User WHERE Admin_ID = ?",
            [adminId]
        );

        if (existingAdminId.length > 0) {
            return res.status(400).json({ error: "Admin ID already exists" });
        }

        // Check if email already exists in Admin_User
        const [existingAdmin] = await db.execute(
            "SELECT Admin_ID FROM Admin_User WHERE Email = ?",
            [email]
        );

        if (existingAdmin.length > 0) {
            return res.status(400).json({ error: "Email already registered as admin" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new admin
        await db.execute(
            "INSERT INTO Admin_User (Admin_ID, Email, Password) VALUES (?, ?, ?)",
            [adminId, email, hashedPassword]
        );

        res.status(201).json({
            message: "Admin registered successfully!",
            adminId: adminId
        });

    } catch (err) {
        console.error("Admin signup error details:", err);
        res.status(500).json({ error: "Error registering admin: " + err.message });
    }
});

app.listen(5001, () => console.log("Server running on http://localhost:5001"));

