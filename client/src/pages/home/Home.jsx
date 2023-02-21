import React, { useState, useEffect } from "react";
import "./home.css";
import Header from "../header/Header";
import Employees from "../team/Employees";
import Lottie from "lottie-react";
import axios from "axios";
import loading from "../../anim/loading.json";
import { useNavigate } from "react-router-dom";

const Home = ({ currentUser }) => {
  const [selectedTeam, setTeam] = useState(
    JSON.parse(localStorage.getItem("selectedTeam")) || "A"
  );

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const username = currentUser.username;

  const navigate = useNavigate();

  useEffect(() => {
    let cachedData = JSON.parse(localStorage.getItem("employeeList"));
    let loadedFromCache = false;

    if (cachedData) {
      loadedFromCache = true;
      setIsLoading(false);
      setEmployees(cachedData);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/teams?user=${username}&teamName=${selectedTeam}`
        );
        setEmployees(response.data);
        setIsLoading(false);

        if (!loadedFromCache) {
          localStorage.setItem("employeeList", JSON.stringify(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [username, selectedTeam]);

  function handleTeamSelectionChange(event) {
    setTeam(event.target.value);
  }

  function handleEmployeeCardClick(selectedEmployee) {
    navigate("/updateteam?update=true", {
      state: {
        username: username,
        selectedEmployee: selectedEmployee,
        selectedEmployeeID: selectedEmployee._id
      }
    });
  }

  return (
    <div className="Container">
      {isLoading ? (
        <div className="loadingAnimation">
          <Lottie
            animationData={loading}
            style={{ width: 200, height: 200 }}
            autoPlay={true}
            loop={true}
          />
        </div>
      ) : (
        <>
          <Header
            selectedTeam={selectedTeam}
            teamMemberCount={
              employees.filter((employee) => employee.teamName === selectedTeam)
                .length
            }
          />

          <Employees
            employees={employees}
            selectedTeam={selectedTeam}
            handleEmployeeCardClick={handleEmployeeCardClick}
            handleTeamSelectionChange={handleTeamSelectionChange}
            username={username}
          />
        </>
      )}
    </div>
  );
};

export default Home;
