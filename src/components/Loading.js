import React from "react";
import "../styles/loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <svg width="400" height="180">
        <rect
          x="50"
          y="20"
          width="150"
          height="150"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
        ></rect>
        <text
          className="loading-text"
          style={{ transform: "translateX(45px, -40px)" }}
          fill="#fff"
          x="4"
          y="147"
        >
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Loading;
