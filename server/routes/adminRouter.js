require("dotenv").config();
const User = require("../database/User");
var express = require("express");
const mongoose = require("mongoose");
const { AppBayDB_URL } = require("../configs/serverConfig");
const assert = require("assert");
var adminRouter = express.Router();

adminRouter.get("/allusersactive", (req, res) => {
  User.find({ active: true }, (err, users) => {
    res.json(users);
  }).catch((err) => console.log(err));
});

adminRouter.get("/allusersinactive", (req, res) => {
  User.find({ active: false }, (err, users) => {
    res.json(users);
  }).catch((err) => console.log(err));
});

adminRouter.post("/userinactive", (req, res) => {
  const email = req.body.email;

  mongoose.connect(
    AppBayDB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err, db) => {
      try {
        assert.equal(null, err);

        db.collection("users").updateOne(
          { email: email },
          { $set: { active: false } },

          (err, result) => {
            assert.equal(null, err);
            console.log("user inaktiv");
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  );
  res.json({
    message: { msgBody: "user inaktiv" },
  });
});

adminRouter.post("/useractive", (req, res) => {
  const email = req.body.email;

  mongoose.connect(
    AppBayDB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err, db) => {
      try {
        assert.equal(null, err);

        db.collection("users").updateOne(
          { email: email },
          { $set: { active: true } },

          (err, result) => {
            assert.equal(null, err);
            console.log("user aktiv");
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  );
  res.json({
    message: { msgBody: "user aktiv" },
  });
});

adminRouter.post("/deleteuser", (req, res) => {
  const email = req.body.email;

  mongoose.connect(
    AppBayDB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err, db) => {
      try {
        assert.equal(null, err);

        db.collection("users").deleteOne({ email: email }, (err, result) => {
          assert.equal(null, err);
          console.log("user gelöscht");
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
  res.json({
    message: { msgBody: "user gelöscht" },
  });
});

module.exports = adminRouter;
