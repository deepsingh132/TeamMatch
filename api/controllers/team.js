import Team from "../models/Team.js";
import multer from "multer";
import sharp from "sharp";
import formidable from "formidable";

// Create Team
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10485760,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Only images allowed"));
    }
    cb(undefined, true);
  },
}).single("img");

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
      const buffer = await sharp(req.file.buffer)
      .resize({width: 800, height: 800, fit: "inside"})
      .jpeg({ quality: 65 })
      .toBuffer();

      if (buffer.length > 10485760) {
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
const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 10485760, // 1MB limit
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

export const updateTeam =  async (req, res) => {
  uploads(req, res, async (err) => {

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

      if (buffer.length > 10485760) {
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
      console.log(req.params.id);
      console.log(req.body.username);
      console.log(req.body);

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

// export const updateTeam = async (req, res) => {
//   try {
//     const form = formidable();
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(400).json({ error: err.message });
//       }

//       const teamMemberData = {
//         username: fields.username,
//         fullName: fields.fullName,
//         teamName: fields.teamName,
//         designation: fields.designation,
//         skills: fields.skills,
//         experience: fields.experience,
//       };
//       console.log(fields);
//       console.log(teamMemberData);

//       if (files.img) {
//         const buffer = await sharp(files.img.path)
//           .resize({ width: 800, height: 800, fit: "inside" })
//           .jpeg({ quality: 65 })
//           .toBuffer();

//         if (buffer.length > 1048576) {
//           return res
//             .status(400)
//             .send({
//               error: "Image is too large, max file size allowed is 1MB",
//             });
//         }

//         teamMemberData.img = {
//           data: buffer,
//           contentType: files.img.type,
//         };
//       }

//       const team = await Team.findById(req.params.id);
//       console.log(fields.username);
//       if (team.username == teamMemberData.username) {
//         try {
//           const updatedTeam = await Team.findByIdAndUpdate(
//             req.params.id,
//             teamMemberData,
//             { new: true }
//           );
//           res.status(200).json(updatedTeam);
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       } else {
//         res.status(401).json("You can update only your own team!");
//       }
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };


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