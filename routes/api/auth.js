const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// @route GET api/auth
// @desc Gets the auth
// @access Protected
router.get("/", auth, async (req, res) => {
  try {
    // get the user object, without its password from the database
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // logging incoming data
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors, then respond with a bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if the user exists
      let user = await User.findOne({ email }); // request to the database

      // If it does exist, send back an error, since can't create duplicate user
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      console.log("user password:" + user.password);
      // Check that this users password matches
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Otherwise we have a correct user

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000000 },
        // In the call back we either get the error or token
        (err, token) => {
          // check for the error
          if (err) throw err;

          // 200 response, send the token back
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
