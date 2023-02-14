import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    img:{
      data: Buffer,
      required: false,
      contentType: String
    },
    fullName: {
        type: String,
        required: true
      },
      teamName: {
        type: String,
        required: true
      },
      designation: {
        type: String,
        required: true
      },
      skills: [
        {
          type: String,
          required: true
        }
      ],
      experience: {
        type: Number,
        required: false
      },
    },
    { timestamps: true}
);

const TeamMemberModel = mongoose.model("Teams", TeamMemberSchema);

export default TeamMemberModel;