const request = require("request");
const express = require("express");
const router = express.Router();
const Game = require("../../models/Game");
const Game_Detail = require("../../models/Game_Detail");

// @route GET api/steam
// @desc Get all the steam games
// @access Public

// @route GET api/components/:user
// @desc Load the builds for the user
// @access Private
router.get("/", async (req, res) => {
  try {
    let games = await Game.find();
    return res.json(games);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/steam/:appid
// @desc Get description of a steam game via appid
// @access Public
router.get("/:appid", async (req, res) => {
  try {
    let app_id = req.params.appid;

    let game = await Game_Detail.findOne({
      steam_appid: app_id,
    });

    return res.json(game);
    // Look into the database for this id
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
