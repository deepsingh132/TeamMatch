import bcrypt from "bcrypt";
import { createError } from "../error.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    await newUser.save();
    res.status(200).json("User Created!");
  } catch (err) {
    next(createError(404, "Username or email already in use!"));
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated)
      return next(createError(401, "Wrong username or password!"));

    const { password, ...others } = user._doc;
    console.log("Logged In Successfully!");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200).json({...others});
  } catch (err) {
    return next(err);
  }
};
