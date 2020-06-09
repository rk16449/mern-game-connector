// Store favourite games of the users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  appid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  header_image: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  categories: [
    {
      id: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  genres: [
    {
      id: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Game = mongoose.model("game", GameSchema);
