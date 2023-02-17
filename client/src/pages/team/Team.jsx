import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeamForm from "./TeamForm";
import {
  SUCCESS_INITIAL_STATE,
} from "../../constants/constants";
import Success from "../lottie/Success";

const Team = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(SUCCESS_INITIAL_STATE);

  const handleSubmit = async (formData) => {

    try {
      const res = await axios.post("/teams/:id", formData);
      console.log(res.data);
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000); // Navigate after 3 seconds
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>
      <TeamForm onSubmit={handleSubmit}/>
      {success && (
        <div className="registerSuccess">
          <div className="successCard">
            {<Success />}
            <h2>Team member created successfully</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Team;
