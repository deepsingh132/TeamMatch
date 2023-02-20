import React, { useEffect, useState } from "react";
import "./Team.css";
import { Buffer } from "buffer";

import {
  FULLNAME_INITIAL_STATE,
  TEAMNAME_INITIAL_STATE,
  DESIGNATION_INITIAL_STATE,
  SKILLS_INITIAL_STATE,
  EXPERIENCE_INITIAL_STATE,
  IMG_INITIAL_STATE,
} from "../../constants/constants";

const UpdateForm = (props) => {
  const { selectedEmployee, username } = props;
  //const username = props.username;
  console.log(props.username);

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
    formData.append("img", img);
    // if (img) {
    //   formData.append("img", img);
    // }
    props.onSubmit(formData);

    console.log(formData);
    console.log(formData.get('img'));

  };

  const handleImgChange = (e) => {
    const selectedFile = e.target.files[0];
     const reader = new FileReader();
    if (!selectedFile) {
      setImg(null);
      return;
    }
    if (
      selectedFile.type !== "image/jpeg" &&
      selectedFile.type !== "image/png"
    ) {
      alert("Only JPG and PNG files are allowed!");
      setImg(null);
      return;
    }
    if (selectedFile.size > 1048576) {
      alert("File size should not exceed 1MB!");
      setImg(null);
      return;
    }

    reader.onload = () => {
      const buffer = Buffer.from(reader.result);
      setImg(buffer);
    };
    reader.readAsArrayBuffer(selectedFile);

  };

  useEffect(() => {
    if (selectedEmployee) {
      setFullName(selectedEmployee.fullName);
      setTeamName(selectedEmployee.teamName);
      setDesignation(selectedEmployee.designation);
      setSkills(selectedEmployee.skills);
      setExperience(selectedEmployee.experience);
      setImg(selectedEmployee.img)
    }
  }, [selectedEmployee]);

  return (
    <div className="register">
      <span className="registerTitle">Update Member</span>
      <form className="registerForm"
      onSubmit={onSubmit}
      >
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
            name="img"
            onChange={(e) => {
              handleImgChange(e);
            }}
          />
        </div>

        <button className="createTeambtn" type="submit">
          Update Team
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
