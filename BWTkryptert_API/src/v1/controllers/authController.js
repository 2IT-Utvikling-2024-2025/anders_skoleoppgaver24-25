const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "hemmelig";

const { pool } = require('../data/db');

const register = async(req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [results] = await pool.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, hashedPassword, role]);
        
        res.status(201).json({
            id: results.insertId, 
            username, 
            password, 
            role 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
               }
    }
   

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [results] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        console.log(results);
        const user = results[0];
        console.log(user);

        //Check if a user exisist and password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ username: user.user_name, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    register, 
    login 
}