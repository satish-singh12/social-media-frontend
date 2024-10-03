import React, { useEffect, useState } from "react";
import "../styles/toast.css";

const Toast = ({ msg, handleShow, bgColor }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // If the toast is not visible, return null to hide it
  if (!show) return null;

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
