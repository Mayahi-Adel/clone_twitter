const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken"); 
const Users = require("../models/users.model");



dotenv.config();

const MAX_AGE = Math.floor(Date.now() / 1000) + (60 * 60);

exports.signup = async (request, response) => {
    const alerts_warning = await request.consumeFlash("warning");
    response.render("signup.ejs", { alerts_warning });
}

exports.newAccount = (request, response) => {
    const { firstname, lastname, birthday, city, phone, email, username, password, avatar } = request.body;

    Users.getByUsername(username, async (error, result) => {
        if(error){
            response.send(error.message);
        }
    
        if(result.length !== 0){
            await request.flash("warning", "Username already exists !")
            response.redirect("/signup");
        }

        // if the username doesn't exist => we can create the account
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
exports.login = async (request, response) => {
    const alerts_warning = await request.consumeFlash("warning");
    console.log(alerts_warning)
    response.render("login.ejs", { alerts_warning });
}

// login
exports.authenticate = (request, response) => {
    const { username, password } = request.body;

    Users.getByUsername(username, async (error, result) => {
        if(error){
            response.send(error.message)
        } else if (result.length == 0){
            await request.flash("warning", "this user doesn't exist !");
            response.redirect("/login");
        } else {
            const hash = result[0].password;
            bcrypt.compare(password, hash, (error, isCorrect) => {
                if(error){
                    response.send(error.message)
                } 
                
                if (!isCorrect){
                    request.flash("warning", "invalid pasword !")
                    response.redirect("/login");
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


