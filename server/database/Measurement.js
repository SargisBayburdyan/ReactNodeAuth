const mongoose = require("mongoose");

let measurementSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  temperature: {
    type: Number,
    min: -20,
    nxa: +10,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Measurement", measurementSchema);
