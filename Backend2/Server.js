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
    password: "alif",
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

try {
    await db.execute(
        `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            TEAM_ID VARCHAR(20) NOT NULL,
            u_name VARCHAR(100) NOT NULL,
            role VARCHAR(100),
            email VARCHAR(100) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            FOREIGN KEY (TEAM_ID) REFERENCES team(TEAM_ID) ON DELETE CASCADE
        )`
    );
    console.log("Users table created or already exists.");
}
catch (err) {
    console.error("Error creating users table:", err);
};


app.post("/api/login", async (req, res) => {
    const { email, password, role, teamcode } = req.body;

    try {
        if (!email || !password || !role || !teamcode) {
            return res.status(400).json({ error: "Email, password, role, and team ID are required" });
        }
        const [users] = await db.execute(
            "SELECT * FROM users WHERE TEAM_ID = ? AND email = ? AND role = ?",
            [teamcode, email, role]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid credentials or role" });
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user.id,
                name: user.u_name,
                email: user.email,
                role: user.role,
                teamId: user.TEAM_ID
            }
        });
    } catch (err) {
        console.error("Login error details:", err);
        console.error("Error stack:", err.stack);
        res.status(500).json({ error: "Error during login: " + err.message });
    }
});

app.post("/api/signup", async (req, res) => {
    const { name, teamName, email, password, role } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        const [existingUser] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows] = await db.execute(
            "SELECT TEAM_ID FROM team ORDER BY TEAM_ID DESC LIMIT 1"
        );

        let nextCode = "tm01";
        if (rows.length > 0) {
            const lastCode = rows[0].TEAM_ID;

            // Check if the last code follows "tm##" format
            if (lastCode && lastCode.startsWith("tm") && lastCode.length >= 4) {
                const numPart = lastCode.slice(2); // Extract number part after "tm"
                const num = parseInt(numPart);
                if (!isNaN(num)) {
                    nextCode = "tm" + String(num + 1).padStart(2, "0");
                }
            } else {
                // If existing data is numeric or different format, start fresh with tm01
                // Or convert existing numeric to tm format
                if (!isNaN(parseInt(lastCode))) {
                    const num = parseInt(lastCode);
                    nextCode = "tm" + String(num + 1).padStart(2, "0");
                }
            }
        }

        // Always insert team (use team name if provided, otherwise use a default name)
        const finalTeamName = teamName || `Team ${nextCode}`;
        await db.execute(
            "INSERT INTO team (TEAM_ID, TEAM_NAME) VALUES (?, ?)",
            [nextCode, finalTeamName]
        );

        await db.execute(
            "INSERT INTO users (TEAM_ID, u_name, role, email, password_hash) VALUES (?, ?, ?, ?, ?)",
            [nextCode, name, role || 'admin', email, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully!",
            teamId: nextCode
        });
    } catch (err) {
        console.error("Signup error details:", err);
        console.error("Error stack:", err.stack);
        res.status(500).json({ error: "Error registering user: " + err.message });
    }
});

app.listen(5001, () => console.log("Server running on http://localhost:5001"));
