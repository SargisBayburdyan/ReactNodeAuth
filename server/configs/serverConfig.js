require("dotenv").config();

//Server listening on port
exports.PORT = process.env.PORT || 5000;

//Client URL
exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_ORIGIN
    : "http://localhost:3000/#";

//Database URL
exports.AppBayDB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.AppBayDB_URL
    : `mongodb+srv://AppBay:${process.env.DBPASSWORD}@appbay-txmlb.mongodb.net/AppBayDB?retryWrites=true&w=majority`;
