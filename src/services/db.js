const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect();

async function query(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

async function closeConnection() {
  return new Promise((resolve, reject) => {
    connection.end((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

module.exports = {
  query,
  closeConnection,
};
