const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const auth = require("./routes/auth/auth");
const jobRoutes = require("./routes/protectedRoutes/jobRoutes");

const app = express();

const allowedOrigins = [
  "https://job-finder-client-alpha.vercel.app",
  "http://localhost:3000",
  // Add other allowed origins as needed
];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "All good!",
  });
});
app.get("/health", (req, res) => {
  const currTime = new Date().toLocaleString();
  res.status(200).json({
    serverName: "Job Finder",
    status: "Active",
    Time: currTime,
  });
});

// ------------------Routes------------------------------------------
app.use("/", auth);
app.use("/", jobRoutes);

//------------------Error Handling Middleware-------------------------
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    err: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
//------------------------------------------------------------------------------------
app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`server running at http://localhost:${process.env.PORT}`);
    })
    .catch((error) => console.log("Connection Error\n", error));
});
