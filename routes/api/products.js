const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Product = require("../../models/Product");

// @route GET api/products
// @desc Get products from db
// @access Public
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    return res.json(products);
  } catch (err) {
    console.log(err.message);
    res.send("Server Error");
  }
});

module.exports = router;
