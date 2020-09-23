const mongoose = require("mongoose");
const String = mongoose.SchemaTypes.String;
const bcrypt = require("bcrypt");

//users collection
let userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    default: "",
    required: true,
  },
  lastName: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    default: "",
    required: true,
  },
  username: {
    type: String,
    default: "",
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  phone: {
    type: String,
    default: "",
    required: true,
  },
  street: {
    type: String,
    default: "",
    required: true,
  },
  appartment: {
    type: String,
    default: "",
    required: true,
  },
  city: {
    type: String,
    default: "",
    required: true,
  },
  zipcode: {
    type: String,
    default: "",
    required: true,
  },
  companyName: {
    type: String,
    default: "",
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, passwordMatch) => {
    if (err) {
      return cb(err);
    } else {
      if (!passwordMatch) return cb(null, passwordMatch);

      return cb(null, this);
    }
  });
};

//export DB Schema
module.exports = mongoose.model("User", userSchema);
