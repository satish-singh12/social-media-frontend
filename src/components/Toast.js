import React from "react";
import "../styles/toast.css";

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div className="toast" style={{ backgroundColor: bgColor }}>
      <div className="toast-header">
        <h4>{msg.title}</h4>
        <p className="toast-close-btn" onClick={handleShow}>
          &times;
        </p>
      </div>
      <div className="toast-body">
        <p>{msg.body}</p>
      </div>
    </div>
  );
};

export default Toast;
