const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users.js");
const teamRoute = require("./routes/team.js");
const port = 4000;

mongoose.set("strictQuery", false);
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(console.log("Connected!"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/teams", teamRoute);

app.listen(port, () => {
  console.log("App running at port:", port);
});
