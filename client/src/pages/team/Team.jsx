import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import { SUCCESS_INITIAL_STATE } from "../../constants/constants";
import Success from "../lottie/Success";

const Team = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, selectedEmployee, selectedEmployeeID} = location.state;

  const id = selectedEmployeeID;

  const isUpdating =
    new URLSearchParams(location.search).get("update") === "true";

  const [success, setSuccess] = useState(SUCCESS_INITIAL_STATE);

  const handleSubmit = async (formData) => {
    try {
      if (isUpdating) {
        console.log(formData);
        const res = await axios.put(
          `/teams/${id}?update=true`,formData
        ); // Use PUT method for updating
        console.log(res.data);
        setSuccess(true);
        setTimeout(() => navigate("/"), 3000); // Navigate after 3 seconds
      } else {
        console.log(formData);
        const res = await axios.post("/teams/:id", formData); // Use POST method for creating
        console.log(res.data);
        setSuccess(true);
        setTimeout(() => navigate("/"), 3000); // Navigate after 3 seconds
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isUpdating ? (
        <UpdateForm onSubmit={handleSubmit} username={username} selectedEmployee={selectedEmployee}/>
      ) : (
        <CreateForm onSubmit={handleSubmit} username={username} />
      )}
      {success && (
        <div className="registerSuccess">
          <div className="successCard">
            {<Success />}
            <h2>
              Team member {isUpdating ? "updated" : "created"} successfully
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Team;
