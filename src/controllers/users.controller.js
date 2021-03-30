const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users.model");



exports.signup = (request, response) => {
    response.render("signup.ejs");
}

exports.newAccount = (request, response) => {
    const { firstname, lastname, birthday, city, phone, email, username, password } = request.body;

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
                    password: hash
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

exports.login = (request, response) => {
    response.render("login.ejs");
}


