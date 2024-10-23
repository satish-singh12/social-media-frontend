import React from "react";
import "./styles/userCard.css";
import { Link } from "react-router-dom";

//child of Navbar.js
const UserCard = ({ user, handleClose }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };
  return (
    <div
      className="card-header"
      style={{ borderBottom: "1px solid rgb(177, 207, 235)" }}
    >
      <div>
        <Link
          to={`/profile/${user?._id}`}
          className="card-header"
          onClick={handleCloseAll}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img src={user?.avatar} alt="" />
          <div className="card-items">
            <span>{user?.fullname}</span>
            <small>{user?.username}</small>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
