import * as React from "react";
import { useState, useEffect } from "react";
//import './App.css';
import Header from "./pages/header/Header";
import Employees from "./pages/Employees";
import Footer from "./pages/footer/Footer";
import GroupedTeamMembers from "./pages/GroupedTeamMembers";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import NotFound from "./pages/NotFound";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const [selectedTeam, setTeam] = useState(
    JSON.parse(localStorage.getItem("selectedTeam")) || "TeamB"
  );

  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employeeList")) || [
      {
        id: 1,
        fullName: "Bob Jones",
        designation: "JavaScript Developer",
        gender: "male",
        teamName: "TeamA",
      },
      {
        id: 2,
        fullName: "Jill Bailey",
        designation: "Node Developer",
        gender: "female",
        teamName: "TeamA",
      },
      {
        id: 3,
        fullName: "Gail Shepherd",
        designation: "Java Developer",
        gender: "female",
        teamName: "TeamA",
      },
      // ...
    ]
  );

  useEffect(() => {
    localStorage.setItem("employeeList", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  function handleTeamSelectionChange(event) {
    console.log(event.target.value);
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
    <BrowserRouter>
      {/* <Header selectedTeam = {selectedTeam}
        teamMemberCount={employees.filter((employee) => employee.teamName === selectedTeam).length}/> */}
      <Routes>
        <Route path="/" element= {currentUser ? <Home/> : <Login /> }/>
          <Route path="/login" element={currentUser ? <Home /> : <Login />} />

          <Route
            path="/register"
            element={currentUser ? <Home /> : <Register />}
          />

        <Route
          path="/GroupedTeamMembers"
          element={
            <GroupedTeamMembers
              employees={employees}
              selectedTeam={selectedTeam}
              setTeam={setTeam}
            />
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
