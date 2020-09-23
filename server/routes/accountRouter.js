require("dotenv").config();
const User = require("../database/User");
var express = require("express");
const jwt_decode = require("jwt-decode");
var accountRouter = express.Router();

accountRouter.get("/getuser", (req, res) => {
  const cookie = req.cookies["auth_token"];
  const decodeCookie = jwt_decode(cookie);
  const userID = decodeCookie.sub;

  User.findById(userID, (err, user) => {
    if (err) console.log(err);

    const username = user.username;

    res.json(username);
  });
});

module.exports = accountRouter;
