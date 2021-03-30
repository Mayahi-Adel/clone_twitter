const express = require("express");
const tweetsControllers = require("../controllers/tweets.controller");
const usersControllers = require("../controllers/users.controller");

const router = express.Router();

// users routes
router.get("/signup/", usersControllers.signup)
router.post("/signup/", usersControllers.newAccount)

router.get("/login", usersControllers.login);
// router.post("/login", usersControllers.authenticate);
// router.get("/logout", usersControllers.logout);


// home page (20 latest tweets)
router.get("/", tweetsControllers.findAll);

module.exports = router;