const express = require("express");
const tweetsControllers = require("../controllers/tweets.controller")

const router = express.Router();

// home page (20 latest tweets)
router.get('/', tweetsControllers.findAll);