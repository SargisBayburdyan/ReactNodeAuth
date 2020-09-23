"use stict";
require("dotenv").config();
const nodemailer = require("nodemailer");

const credentials = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASSWORD,
  },
};
const transporter = nodemailer.createTransport(credentials);

module.exports = async (to, content) => {
  const contacts = {
    from: process.env.EMAILUSER,
    to,
  };

  const email = Object.assign({}, content, contacts);

  async function main() {
    try {
      var mail = await transporter.sendMail(email);
      console.log("Email sent");
    } catch (error) {
      console.log(error);
    }
  }
  main();
};
