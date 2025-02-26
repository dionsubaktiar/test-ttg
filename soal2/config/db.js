const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

// Connect mysql
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");

    db.query("CREATE DATABASE IF NOT EXISTS userdb", (err) => {
      if (err) {
        console.error("Error creating database:", err);
      } else {
        console.log("Database 'userdb' is ready");
      }
    });

    db.query("USE userdb", (err) => {
      if (err) {
        console.error("Error selecting database:", err);
      } else {
        console.log("Using database 'userdb'");

        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
          )
        `;

        db.query(createTableQuery, (err) => {
          if (err) {
            console.error("Error creating users table:", err);
          } else {
            console.log("Table 'users' is ready");
          }
        });
      }
    });
  }
});

module.exports = db;
