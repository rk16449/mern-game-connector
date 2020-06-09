const mongoose = require("mongoose");

const CPU_CoolerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  fan_rpm: {
    type: String,
  },
  noise_level: {
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

module.exports = CPU_Cooler = mongoose.model("cpu_cooler", CPU_CoolerSchema);
