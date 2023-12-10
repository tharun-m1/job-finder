const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../../middleware/isLoggedIn");
const Job = require("../../models/jobs");

//-------------------Create Job-----------------------------------------
router.route("/create-job").post(isLoggedIn, async (req, res) => {
  try {
    const job = req.body;
    await Job.create({
      companyName: job.companyName,
      logoURL: job.logoURL,
      jobPosition: job.jobPosition,
      monthlySalary: job.monthlySalary,
      jobType: job.jobType,
      office: job.office,
      location: job.location,
      jobDescription: job.jobDescription,
      aboutCompany: job.aboutCompany,
      skills: job.skills,
      information: job.information,
    });
    res.json({
      status: "Success",
      message: "Job created.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "Failed",
      message: "Unable to create job.",
    });
  }
});
//----------------------------------------------------------------------
module.exports = router;
