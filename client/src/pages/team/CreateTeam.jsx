import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import "./createTeam.css";

const CreateTeam = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [teamName, setTeamName] = useState("A");
  const [designation, setDesignation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState(0);
  const [img, setImg] = useState(null);
  // const [setLoading, setIsLoading] = useState(false);
  // const [setSuccess, setIsSuccess] = useState(false);
  // const [setError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setSuccess(false);
    // setError(false);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("teamName", teamName);
    formData.append("designation", designation);
    formData.append("skills", skills);
    formData.append("experience", experience);
    if (img) {
      formData.append("img", img);
    }
    try {
      const res = await axios.post("/teams/:id", formData);
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      //setError(true);
    }
  };

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <div className="register">
      <span className="registerTitle">Create Team</span>
      <form className="registerForm" onSubmit={handleSubmit}>
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

        <label>Employee Image</label>
        <input type="file" accept="image/*" onChange={handleImgChange} />

        <button className="createTeambtn" type="submit">
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
