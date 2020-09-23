const mongoose = require("mongoose");

let projectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Project", projectSchema);
