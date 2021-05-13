//this is where im going to create mysql connection! -icecreamcrud
//3-10 89-93

const mysql = require("mysql");

connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db",
});

module.exports = connection;
