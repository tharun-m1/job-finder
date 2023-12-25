import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./home.module.css";
import JobChip from "../../components/JobChip/JobChip";
import searchImage from "../../assets/searchIcon.png";
import FilterChip from "../../components/FilterChip/FilterChip";
function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem("jwToken")) return true;
    return false;
  });
  const [skills, setSkills] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [jobs, setJobs] = useState([]);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    fetchJobs();
  }, [skills]);
  const logout = () => {
    localStorage.removeItem("jwToken");
    navigate("/");
    return window.location.reload();
  };
  function fetchJobs() {
    axios
      .get("https://job-finder-server-alpha.vercel.app/find-jobs", {
        withCredentials: true,
        params: { skills: skills },
      })
      .then((res) => {
        if (res.data.status === "OK") {
          setJobs(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("sometihing went wrong");
      });
  }
  const login = () => {
    return navigate("/login");
  };
  const register = () => {
    return navigate("/register");
  };

  const clear = () => {
    return setSkills("");
  };

  const deleteSkill = (skill) => {
    const prevSkills = skills;
    const skillsArray = prevSkills.split(",");
    const modifiedSkills = skillsArray.filter((el) => el !== skill);
    setSkills(modifiedSkills.join(","));
  };

  const handleChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      let del = skills ? "," : "";
      setSkills((prev) => prev + del + newSkill.toLowerCase());
      return (e.target.value = "");
    }
  };

  const addJob = () => {
    if (localStorage.getItem("jwToken")) {
      return navigate("/add-job");
    }
    alert("You are not LoggedIn");
    return navigate("/login");
  };
  function renderFilterChip() {
    let prevSkills = skills;
    if (prevSkills === "") {
      return "";
    }
    const skillsArr = prevSkills.split(",");

    return skillsArr.map((skill, idx) => {
      return (
        <div style={{ marginRight: "5px" }}>
          <FilterChip
            onClick={() => deleteSkill(skill)}
            key={idx}
            skill={skill}
          />
        </div>
      );
    });
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.banner}>
          <div
            style={{
              color: "white",
              marginLeft: "30px",
              fontWeight: "700",
              letterSpacing: "1px",
              fontSize: "1.1rem",
              flex: "50%",
            }}
          >
            Job finder
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyContent: "flex-end",

              paddingRight: "100px",
            }}
          >
            {!isLoggedIn ? (
              <button
                onClick={login}
                style={{
                  height: "30px",
                  border: "2px solid #FFF",
                  borderRadius: "7px",
                  backgroundColor: "#FF6B6B",
                  color: "white",
                  marginRight: "30px",
                  letterSpacing: "1px",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            ) : (
              <button
                onClick={logout}
                style={{
                  height: "30px",
                  color: "white",
                  marginRight: "30px",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  background: "none",
                  border: "0px",
                  fontSize: "1.2rem",
                }}
              >
                Logout
              </button>
            )}
            {!isLoggedIn ? (
              <button
                onClick={register}
                style={{
                  height: "30px",
                  border: "2px solid #FFF",
                  borderRadius: "7px",
                  backgroundColor: "white",
                  color: "#ED5353",
                  letterSpacing: "1px",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            ) : (
              <span
                style={{
                  height: "30px",
                  color: "white",
                  marginRight: "30px",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                Hello Recruiter
              </span>
            )}
            {/* {isLoggedIn ? (
              <div
                style={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  marginLeft: "10px",
                }}
              ></div>
            ) : (
              ""
            )} */}
          </div>
        </div>
        <div className={styles.searchContainer}>
          <input
            onChange={handleChange}
            onKeyDown={handleEnter}
            placeholder="Type a skill and press Enter..."
            style={{
              height: "50px",
              width: "70%",
              borderRadius: "9px",
              border: "1.8px solid #E3E3E3",
              margin: "30px 100px",
              backgroundImage: searchImage,
              fontSize: "1.1rem",
              paddingLeft: "10px",
            }}
          />

          <div
            style={{
              width: "80%",
              height: "80px",
              marginLeft: "100px",
              display: "flex",
              // border: "1px solid red",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                flex: "90%",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              {renderFilterChip()}
            </div>

            <button
              onClick={clear}
              style={{
                flex: "10%",
                color: "#ED5353",
                fontWeight: "700",
                letterSpacing: "1px",
                border: "none",
                background: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
                marginRight: "20px",
              }}
            >
              Clear
            </button>
            {isLoggedIn ? (
              <button
                onClick={addJob}
                style={{
                  height: "30px",
                  width: "200px",
                  border: "none",
                  borderRadius: "7px",
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  letterSpacing: "1px",
                  marginTop: "3%",
                  cursor: "pointer",
                }}
              >
                {" "}
                + Add Job
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          style={{ display: jobs.length > 0 ? "block" : "none" }}
          className={styles.jobsContainer}
        >
          {jobs.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "20px" }}>
              <JobChip key={job._id} job={job} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
