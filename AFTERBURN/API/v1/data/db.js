const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234567890',
    database: 'rotordb',
    waitForConnections: true,
    connectionLimit: 23,  
    queueLimit: 0
});

module.exports = { pool };