import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("jwToken")) {
      return navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", formData)
      .then((res) => {
        if (res.data.status === "OK") {
          localStorage.setItem("jwToken", res.data.jwToken);
          navigate("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  const signup = () => {
    navigate("/register");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.leftCaption}>Already have an account?</div>
          <span style={{ color: "#525252", marginLeft: "75px" }}>
            Your personal job finder is here
          </span>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                required
                placeholder="Email"
                style={{
                  marginLeft: "65px",
                  borderRadius: "5px",
                  width: "500px",
                  height: "50px",
                  border: "2px solid #C2C2C2",
                  fontFamily: "DM Sans",
                  fontSize: "15px",
                  paddingLeft: "10px",
                }}
                type="email"
                name="email"
              />
              <input
                onChange={handleChange}
                required
                placeholder="Password"
                style={{
                  marginLeft: "65px",
                  marginTop: "10px",
                  borderRadius: "5px",
                  width: "500px",
                  height: "50px",
                  border: "2px solid #C2C2C2",
                  fontFamily: "DM Sans",
                  fontSize: "15px",
                  paddingLeft: "10px",
                }}
                type="password"
                name="password"
              />
              <div className={styles.buttonContainer}>
                <button style={{ cursor: "pointer" }} type="submit">
                  Sign In
                </button>
              </div>
              <div
                style={{
                  marginLeft: "65px",
                  marginTop: "20px",
                  fontFamily: "DM Sans",
                }}
              >
                Don't have an account? &nbsp;
                <span
                  onClick={signup}
                  style={{
                    color: "black",
                    cursor: "pointer",
                    borderBottom: "1px solid black",
                  }}
                >
                  Sign Up
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.caption}>Your Personal Job Finder</div>
        </div>
      </div>
    </>
  );
}

export default Login;
