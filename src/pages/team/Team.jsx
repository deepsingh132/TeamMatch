import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import Success from "../lottie/Success";

const Team = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, selectedEmployee, selectedEmployeeID } = location.state;

  const id = selectedEmployeeID;

  const isUpdating =
    new URLSearchParams(location.search).get("update") === "true";

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (formData) => {
    try {
      if (isUpdating) {
        console.log(formData);
        await axios.put(`/teams/${id}?update=true`, formData); // Use PUT method for updating
        setSuccessMessage("Team member updated successfully!");
        setTimeout(() => navigate("/"), 1000); // Navigate after 1 seconds
      } else {
        await axios.post("/teams/:id", formData); // Use POST method for creating
        setSuccessMessage("Team member created successfully!");
        setTimeout(() => navigate("/"), 1000); // Navigate after 1 seconds
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    const deleteData = {
      username: username,
    };
    try {
      await axios.delete(`/teams/${id}`, { data: deleteData });
      setSuccessMessage("Team member deleted successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isUpdating ? (
        <UpdateForm
          onSubmit={handleSubmit}
          onDelete={onDelete}
          username={username}
          selectedEmployee={selectedEmployee}
        />
      ) : (
        <CreateForm onSubmit={handleSubmit} username={username} />
      )}
      {successMessage && <Success msg={successMessage} />}
    </>
  );
};

export default Team;
