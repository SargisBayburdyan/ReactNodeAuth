const User = require("../database/User");
const express = require("express");
const mongoose = require("mongoose");
const sendEmail = require("../email/senEmailToClient");
const msgs = require("../notifications/newUserNotifications");
const templates = require("../forms/signupForm");
const bcrypt = require("bcrypt");

exports.createNewUser = (req, res) => {
  const userData = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    companyName: req.body.companyName,
    phone: req.body.phone,
    street: req.body.street,
    appartment: req.body.appartment,
    zipcode: req.body.zipcode,
    city: req.body.city,
  });

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)

            .then((user) => sendEmail(user.email, templates.confirm(user._id)))
            .then(() => res.json({ msg: msgs.bestaetigen }))
            .catch((err) => console.log(err));
        });
      } else if (user && !user.confirmed) {
        sendEmail(user.email, templates.confirm(user._id)).then(() =>
          res.json({ msg: msgs.erneutsenden })
        );
      } else {
        res.json({ msg: msgs.schonbestaetigt });
      }
    })
    .catch((err) => console.log(err));
};
