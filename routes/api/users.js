// handle registering users etc
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Enter a password with 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // logging incoming data
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors, then respond with a bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if the user exists
      let user = await User.findOne({ email });

      // If it does exist, send back an error, since can't create duplicate user
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm", // default image
      });

      // Create a user
      user = new User({
        name,
        email,
        password,
        avatar,
      });

      // Encrypt password, create a salt with 10 rounds
      const salt = await bcrypt.genSalt(10);

      // take the password and hash it with salt
      user.password = await bcrypt.hash(password, salt);

      // save to the database
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
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
