import Team from "../models/Team.js";
import multer from "multer";

// Create Team
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("img");

export const createTeam = async(req, res) => {
    upload(req, res, async (err) => {
    const teamMemberData = {
      username: req.body.username,
      fullName: req.body.fullName,
      teamName: req.body.teamName,
      designation: req.body.designation,
      skills: req.body.skills,
      experience: req.body.experience,
    };

    if (req.file) { //Optional pfp upload of team member
      teamMemberData.img = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const teamMember = new Team(teamMemberData);
    try{
      await teamMember.save();
      res.status(200).send("Team member created successfully!");
    } catch(err) {
      console.error(err);
      res.status(500).json({error: "Something went wrong, please try again"});
    }
    });
}

export const updateTeam =  async (req, res) => {
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
  }

  export const deleteTeam = async (req, res) => {
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
  }

  export const getTeam = async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);
      res.status(200).json(team);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getTeams = async (req, res) => {
    const username = req.query.user;
    try {
      let teams;
      if (username) {
        teams = await Team.find({ username });
      } else {
        teams = await Team.find();
      }
      res.status(200).json(teams);
      console.log(await Team.countDocuments({ username }));
    } catch (err) {
      res.status(500).json(err);
    }
  }

export default Team;