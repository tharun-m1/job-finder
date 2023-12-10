const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// --------------------------Register------------------------------------------------

router.route("/register").post(async (req, res) => {
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

module.exports = router;
