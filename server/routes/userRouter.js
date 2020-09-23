require("dotenv").config();
const Measurement = require("../database/Measurement");
var express = require("express");
var userRouter = express.Router();

userRouter.get("/temperature", (req, res) => {
  Measurement.find({}, (err, tempData) => {
    res.json(tempData);
  }).catch((err) => console.log(err));
});

module.exports = userRouter;
