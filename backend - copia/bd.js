const mysql = require('mysql2/promise');
require("dotenv").config();


const mysqlconnection= mysql.createPool({
database: process.env.MYSQL_DB,
host: process.env.MYSQL_HOST,
password: process.env.MYSQL_PASSWORD,
port: process.env.MYSQL_PORT,
user: process.env.MYSQL_USER
});



module.exports = mysqlconnection;
