import React, { useEffect, useState } from "react";
import styles from "./addjob.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
function AddJob() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: jobData } = location.state || {
    data: {
      companyName: "",
      logoURL: "",
      jobPosition: "",
      monthlySalary: "",
      jobType: "",
      office: "",
      location: "",
      jobDescription: "",
      aboutCompany: "",
      skills: "",
      information: "",
    },
  };
  const [formData, setFormData] = useState(jobData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (!localStorage.getItem("jwToken")) {
      return navigate("/login");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(formData.monthlySalary)) {
      return alert("Enter valid salary");
    }
    const jwToken = localStorage.getItem("jwToken");
    if (!jwToken) {
      alert("You are not loggedIn");
      return navigate("/login");
    }
    const headers = {
      "Content-Type": "application/json",
      authorization: jwToken,
    };

    if (location.state) {
      return axios
        .put("https://job-finder-server-rqtf.onrender.com/edit-job", formData, {
          headers: headers,
        })
        .then((res) => {
          alert(res.data.message);
          return navigate("/");
        })
        .catch((err) => console.log(err));
    }
    axios
      .post(
        "https://job-finder-server-rqtf.onrender.com/create-job",
        formData,
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.status === "OK") {
          alert(res.data.message);
          return navigate("/");
        } else {
          alert(res.data.message);
          localStorage.removeItem("jwToken");
          return navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCancel = () => {
    return navigate("/");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.caption}>Add job description</div>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="companyName">Company Name</label>
                <input
                  onChange={handleChange}
                  required
                  value={formData.companyName}
                  style={{
                    borderRadius: "5px",
                    width: "400px",
                    height: "38px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                  }}
                  type="text"
                  name="companyName"
                  placeholder="Enter your company name here"
                />
              </div>
              <div>
                <label htmlFor="logoURL">Add logo URL</label>
                <input
                  onChange={handleChange}
                  value={formData.logoURL}
                  required
                  style={{
                    borderRadius: "5px",
                    width: "400px",
                    height: "38px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                  }}
                  type="text"
                  name="logoURL"
                  placeholder="Enter the link"
                />
              </div>
              <div>
                <label htmlFor="jobPosition">Job Position</label>
                <input
                  onChange={handleChange}
                  value={formData.jobPosition}
                  required
                  style={{
                    borderRadius: "5px",
                    width: "400px",
                    height: "38px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                  }}
                  type="text"
                  name="jobPosition"
                  placeholder="Enter job position"
                />
              </div>
              <div>
                <label htmlFor="monthlySalary">Monthly Salary</label>
                <input
                  onChange={handleChange}
                  value={formData.monthlySalary}
                  required
                  style={{
                    borderRadius: "5px",
                    width: "400px",
                    height: "38px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                  }}
                  type="text"
                  name="monthlySalary"
                  placeholder="Enter amount in rupees"
                />
              </div>
              <div>
                <label htmlFor="jobType">Job Type</label>
                <select
                  onChange={handleChange}
                  value={formData.jobType}
                  style={{
                    width: "100px",
                    height: "30px",
                    borderRadius: "5px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                    position: "relative",
                    right: "37.5%",
                  }}
                  name="jobType"
                >
                  <option selected disabled value="">
                    Select
                  </option>
                  <option value={"full-time"}>Full Time</option>
                  <option value={"part-time"}>Part Time</option>
                  <option value={"Intern"}>Intern</option>
                </select>
              </div>
              <div>
                <label htmlFor="office">Remote/office</label>
                <select
                  onChange={handleChange}
                  value={formData.office}
                  style={{
                    width: "100px",
                    height: "30px",
                    borderRadius: "5px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                    position: "relative",
                    right: "37.5%",
                  }}
                  name="office"
                >
                  <option selected disabled value="">
                    Select
                  </option>
                  <option value={"Remote"}>Remote</option>
                  <option value={"In-Office"}>In Office</option>
                </select>
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input
                  onChange={handleChange}
                  value={formData.location}
                  required
                  style={{
                    borderRadius: "5px",
                    width: "400px",
                    height: "38px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                  }}
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                />
              </div>
              <div>
                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                  onChange={handleChange}
                  value={formData.jobDescription}
                  required
                  style={{
                    borderRadius: "5px",
                    width: "400px",
                    // height: "38px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                    paddingTop: "5px",
                    resize: "none",
                  }}
                  name="jobDescription"
                  placeholder="Type the job description"
                  rows={"3"}
                />
              </div>
              <div>
                <label htmlFor="aboutCompany">About Company</label>
                <textarea
                  onChange={handleChange}
                  value={formData.aboutCompany}
                  required
                  style={{
                    borderRadius: "5px",
                    width: "400px",
                    // height: "38px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                    paddingTop: "5px",
                    resize: "none",
                  }}
                  name="aboutCompany"
                  placeholder="Type about your company"
                  rows={"3"}
                />
              </div>
              <div>
                <label htmlFor="skills">Skills Required</label>
                <input
                  onChange={handleChange}
                  value={formData.skills}
                  required
                  style={{
                    borderRadius: "5px",
                    width: "400px",
                    height: "38px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                  }}
                  type="text"
                  name="skills"
                  placeholder="Enter the must have skills"
                />
              </div>
              <div>
                <label htmlFor="information">Information</label>
                <input
                  onChange={handleChange}
                  value={formData.information}
                  required
                  style={{
                    borderRadius: "5px",
                    width: "400px",
                    height: "38px",
                    border: "2px solid #C2C2C2",
                    fontFamily: "DM Sans",
                    fontSize: "15px",
                    paddingLeft: "10px",
                  }}
                  type="text"
                  name="information"
                  placeholder="Enter the additional information"
                />
              </div>
              <div>
                <div
                  style={{
                    position: "relative",
                    left: "72.5%",
                  }}
                >
                  <button
                    onClick={handleCancel}
                    style={{
                      height: "30px",
                      backgroundColor: "white",
                      border: "1px solid #CECECE",
                      borderRadius: "5px",
                      fontFamily: "DM Sans",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#ED5353",
                      color: "white",
                      fontFamily: "DM Sans",
                      border: "0px",
                      cursor: "pointer",
                    }}
                    type="submit"
                  >
                    {location.state && localStorage.getItem("jwToken")
                      ? "update"
                      : "+Add job"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.rightSection}></div>
      </div>
    </>
  );
}

export default AddJob;
