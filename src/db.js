const mysql = require("mysql2");
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

db.connect((error) => {
    if(error) throw error;
    console.log("data base connexion")
})

module.exports = db;

