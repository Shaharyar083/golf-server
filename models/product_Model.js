const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  dexterity: {
    type: String,
  },
  club_number: {
    type: String,
  },
  shaft_brand: {
    type: String,
  },
  shaft_model: {
    type: String,
  },
  sst_pure_service: {
    type: String,
  },
  playing_length_6i: {
    type: String,
  },
  lie_6i: {
    type: String,
  },
  loft_6i: {
    type: String,
  },
  grip_brand: {
    type: String,
  },
  grip_model: {
    type: String,
  },
  extra_wrap: {
    type: String,
  },
  grip_logo: {
    type: String,
  },
  images: [{ type: Object }],
});

module.exports = mongoose.model("product", schema);
