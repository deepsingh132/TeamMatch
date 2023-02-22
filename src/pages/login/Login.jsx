import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStart, loginFailure, loginSuccess } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

import "./login.css";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/login", {username,password});
      console.log(res);
      console.log(res.data);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      console.log(err);
    }
  };


  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="loginInput"
            required
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
        <button className="loginRegisterButton">
          <Link
            className="link"
            to="/register"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            Register
          </Link>
        </button>
      </div>
  );
}

export default Login;
