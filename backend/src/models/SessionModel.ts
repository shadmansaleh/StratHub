const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Session", SessionSchema);
