import express  from "express";
import { signIn, signUp } from "../controllers/auth.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";


const router = express.Router();
//Register
router.post("/register", signUp);

//Login
router.post("/login", signIn);

//TODO Google signin Oauth

export default router;
