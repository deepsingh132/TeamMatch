const router = require("express").Router();
const User = require("../models/User");
const Team = require("../models/Team");
//Create Team
router.post("/:id", async (req, res) => {
  const newTeam = new Team(req.body);
  try {
    const savedTeam = await newTeam.save();
    res.status(200).json(savedTeam);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Updates a team
router.put("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team.username == req.body.username) {
      try {
        const updatedTeam = await Team.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedTeam);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your own team!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Deletes a team

router.delete("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team.username == req.body.username) {
      try {
        await team.delete();
        res.status(200).json("Team Deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your own team!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all teams
router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let teams;
    if (username) {
      teams = await Team.find({ username });
    } else {
      teams = await Team.find();
    }
    res.status(200).json(teams);
    console.log(await Team.countDocuments({username}));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
