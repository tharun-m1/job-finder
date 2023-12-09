const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

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
// --------------------------Register------------------------------------------------

app.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, mobile, password: encryptedPassword });
    res.json({
      status: "Success",
      message: "User created Successfully!!",
    });
  } catch (err) {
    res.json({
      status: "Failed",
      message: "Unable to register.",
    });
  }
});
//------------------------------------------------------------------------------------

//----------------------------LogIn-------------------------------------------------

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      let passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        const jwToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
          expiresIn: 60 * 60,
        });
        res.json({
          status: "Succes",
          messagge: "You are LoggedIn.",
          jwToken: jwToken,
        });
      } else {
        res.json({
          status: "Failed",
          message: "Incorrect Credentials.",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "Failed",
      message: "User doesn't Exist.",
    });
  }
});
//-------------------------------------------------------------------------------------
app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`server running at http://localhost:${process.env.PORT}`);
    })
    .catch((error) => console.log(error));
});
