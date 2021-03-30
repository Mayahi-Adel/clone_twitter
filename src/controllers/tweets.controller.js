const express = require('express');
const Tweets = require('../models/tweets.model');

exports.findAll = (request, response) => {
    
    Tweets.getAll((error, tweets) => {
        if(error) {
            response.send(error.message);
        }
        response.render("login.ejs");
    })
}

