import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import teamRoute from "./routes/team.js";
import cookieParser from "cookie-parser";
const port = 4000;

mongoose.set("strictQuery", false);
dotenv.config();

app.use(cookieParser())
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(console.log("Connected!"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/teams", teamRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message
  });
});

app.listen(port, () => {
  console.log("App running at port:", port);
});

export default app;
