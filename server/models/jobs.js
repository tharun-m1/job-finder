const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logoURL: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  monthlySalary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "Intern"],
    required: true,
  },
  office: {
    type: String,
    enum: ["Remote", "In-Office"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
