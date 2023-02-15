import React , { useState, useEffect } from 'react';
import "./home.css";
import Header from '../header/Header';
import Employees from '../Employees';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const Home = ({ currentUser }) => {

    const [selectedTeam, setTeam] = useState(JSON.parse(localStorage.getItem('selectedTeam')) || "TeamB");
    const [employees, setEmployees] = useState([]);
    const [teams, setTeams] = useState([]);

  const username = currentUser.username;
  console.log(username);
  console.log(selectedTeam);

    useEffect(() => {
       const fetchData = async () => {
        try{
            const response = await axios.get(`/teams?user=${username}&teamName=${selectedTeam}`);
            console.log(response.data);
            setEmployees(response.data);
        } catch(error) {
            console.log(error);
          }
        }
        fetchData();
      }, [username, selectedTeam]);

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get('/teams');
    //         setTeams(response.data);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };
    //     fetchData();
    //   }, []);


  useEffect(() => {

    localStorage.setItem('employeeList', JSON.stringify(employees));

  }, [employees]);

  useEffect(() => {

    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam));

  }, [selectedTeam]);


  function handleTeamSelectionChange(event) {
    setTeam(event.target.value);
  }
  function handleEmployeeCardClick(event) {
    const transformedEmployees = employees.map((employee) => employee.id === parseInt(event.currentTarget.id)
      ? (employee.teamName === selectedTeam) ? { ...employee, teamName: '' } : { ...employee, teamName: selectedTeam }
      : employee);
    setEmployees(transformedEmployees);
  }

  return (
    <div className='Container'>
    <Header selectedTeam={selectedTeam}
        teamMemberCount={employees.filter((employee) => employee.teamName === selectedTeam).length}
      />

      <Employees employees={employees}
            selectedTeam={selectedTeam}
            handleEmployeeCardClick={handleEmployeeCardClick}
            handleTeamSelectionChange={handleTeamSelectionChange}
            teams={teams}
            />

    </div>
  );

}

export default Home;