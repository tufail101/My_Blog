const mySql = require("mysql2");
require("dotenv").config();

const connection = mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA_BASE,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.message);
    return;
  }
  console.log('Connected to MySQL database successfully');
});

module.exports = connection;
