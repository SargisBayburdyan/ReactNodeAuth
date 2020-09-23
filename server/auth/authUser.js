require("dotenv").config();
const User = require("../database/User");
const express = require("express");
const LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["auth_token"];
  }
  return token;
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.AUTHTOKEN,
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else return done(null, false);
      });
    }
  )
);

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "Falscher Benutzername oder falsches Passwort.",
        });
      }
      //check password to DB
      user.comparePassword(password, done);
    });
  })
);
