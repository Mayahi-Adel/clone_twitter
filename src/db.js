const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clone_twitter_db"
})

db.connect((error) => {
    if(error) throw error;
    console.log("data base connexion")
})

module.exports = db;

