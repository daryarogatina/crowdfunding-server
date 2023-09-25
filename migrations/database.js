require("dotenv").config();
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const sqlScript = fs.readFileSync(path.join(__dirname, 'database-creation.sql'), 'utf8');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    multipleStatements: true
});


connection.query(sqlScript, (error, results) => {
    if (error) throw error;
    console.log('Tables created successfully!');
    console.log('results: ', results)
});

connection.end();
