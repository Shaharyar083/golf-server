const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  voucher: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model("user", schema);
