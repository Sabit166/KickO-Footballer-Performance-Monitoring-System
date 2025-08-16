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
    password: "tamim443",
    database: "test"
});

app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});

app.post("/api/signup", async (req, res) => {
    const { name, teamName, email, password } = req.body;

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
            "SELECT team_code FROM users ORDER BY id DESC LIMIT 1"
        );

        let nextCode = "tm01";
        if (rows.length > 0) {
            const lastCode = rows[0].team_code;
            const num = parseInt(lastCode.slice(2)) + 1;
            nextCode = "tm" + String(num).padStart(2, "0");
        }

        await db.execute(
            "INSERT INTO users (team_code, u_name, team_name, email, password_hash) VALUES (?, ?, ?, ?, ?)",
            [nextCode, name, teamName || null, email, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully!",
            teamCode: nextCode
        });
    } catch (err) {
        res.status(500).json({ error: "Error registering user" });
    }
});

app.listen(5001, () => console.log("Server running on http://localhost:5001"));
