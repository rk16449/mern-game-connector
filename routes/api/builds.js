const express = require("express");
const router = express.Router();
const CPU = require("../../models/CPU");
const CPU_Cooler = require("../../models/CPU_Cooler");
const auth = require("../../middleware/auth");
const SaveBuild = require("../../models/SaveBuild");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

router.get("/cpu", async (req, res) => {
  try {
    const cpus = await CPU.find();
    res.json(cpus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/cpu_cooler", async (req, res) => {
  try {
    const cpus = await CPU_Cooler.find();
    res.json(cpus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/components/:user
// @desc Load the builds for the user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    let builds = await SaveBuild.find({
      user: req.user.id,
    });

    return res.json(builds);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/load/:name", auth, async (req, res) => {
  try {
    const save_name = req.params.name;
    const user = req.user.id;

    // With these values, find the load file on the server.
    let saveFile = await SaveBuild.findOne({
      user,
      save_name,
    });

    // A save file exists
    if (saveFile) {
      console.log("a save file exists.. it is: ");
      console.log(JSON.stringify(saveFile));
      return res.json(saveFile);
    }

    return res.json("Null");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/components/
// @desc Save a build for the user
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("save_name", "Save Name is required").not().isEmpty(),
      check("components", "Components is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Are there errors? Output an errors array
    if (!errors.isEmpty()) {
      console.log("Error occured");
      return res.status(400).json({ errors: errors.array() });
    }

    // Otherwise successfull request was sent
    // Pull out all the fields from the req
    const { save_name, components } = req.body;

    // Build a save_component object
    const componentFields = {};
    componentFields.user = req.user.id;
    componentFields.save_name = save_name;
    componentFields.components = components;

    try {
      // Does this save_file exist?
      let saveBuild = await SaveBuild.findOne({
        user: req.user.id,
        save_name,
      });

      // The save file exists... so update it instead
      if (saveBuild) {
        console.log("save file exists so update it instead...");

        saveBuild = await SaveBuild.findOneAndUpdate(
          { user: req.user.id },
          { $set: componentFields },
          { new: true }
        );

        return res.json("updated");
      } else {
        // Otherwise create the profile object
        saveBuild = new SaveBuild(componentFields);

        // Create it on the database
        await saveBuild.save();
        // Return it back
        res.json(saveBuild);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
