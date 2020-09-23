require("dotenv").config();
var express = require("express");
var authRouter = express.Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const passConfig = require("../auth/authUser");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: process.env.AUTHTOKEN,
      sub: userID,
    },
    process.env.AUTHTOKEN,
    { expiresIn: "1h" }
  );
};

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("auth_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

authRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("auth_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

authRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin", msgError: false } });
    } else
      res.status(403).json({
        message: { msgBody: "You're not an admin", msgError: true },
      });
  }
);

authRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = authRouter;
