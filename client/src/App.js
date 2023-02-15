import * as React from "react";
import { useState, useEffect } from "react";
//import './App.css';
import Header from "./pages/header/Header";
import Employees from "./pages/Employees";
import Footer from "./pages/footer/Footer";
import GroupedTeamMembers from "./pages/GroupedTeamMembers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import NotFound from "./pages/NotFound";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import axios from "axios";
import Home from "./pages/home/Home";
import CreateTeam from "./pages/team/CreateTeam";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={currentUser ? <Home currentUser = {currentUser} /> : <Login />} />
        <Route path="/login" element={currentUser ? <Home /> : <Login />} />
        <Route
          path="/createteam"
          element={currentUser ? <CreateTeam /> : <Login />}
        />
        <Route
          path="/register"
          element={currentUser ? <Home /> : <Register />}
        />

        {/*</Routes>{ <Route
          path="/GroupedTeamMembers"
          element={
            <GroupedTeamMembers
              employees={employees}
              selectedTeam={selectedTeam}
              setTeam={setTeam}
            />
          }>
           </Route>*/}

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
//export default App;
