require("dotenv").config();
const User = require("../database/User");
var express = require("express");
const mongoose = require("mongoose");
const { AppBayDB_URL } = require("../configs/serverConfig");
const assert = require("assert");
var mediaRouter = express.Router();

mediaRouter.post("/upload", (req, res) => {
  console.log(req.body.isLoading);
});
module.exports = mediaRouter;
