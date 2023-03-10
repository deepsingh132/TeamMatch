import React, { useState } from "react";
import "./team.css";
import { Buffer } from "buffer";

import {
  FULLNAME_INITIAL_STATE,
  TEAMNAME_INITIAL_STATE,
  DESIGNATION_INITIAL_STATE,
  SKILLS_INITIAL_STATE,
  EXPERIENCE_INITIAL_STATE,
  IMG_INITIAL_STATE,
} from "../../constants/constants";

const CreateForm = (props) => {


  const username = props.username;

  const [fullName, setFullName] = useState(FULLNAME_INITIAL_STATE);
  const [teamName, setTeamName] = useState(TEAMNAME_INITIAL_STATE);
  const [designation, setDesignation] = useState(DESIGNATION_INITIAL_STATE);
  const [skills, setSkills] = useState(SKILLS_INITIAL_STATE);
  const [experience, setExperience] = useState(EXPERIENCE_INITIAL_STATE);
  const [img, setImg] = useState(IMG_INITIAL_STATE);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("teamName", teamName);
    formData.append("designation", designation);
    formData.append("skills", skills);
    formData.append("experience", experience);
    props.onSubmit(formData);
  };

  const validateImage = (file) => {
    if (!file) {
      return { valid: false, message: "No file selected" };
    }
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      return { valid: false, message: "Only JPG and PNG files are allowed!" };
    }
    if (file.size > 1048576) {
      return { valid: false, message: "File size should not exceed 1MB!" };
    }
    return { valid: true };
  };

 const handleImgChange = (e) => {
   const selectedFile = e.target.files[0];
   const reader = new FileReader();

   const validation = validateImage(selectedFile);
   if (validation.valid) {
     reader.onload = () => {
       const buffer = Buffer.from(reader.result);
       setImg(buffer);
     };
     reader.readAsArrayBuffer(selectedFile);
   } else {
     setImg(null);
     alert(validation.message);
     e.target.value = null; // Reset file input value to empty string
     return;
   }
   setImg(null);
 };

  return (
    <div className="form">
      <span className="registerTitle">Create Member</span>
      <form className="registerForm" onSubmit={onSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          className="registerInput"
          placeholder="Enter name"
          required
          onChange={(e) => setFullName(e.target.value)}
        />
        <label>Team Name</label>
        <select
          value={teamName}
          className="registerInput"
          required
          onChange={(e) => setTeamName(e.target.value)}
        >
          <option value="A">Team A</option>
          <option value="B">Team B</option>
          <option value="C">Team C</option>
          <option value="D">Team D</option>
        </select>

        <label>Designation</label>
        <input
          type="text"
          value={designation}
          className="registerInput"
          placeholder="Enter designation"
          required
          onChange={(e) => setDesignation(e.target.value)}
        />

        <label>Skills</label>
        <input
          type="text"
          value={skills}
          className="registerInput"
          placeholder="Enter skills"
          required
          onChange={(e) => setSkills(e.target.value)}
        />

        <label>Experience (in years)</label>
        <input
          type="number"
          value={experience}
          className="registerInput"
          placeholder="Enter experience"
          min="0"
          step="0.5"
          onChange={(e) => setExperience(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <label
            htmlFor="fileInput"
            style={{ flexBasis: "40%", marginRight: "10px" }}
          >
            Employee Image:
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            name="img"
            onChange={(e) => {
              handleImgChange(e);
            }}
          />
        </div>

        <button className="teamBtn" type="submit">
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
