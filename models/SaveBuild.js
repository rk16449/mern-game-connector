const mongoose = require("mongoose");

const SaveBuildSchema = new mongoose.Schema({
  // Connect it to an _id field in the user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // reference to the model we are talking about, the user model
    ref: "user",
  },
  save_name: {
    type: String,
    required: true,
  },
  components: [
    {
      type: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      website: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      image_url: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = SaveBuild = mongoose.model("savebuild", SaveBuildSchema);
