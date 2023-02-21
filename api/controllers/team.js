import Team from "../models/Team.js";
import multer from "multer";
import sharp from "sharp";

// Create Team
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576, // 1MB limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      cb(new Error("Only PNG, JPG and JPEG files are allowed!"), false);
    } else {
      cb(null, true);
    }
  },
}).single("img");

export const createTeam = async(req, res) => {
  upload(req, res, async (err) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    const teamMemberData = {
      username: req.body.username,
      fullName: req.body.fullName,
      teamName: req.body.teamName,
      designation: req.body.designation,
      skills: req.body.skills,
      experience: req.body.experience,
    };


    if (req.file) { //Optional pfp upload of team member
      const buffer = await sharp(req.file.buffer)
      .resize({width: 500, height: 500, fit: "inside"})
      .jpeg({ quality: 65 })
      .toBuffer();

      if (buffer.length > 1048576) {
        return res
          .status(400)
          .send({ error: "Image is too large, max file size allowed is 1MB" });
      }

      teamMemberData.img = {
        data: buffer,
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
  upload(req, res, async (err) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    const teamMemberData = {
      username: req.body.username,
      fullName: req.body.fullName,
      teamName: req.body.teamName,
      designation: req.body.designation,
      skills: req.body.skills,
      experience: req.body.experience,
    };


    if (req.file) { //Optional pfp upload of team member
      const buffer = await sharp(req.file.buffer)
      .resize({width: 800, height: 800, fit: "inside"})
      .jpeg({ quality: 65 })
      .toBuffer();

      if (buffer.length > 1048576) {
        return res
          .status(400)
          .send({ error: "Image is too large, max file size allowed is 1MB" });
      }

      teamMemberData.img = {
        data: buffer,
        contentType: req.file.mimetype,
      };
    }

    try {
      const team = await Team.findById(req.params.id);

      if (team.username == teamMemberData.username) {
        try {
          const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            {
              $set: teamMemberData,
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
    } catch (err) {
      res.status(500).json(err);
    }
  }

export default Team;