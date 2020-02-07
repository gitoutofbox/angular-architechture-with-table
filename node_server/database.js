const mysql = require('mysql');

// mysql
const con = mysql.createConnection({
    host    : "localhost",
    user    : "root",
    password: "",
    database: "angular_architecture",
});
global.database = con;