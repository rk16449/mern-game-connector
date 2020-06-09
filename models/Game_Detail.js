// Store favourite games of the users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameDetailSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  steam_appid: {
    type: String,
    required: true,
  },
  required_age: {
    type: Number,
    required: false,
  },
  is_free: {
    type: Boolean,
    required: false,
  },
  controller_support: {
    type: String,
    required: false,
  },
  dlc: {
    type: Array,
    required: false,
  },
  detailed_description: {
    type: String,
    required: false,
  },
  about_the_game: {
    type: String,
    required: false,
  },
  short_description: {
    type: String,
    required: false,
  },
  supported_languages: {
    type: String,
    required: false,
  },
  header_image: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  pc_requirements: {
    minimum: {
      type: String,
      required: false,
    },
    recommended: {
      type: String,
      required: false,
    },
  },
});

module.exports = Game_Detail = mongoose.model("game_detail", GameDetailSchema);
