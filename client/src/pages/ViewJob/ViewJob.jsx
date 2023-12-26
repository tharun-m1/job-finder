import React, { useEffect } from "react";
import { useState } from "react";

import styles from "./viewjob.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function ViewJob() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem("jwToken")) {
      return true;
    }
    return false;
  });

  const [jobData, setJobData] = useState({});
  const { jobId } = useParams();
  const navigate = useNavigate();
  const login = () => {
    return navigate("/login");
  };
  const register = () => {
    return navigate("/register");
  };

  useEffect(() => {
    axios
      .get(`https://job-finder-server-rqtf.onrender.com/job-details/${jobId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === "OK" && res.data.data) {
          setJobData(res.data.data);
        } else {
          alert("Job Not found");
          return navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        return navigate("/");
      });
  }, []);
  const edit = () => {
    return navigate("/add-job", { state: { data: jobData } });
  };
  const logout = () => {
    localStorage.removeItem("jwToken");
    return navigate("/");
  };
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
            {isLoggedIn ? (
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
            )}
          </div>
        </div>
        <div className={styles.overview}>
          {jobData.jobPosition} {jobData.office} {jobData.jobType} at{" "}
          {jobData.companyName}
        </div>
        <div className={styles.jobDetails}>
          <div
            style={{
              display: "flex",
              paddingBottom: "30px",
            }}
          >
            <div
              style={{
                flex: "70%",
                paddingLeft: "30px",
              }}
            >
              <span style={{ marginRight: "18px" }}>1wk ago</span>
              <span style={{ marginRight: "18px" }}>{jobData.jobType}</span>
              <span style={{ marginRight: "18px" }}>
                {" "}
                <img
                  height={"13px"}
                  width={"30px"}
                  src={jobData.logoURL}
                />{" "}
              </span>
              <span style={{ marginRight: "18px" }}>{jobData.companyName}</span>
              <div
                style={{
                  marginRight: "18px",
                  fontSize: "2.5rem",
                  fontWeight: "700",
                }}
              >
                {jobData.jobPosition}
              </div>
              <div
                style={{
                  color: "#ED5353",
                  fontWeight: "700",
                  letterSpacing: "1px",
                }}
              >
                {jobData.location}
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  marginTop: "15px",
                  //   justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flex: "50%",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M18.375 14C18.375 14.8653 18.1184 15.7112 17.6377 16.4306C17.1569 17.1501 16.4737 17.7108 15.6742 18.042C14.8748 18.3731 13.9951 18.4597 13.1465 18.2909C12.2978 18.1221 11.5183 17.7054 10.9064 17.0936C10.2946 16.4817 9.87787 15.7022 9.70906 14.8535C9.54025 14.0049 9.62689 13.1252 9.95803 12.3258C10.2892 11.5263 10.8499 10.8431 11.5694 10.3623C12.2888 9.88159 13.1347 9.625 14 9.625C15.1603 9.625 16.2731 10.0859 17.0936 10.9064C17.9141 11.7269 18.375 12.8397 18.375 14ZM27.125 7V21C27.125 21.2321 27.0328 21.4546 26.8687 21.6187C26.7046 21.7828 26.4821 21.875 26.25 21.875H1.75C1.51794 21.875 1.29538 21.7828 1.13128 21.6187C0.967187 21.4546 0.875 21.2321 0.875 21V7C0.875 6.76794 0.967187 6.54538 1.13128 6.38128C1.29538 6.21719 1.51794 6.125 1.75 6.125H26.25C26.4821 6.125 26.7046 6.21719 26.8687 6.38128C27.0328 6.54538 27.125 6.76794 27.125 7ZM25.375 12.0695C24.3814 11.7758 23.4772 11.2381 22.7445 10.5055C22.0119 9.77283 21.4742 8.86856 21.1805 7.875H6.81953C6.52576 8.86856 5.98807 9.77283 5.25545 10.5055C4.52283 11.2381 3.61856 11.7758 2.625 12.0695V15.9305C3.61856 16.2242 4.52283 16.7619 5.25545 17.4945C5.98807 18.2272 6.52576 19.1314 6.81953 20.125H21.1805C21.4742 19.1314 22.0119 18.2272 22.7445 17.4945C23.4772 16.7619 24.3814 16.2242 25.375 15.9305V12.0695Z"
                      fill="#999999"
                    />
                  </svg>
                  <div
                    style={{
                      fontSize: "1.1rem",
                      display: "inline-block",
                      marginLeft: "10px",
                      marginBottom: "13px",
                    }}
                  >
                    stipend
                  </div>
                  <div>Rs. {jobData.monthlySalary}/month</div>
                </div>
              </div>
            </div>
            <div style={{ flex: "30%" }} className="editjobbutton">
              {isLoggedIn ? (
                <div style={{ margin: "30px 0px 0px 30px" }}>
                  <button
                    onClick={edit}
                    style={{
                      borderRadius: "6px",
                      backgroundColor: "#ED5353",
                      color: "white",
                      border: "none",
                      height: "35px",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      cursor: "pointer",
                    }}
                  >
                    Edit Job
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            style={{
              margin: "10px 30px 10px 30px",
            }}
            className="about-company"
          >
            <h3>About Company</h3>
            <p
              style={{
                marginTop: "25px",
              }}
            >
              {jobData.aboutCompany}
            </p>
          </div>
          <div
            style={{
              margin: "40px 30px 10px 30px",
            }}
            className="about-job"
          >
            <h3>About Job/Internship</h3>
            <p
              style={{
                marginTop: "25px",
              }}
            >
              {jobData.jobDescription}
            </p>
          </div>
          <div
            style={{
              margin: "40px 30px 10px 30px",
            }}
            className="skills"
          >
            <h3>Skills Required</h3>
            <p
              style={{
                marginTop: "25px",
              }}
            >
              {jobData.skills
                ? jobData.skills.map((el) => {
                    return el + " ";
                  })
                : "-"}
            </p>
          </div>
          <div
            style={{
              margin: "40px 30px 10px 30px",
            }}
            className="Additional info"
          >
            <h3>Additional info</h3>
            <p
              style={{
                marginTop: "25px",
              }}
            >
              {jobData.information}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewJob;
