import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import teamRoute from "./routes/team.js";
import cookieParser from "cookie-parser";
import cors from "cors";


mongoose.set("strictQuery", false);
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(cookieParser())
app.use(express.json());

  app.use(
    cors({
      origin: ["https://team-match.onrender.com"],
    })
  );

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

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
})
)
  .catch((err) => console.log(err));

export default app;
