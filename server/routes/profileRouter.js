require("dotenv").config();
const User = require("../database/User");
var express = require("express");
const jwt_decode = require("jwt-decode");
var profileRouter = express.Router();

profileRouter.get("/getuser", (req, res) => {
  const cookie = req.cookies["auth_token"];
  const decodeCookie = jwt_decode(cookie);
  const userID = decodeCookie.sub;

  User.findById(userID, (err, user) => {
    if (err) console.log(err);

    res.json(user);
  });
});

module.exports = profileRouter;
