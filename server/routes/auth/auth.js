const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
// --------------------------Register------------------------------------------------

router.route("/register").post(async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, mobile, password: encryptedPassword });
    const user = await User.findOne({ email });
    const jwToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    res.json({
      status: "OK",
      message: "User created Successfully!!",
      recruiterName: name,
      jwToken,
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

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      let passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        const jwToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
          expiresIn: 60 * 60,
        });
        res.status(200).json({
          status: "OK",
          messagge: "You are LoggedIn.",
          recruiterName: user.name,
          jwToken,
          type: typeof jwToken,
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

module.exports = router;
