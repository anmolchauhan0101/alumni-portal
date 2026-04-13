const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  skills: {
    type: [String],
    default: []
  },

  company: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", userSchema);
