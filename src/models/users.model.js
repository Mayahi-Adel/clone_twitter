const db = require("../db");

exports.getByUsername = (username, callback) => {
    db.query(`SELECT * FROM USERS WHERE username = "${username}"`, (error, result) => {
        if(error){
            console.log("error: ", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}

exports.create = (user, callback) => {
    db.query(`INSERT INTO Users (firstname, lastname, birthday, username, email, password, phone, city) VALUES 
    ("${user.firstname}", "${user.lastname}", "${user.birthday}", "${user.username}", "${user.email}", "${user.password}", "${user.phone}", "${user.city}")`, (error, result) => {
        if(error){
            console.log("error: ", error)
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}






// exports.create = (user, callback) => {

//     db.query("INSERT INTO Users ()", (error, result) => {
//         if (error){
//             console.log('error: ', error);
//             callback(error, null);
//             return;
//         }
       
//         callback(null, result);

//     })
// }