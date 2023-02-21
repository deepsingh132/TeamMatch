import * as React from "react";
import Footer from "./pages/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import NotFound from "./pages/NotFound";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import CreateTeam from "./pages/team/Team";
import "./app.css"

function App() {
  const { currentUser } = useSelector((state) => state.user);


  return (
    <BrowserRouter>
      {currentUser && <Navbar />}
      <Routes>
        <Route path="/" element={currentUser ? <Home currentUser = {currentUser} /> : <Login />} />
        <Route path="/login" element={currentUser ? <Home /> : <Login />} />
        <Route
          path="/createteam"
          element={currentUser ? <CreateTeam /> : <Login />}
        />
        <Route
        path= "/updateteam"
        element={currentUser ? <CreateTeam /> : <Login />}
        />
        <Route
          path="/register"
          element={currentUser ? <Home /> : <Register />}
        />

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
