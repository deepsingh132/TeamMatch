import React, { useState } from "react";

import "./Team.css";

import {
  USERNAME_INITIAL_STATE,
  FULLNAME_INITIAL_STATE,
  TEAMNAME_INITIAL_STATE,
  DESIGNATION_INITIAL_STATE,
  SKILLS_INITIAL_STATE,
  EXPERIENCE_INITIAL_STATE,
  IMG_INITIAL_STATE,
} from "../../constants/constants";

const TeamForm = (props) => {


  const [username, setUsername] = useState(USERNAME_INITIAL_STATE);
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
    if (img) {
      formData.append("img", img);
    }
    props.onSubmit(formData);
  };

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };




  return (
    <div className="register">
      <span className="registerTitle">Create Team</span>
      <form className="registerForm" onSubmit={onSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          className="registerInput"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          className="registerInput"
          placeholder="Enter name"
          onChange={(e) => setFullName(e.target.value)}
        />
        <label>Team Name</label>
        <select
          value={teamName}
          className="registerInput"
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
          onChange={(e) => setDesignation(e.target.value)}
        />

        <label>Skills</label>
        <input
          type="text"
          value={skills}
          className="registerInput"
          placeholder="Enter skills"
          onChange={(e) => setSkills(e.target.value)}
        />

        <label>Experience (in years)</label>
        <input
          type="number"
          value={experience}
          className="registerInput"
          placeholder="Enter experience"
          min="0"
          step="0.1"
          onChange={(e) => setExperience(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label htmlFor="fileInput" style={{ flexBasis: "40%" }}>
            Employee Image:
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            name="fileInput"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (!selectedFile) {
                return;
              }
              if (
                selectedFile.type !== "image/jpeg" &&
                selectedFile.type !== "image/png"
              ) {
                alert("Only JPG and PNG files are allowed!");
                e.target.value = null;
                return;
              }
              if (selectedFile.size > 1048576) {
                alert("File size should not exceed 1MB!");
                e.target.value = null;
                return;
              }
              handleImgChange(e);
            }}
          />
        </div>

        <button className="createTeambtn" type="submit">
          Create Team
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
