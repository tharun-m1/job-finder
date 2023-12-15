import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styles from "./register.module.css";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const signIn = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/register", formData)
      .then((res) => {
        if (res.data.status === "OK") {
          localStorage.setItem("jwToken", res.data.jwToken);
          navigate("/home");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.leftCaption}>Create an account</div>
          <span style={{ color: "#525252", marginLeft: "75px" }}>
            Your personal job finder is here
          </span>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                required
                placeholder="Name"
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
                type="text"
                name="name"
              />
              <input
                onChange={handleChange}
                required
                placeholder="Email"
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
                type="email"
                name="email"
              />
              <input
                onChange={handleChange}
                required
                maxLength={10}
                minLength={10}
                placeholder="Mobile"
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
                type="text"
                name="mobile"
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
              <div style={{ marginLeft: "65px", marginTop: "10px" }}>
                <input required type="checkbox" name="tnc" />
                <span
                  style={{
                    marginLeft: "10px",
                    fontFamily: "DM Sans",
                    letterSpacing: "0.337px",
                  }}
                >
                  By creating an account, I agree to our terms of use and
                  privacy policy
                </span>
              </div>
              <div className={styles.buttonContainer}>
                <button style={{ cursor: "pointer" }} type="submit">
                  Create Account
                </button>
              </div>
              <div
                style={{
                  marginLeft: "65px",
                  marginTop: "20px",
                  fontFamily: "DM Sans",
                }}
              >
                Already have an account? &nbsp;
                <span
                  onClick={signIn}
                  style={{
                    color: "black",
                    cursor: "pointer",
                    borderBottom: "1px solid black",
                  }}
                >
                  Sign In
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

export default Register;
