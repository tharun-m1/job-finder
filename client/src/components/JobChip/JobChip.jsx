import React, { useEffect, useState } from "react";
import styles from "./jobchip.module.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";
function JobChip(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem("jwToken")) return true;
    return false;
  });
  const navigate = useNavigate();
  let jobData = props.job;

  useEffect(() => {
    axios.get(`http://localhost:4000/${jobData._id}`).then((res) => {
      if (res.data.status !== "OK") {
        alert("Job Not Found");
        return navigate("/");
      }
    });
  });
  const viewDetails = () => {
    return navigate(`view-job/${jobData._id}`);
  };
  const edit = () => {
    return navigate("/add-job", { state: { data: jobData } });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            src={jobData.logoURL}
            height={"40%"}
            width={"80%"}
            style={{ marginTop: "25px", marginLeft: "10px" }}
          />
        </div>
        <div className={styles.middle}>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "700",
            }}
          >
            {jobData.jobPosition}
          </div>

          <div
            style={{
              marginTop: "2%",
            }}
          >
            Rs.{jobData.monthlySalary} &nbsp; {jobData.location}
          </div>
          <div
            style={{
              marginTop: "2%",
              color: "#ED5353",
              fontWeight: "700",
            }}
          >
            {jobData.office} &nbsp; {jobData.jobType}
          </div>
        </div>
        <div className={styles.right}>
          <div
            style={{
              flex: "70%",
              display: "flex",
              flexWrap: "wrap",
              overflow: "hidden",
            }}
          >
            {jobData.skills.map((skill, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#FFEEEE",
                    height: "fit-content",
                    width: "fit-content",
                    padding: "5px",
                    fontFamily: "DM Sans",
                    margin: "5px",
                  }}
                >
                  {" "}
                  {skill}{" "}
                </div>
              );
            })}
          </div>
          <div
            style={{
              flex: "30%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {isLoggedIn ? (
              <button
                onClick={edit}
                style={{
                  height: "30px",
                  width: "100px",
                  borderRadius: "3.922px",
                  backgroundColor: "white",
                  border: "none",
                  color: "#ED5353",
                  fontFamily: "DM Sans",
                  border: "2px solid #ED5353",
                  letterSpacing: "1px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            ) : (
              ""
            )}
            <button
              onClick={viewDetails}
              style={{
                height: "30px",
                width: "100px",
                borderRadius: "3.922px",
                backgroundColor: "#ED5353",
                border: "none",
                color: "white",
                fontFamily: "DM Sans",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobChip;
