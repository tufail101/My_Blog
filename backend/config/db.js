const mySql = require("mysql2");
require("dotenv").config();

const connection = mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA_BASE,
});

module.exports=connection;