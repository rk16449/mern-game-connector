const mongoose = require("mongoose");

const CPUSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  cores: {
    type: String,
  },
  core_clock: {
    type: String,
  },
  boosted_clock: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  currency: {
    type: String,
  },
  website: {
    type: String,
  },
  price_combined: {
    type: String,
  },
  url: {
    type: String,
  },
  image_url: {
    type: String,
  },
});

module.exports = CPU = mongoose.model("cpu", CPUSchema);
