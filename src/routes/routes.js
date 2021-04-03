const express = require("express");
const isAuth = require("../middlewares/isAuth");
const tweetsControllers = require("../controllers/tweets.controller");
const usersControllers = require("../controllers/users.controller");

const router = express.Router();

// users routes
router.get("/signup/", usersControllers.signup)
router.post("/signup/", usersControllers.newAccount)

router.get("/login", usersControllers.login);
router.post("/login", usersControllers.authenticate);
router.get("/logout", usersControllers.logout);


// home page 
router.get("/", isAuth, tweetsControllers.findAll);
router.post("/tweet", tweetsControllers.addTweet);
router.post("/tweet/edit", tweetsControllers.updateTweet);
router.get("/tweet/delete/:userId/:tweetId", isAuth, tweetsControllers.deleteTweet)

router.get("/user/:id", isAuth, tweetsControllers.myTweets)
//router.get("/profil", isAuth, tweetsControllers.userProfile)


module.exports = router;