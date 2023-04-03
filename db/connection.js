const mysql = require('mysql2');

const connect = mysql.createConnection({
  host: "127.0.0.1",
  user:"root",
  password: "Wrenley1!",
  database: "employees_db",
});

connect.connect((err) => {
  if (err) throw err;
  console.log("Connected to the employee_db database");
});

module.exports = connect;