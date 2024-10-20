import React from "react";
import "./styles/userCardMessages.css";
import { Link } from "react-router-dom";

//child of Navbar.js
const UserCardMessages = ({ children, user, handleClose }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };
  return (
    <div
      className="user-card-message-header"
      style={{ borderBottom: "1px solid rgb(177, 207, 235)" }}
    >
      <div>
        <div
          className="user-card-message-header"
          onClick={handleCloseAll}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img src={user?.avatar} alt="" />
          <div className="card-items">
            <span>{user?.fullname}</span>
            <small>{user?.username}</small>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserCardMessages;
