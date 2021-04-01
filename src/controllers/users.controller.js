const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken"); 
const Users = require("../models/users.model");



dotenv.config();

const MAX_AGE = Math.floor(Date.now() / 1000) + (60 * 60);

exports.signup = (request, response) => {
    response.render("signup.ejs");
}

exports.newAccount = (request, response) => {
    const { firstname, lastname, birthday, city, phone, email, username, password, avatar } = request.body;

    Users.getByUsername(username, (error, result) => {
        if(error){
            response.send(error.message);
        }
    
        if(result.length !== 0){
            response.send("Username already exists !");
        }

        // if the username dont exists => we can create the account
        // crypt password

        else { 

            const saltRounds = 10;

            bcrypt.hash(password, saltRounds, (error, hash) => {
                if(error){
                    response.send(error.message);
                }

                const newUser = {
                    firstname,
                    lastname,
                    birthday, 
                    city,
                    phone,
                    email,
                    username,
                    password: hash,
                    avatar
                }

                Users.create(newUser, (error, result) => {
                    if(error){
                        response.send(error.message);
                    }
                    response.redirect("/login");
                })
            })
        }
    })
}
// Redirect after create a new account
exports.login = (request, response) => {
    response.render("login.ejs");
}

// login
exports.authenticate = (request, response) => {
    const { username, password } = request.body;

    Users.getByUsername(username, (error, result) => {
        if(error){
            response.send(error.message)
        } else if (result.length == 0){
            response.send("this user doesn't exist !")
        } else {
            const hash = result[0].password;
            bcrypt.compare(password, hash, (error, isCorrect) => {
                if(error){
                    response.send(error.message)
                } 
                
                if (!isCorrect){
                    response.send("invalid pasword !");
                } else {
                    const user = {
                        id: result[0].id,
                        firstname: result[0].firstname,
                        username: result[0].username,
                        exp: MAX_AGE
                    }

                    jwt.sign(user, process.env.SECRET_JWT, (error, token) => {
                        if(error){
                            response.send(error.message)
                        } 
                        request.user = user;
                        response.cookie("authcookie", token, { maxAge: 60*60*1000 });
                        response.redirect("/");
                        
                    })
                }
            })
        }
    })
}

exports.logout = (request, response) => {
    response.clearCookie("authcookie");
    response.redirect("/");
}


