import React from "react";
import "../styles/loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <svg width="400" height="180">
        <circle
          cx="125" // Center X position
          cy="100" // Center Y position
          r="75" // Radius
          fill="none"
          stroke="#fff"
          strokeWidth="5"
        ></circle>
        <text
          className="loading-text"
          style={{ transform: "translate(45px, -40px)" }}
          fill="#fff"
          x="50"
          y="147"
        >
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Loading;
