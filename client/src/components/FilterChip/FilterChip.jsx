import React from "react";
import styles from "./filterchip.module.css";
function FilterChip(props) {
  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            width: "fit-content",
            padding: "7px",
            backgroundColor: "#FFEEEE",
          }}
        >
          {props.skill}
        </div>
        <button
          onClick={props.onClick}
          style={{
            width: "fit-content",
            padding: "3px 15px 3px 15px",
            backgroundColor: "#FF6B6B",
            border: "none",
            fontSize: "1.3rem",
            color: "white",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          X
        </button>
      </div>
    </>
  );
}

export default FilterChip;
