const express = require('express');
const Tweets = require('../models/tweets.model');
const Users = require("../models/users.model");


exports.findAll = (request, response) => {
    const { user } = request;

    Tweets.getAll((error, tweets) => {
        if(error) {
            response.send(error.message);
        }
    
        response.render("index.ejs", { tweets, user });
    })
}

exports.addTweet = (request, response) => {

    const { username } = request.body;
    Users.getByUsername(username, (error, result) => {
        if(error){
            response.send(error.message);
        }
        if(result.length == 0) {
            response.send("Session expired. Please try to login again")
        }
        else {
            const idUser = result[0].id;
            Tweets.addOne(request.body, idUser, (error, result) => {
             if(error){
                 response.send(error.message)
             }
             response.redirect('/');
            })
        }
    })

}

// exports.profil = (req, res) => {
//     res.render("profil.ejs");
// }

exports.myTweets = (req, res) => {
    const id = req.params.id;

    Tweets.findById(id, (error, data) => {
        if(error){
            req.send(error.message)
        } else {
            const user = 
            {   
                firstname: data[0].firstname,
                lastname: data[0].lastname,
                city: data[0].city,
                username: data[0].username
            }
            
            res.render("profile.ejs", { data, user });
        }
    })
}

exports.updateTweet = (req, res) => {
    const tweetId = req.body.tweetId;
    const content = req.body.message;
    const userId = req.body.user; 
    console.log('user :' , userId)
    console.log("tweet: ", tweetId)


    Tweets.update(tweetId, content, (error, result) => {
        if(error){
            req.send(error.message)
        } else {
            res.redirect(`/user/${userId}`);
        }
    })
}

exports.deleteTweet = (req, res) => {
    const userId = req.params.userId;
    const tweetId = req.params.tweetId;

    console.log(userId);
    console.log(tweetId);
    Tweets.delete(tweetId, (error, result) => {
        if(error){
            req.send(error.message)
        } else {
            res.redirect(`/user/${userId}`);
        }
    })
}