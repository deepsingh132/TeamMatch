import React, { useState, useEffect } from "react";
import "./home.css";
import Header from "../header/Header";
import Employees from "../team/Employees";
import Lottie from "lottie-react";
import axios from "axios";
import loading from "../../anim/loading.json";

const Home = ({ currentUser }) => {
  const [selectedTeam, setTeam] = useState(
    JSON.parse(localStorage.getItem("selectedTeam")) || "TeamB"
  );

  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employeeList")) || []
  );

  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const username = currentUser.username;
  console.log(username);
  console.log(selectedTeam);

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem("employeeList"));

    if (cachedData) {
      setIsLoading(false);
      console.log("Data loaded from local storage");
      setEmployees(cachedData);
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `/teams?user=${username}&teamName=${selectedTeam}`
          );
          console.log(response.data);
          setEmployees(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [username, selectedTeam]);

  useEffect(() => {
    localStorage.setItem("employeeList", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  function handleTeamSelectionChange(event) {
    setTeam(event.target.value);
  }

  function handleEmployeeCardClick(event) {
    const transformedEmployees = employees.map((employee) =>
      employee.id === parseInt(event.currentTarget.id)
        ? employee.teamName === selectedTeam
          ? { ...employee, teamName: "" }
          : { ...employee, teamName: selectedTeam }
        : employee
    );
    setEmployees(transformedEmployees);
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
            teams={teams}
          />
        </>
      )}
    </div>
  );
};

export default Home;
