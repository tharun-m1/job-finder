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
    let skillsArray = job.skills.split(",");
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
      skills: skillsArray,
      information: job.information,
    });
    res.json({
      status: "OK",
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

// ------------------------Edit Job-------------------------------------

router.route("/edit-job").put(isLoggedIn, async (req, res) => {
  try {
    const {
      companyName,
      logoURL,
      jobPosition,
      monthlySalary,
      jobType,
      office,
      location,
      jobDescription,
      aboutCompany,
      skills,
      information,
      _id,
    } = req.body;
    const job = await Job.findOne({ _id });
    if (!job) {
      return res.json({
        status: "Failed",
        message: "Job doesn't exist",
      });
    }

    let skillsArray = typeof skills === "string" ? skills.split(",") : skills;
    await Job.findByIdAndUpdate(_id, {
      companyName,
      logoURL,
      jobPosition,
      monthlySalary,
      jobType,
      office,
      location,
      jobDescription,
      aboutCompany,
      skills: skillsArray,
      information,
    });
    res.json({
      status: "Success",
      message: "Job edited Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed.",
      message: "Unable to edit job or job not found",
    });
  }
});
//---------------------------------------------------------------------

//-----------------------------Find Jobs--------------------------------

router.get("/find-jobs", async (req, res) => {
  try {
    let { skills } = req.body;
    if (!skills) {
      const jobs = await Job.find({});
      return res.json({
        status: "OK",
        data: jobs,
      });
    }
    let skillsArray = skills.split(",");
    const jobs = await Job.find({ skills: { $in: skillsArray } });
    const jobArray = jobs.map((job) => {
      return {
        companyName: job.companyName,
        jobType: job.jobType,
        skills: job.skills,
      };
    });
    res.json({
      status: "OK",
      data: jobArray,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "Failed",
      message: "Unable to fetch jobs",
    });
  }
});
//-----------------------------------------------------------------------

//-----------------------------Find Job----------------------------------

router.get("/job-details/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });
    res.json({
      status: "OK",
      data: job,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "Failed",
      message: "Unable to fetch details",
    });
  }
});
//--------------------------------------------------------------------
module.exports = router;
