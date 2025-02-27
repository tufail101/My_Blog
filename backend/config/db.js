const mySql = require("mysql2");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "841438",
  database: "MyBlog",
});

module.exports=connection;