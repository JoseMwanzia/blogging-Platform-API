const mysql = require('mysql2/promise');
require('dotenv').config();

// create a connection pool to the database
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'Z'
});

module.exports = db;
