import React, { useEffect, useState } from "react";
import "./styles/toast.css";

const Toast = ({ msg, handleShow, bgColor }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [msg]);

  // If the toast is not visible, return null to hide it
  if (!msg || !msg.title || !show) return null;

  return (
    <div
      className="toast"
      style={{ backgroundColor: bgColor, display: show ? "block" : "none" }}
    >
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
