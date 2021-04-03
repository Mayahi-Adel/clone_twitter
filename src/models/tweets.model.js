const db = require('../db');


exports.getAll = (callback) => {
    
    db.query("SELECT *, DATE_FORMAT(createdAt, '%d/%m/%Y %H:%i:%s') AS createdAt FROM Tweets INNER JOIN Users ON Tweets.userId = Users.id ORDER BY tweets.id DESC LIMIT 20 ", (error, result) => {
        if (error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }
       
        callback(null, result);

    })
}

exports.addOne = (tweet, userId, callback) => {
    
    db.query(`INSERT INTO Tweets (content, createdAt, userId) VALUES ("${ tweet.message }", now() , "${ userId }")`, (error, result) => {
        if (error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }
       
        callback(null, result);
    })
}

exports.findById = (id, callback) => {
    db.query(`SELECT *, DATE_FORMAT(createdAt, '%d/%m/%Y %H:%i:%s') AS createdAt FROM Users INNER JOIN Tweets ON Tweets.userId = Users.id WHERE userId = "${id} ORDER BY tweets.id "`, (error, result) => {
        if (error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }
       
        callback(null, result);
    })
}
exports.findProfilById = (id, callback) => {
    db.query(`SELECT * FROM Users  WHERE Id = "${id} "`, (error, result) => {
        if (error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }
       
        callback(null, result);
    })
}

exports.update = (tweetId, content, callback) => {
    
    db.query(`UPDATE Tweets SET content = "${ content }" WHERE id = "${ tweetId }"`, (error, result) => {
        if (error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }
       
        callback(null, result);
    })
}

exports.delete = ( tweetId, callback) => {
    db.query(`DELETE FROM Tweets WHERE id = "${tweetId}"`, (error, result) => {
        if (error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }
       
        callback(null, result);
    })
}

