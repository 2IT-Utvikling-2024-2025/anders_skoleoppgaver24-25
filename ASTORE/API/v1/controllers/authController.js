const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../data/db');

const SECRET_KEY = "hemmelig";

// REGISTER USER
const register = async (req, res) => {
    const { name, password, role } = req.body;

    if (!name || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if name already exists
        const [existing] = await pool.query("SELECT * FROM users WHERE name = ?", [name]);
        if (existing.length > 0) {
            return res.status(409).json({ error: "Name already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [results] = await pool.query(
            "INSERT INTO users (name, password, role) VALUES (?, ?, ?)",
            [name, hashedPassword, role]
        );

        res.status(201).json({
            id: results.insertId,
            name,
            role
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN USER
const login = async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: "Name and password are required" });
    }

    try {
        const [results] = await pool.query("SELECT * FROM users WHERE name = ?", [name]);
        const user = results[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid name or password" });
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                name: user.name,
                role: user.role
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login
};
