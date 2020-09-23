require("dotenv").config();
const Project = require("../database/Project");
const mongoose = require("mongoose");
var express = require("express");
const jwt_decode = require("jwt-decode");
var projectRouter = express.Router();

projectRouter.get("/list", (req, res) => {
  const cookie = req.cookies["auth_token"];
  const decodeCookie = jwt_decode(cookie);
  const userID = decodeCookie.sub;

  Project.find({ userID: userID }, (err, project) => {
    if (err) console.log(err);

    res.json(project);
  });
});

projectRouter.post("/create", (req, res) => {
  const cookie = req.cookies["auth_token"];
  const decodeCookie = jwt_decode(cookie);
  const userID = decodeCookie.sub;
  const projectName = req.body.projectName;
  console.log(projectName);

  const projectData = new Project({
    _id: new mongoose.Types.ObjectId(),
    name: projectName,
    userID: userID,
    active: false,
  });

  console.log(projectName);

  Project.findOne({ name: projectName })
    .then((project) => {
      if (!project) {
        Project.create(projectData);
      }
    })
    .then(() => {
      res.json("Good");
    })
    .catch((err) => console.log(err));
});

module.exports = projectRouter;
