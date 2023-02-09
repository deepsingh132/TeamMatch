const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users.js");
const teamRoute = require("./routes/team.js");
const multer = require("multer");
const port = 4000;

mongoose.set("strictQuery", false);

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(console.log("Connected!"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "images");
  },
  filename: (req, file, callBack) => {
    callBack(null, "file.png");
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  // if (res.status(200)) {
  res.status(200).json("Img Uploaded!");
  // }
  // else {
  //   res.status(500).json("Error!");
  // }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/teams", teamRoute);

app.listen(port, () => {
  console.log("App running at port:", port);
});
