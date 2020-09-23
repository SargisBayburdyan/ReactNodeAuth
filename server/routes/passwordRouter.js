require("dotenv").config();
var express = require("express");
var passwordRouter = express.Router();
const User = require("../database/User");
const sendEmail = require("../email/senEmailToClient");
const { AppBayDB_URL } = require("../configs/serverConfig");
const templates = require("../forms/resetPassForm");
const assert = require("assert");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

passwordRouter.post(
  "/reset/:id",
  (resetPassword = (req, res) => {
    const { id } = req.params;
    const password = req.body.password;

    User.findById(id)
      .then((user) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            user.password = hash;

            newPassword = hash;

            mongoose.connect(
              AppBayDB_URL,
              {
                useUnifiedTopology: true,
                useCreateIndex: true,
                useNewUrlParser: true,
              },
              function (err, db) {
                try {
                  assert.equal(null, err);
                  User.findById(id).updateOne(
                    { _id: id },
                    { $set: { password: newPassword } },

                    function (err, result) {
                      assert.equal(null, err);
                      res.json({ status: 200 });
                      console.log("Passwort zurückgesetzt");
                    }
                  );
                } catch (err) {
                  console.log(err);
                }
              }
            );
          }
        });
      })

      .catch((err) => console.log(err));
  })
);

passwordRouter.post(
  "/email",
  (this.emailCheck = (req, res) => {
    const checkEmail = req.body.checkEmail;

    mongoose.connect(
      AppBayDB_URL,
      {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      },
      function (err, db) {
        try {
          db.collection("users")

            //email: checkEmail
            .findOne({ email: checkEmail })
            .then((user) => {
              if (user) {
                sendEmail(
                  user.email,
                  templates.confirm(user._id)
                ).catch((err) => console.log(err));
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    );
  })
);

passwordRouter.post(
  "getreset/:id",
  (this.emailConfirmed = (req, res) => {
    const { id } = req.params;
  })
);

module.exports = passwordRouter;
