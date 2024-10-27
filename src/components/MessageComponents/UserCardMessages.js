import React from "react";
import "./styles/userCardMessages.css";
import { RxAvatar } from "react-icons/rx";
import { FaImages } from "react-icons/fa";

const UserCardMessages = ({ children, user, handleClose, msg }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };
  return (
    <div
      className="user-card-message-header"
      style={{ borderBottom: "1px solid rgb(177, 207, 235)" }}
    >
      <div className="user-card-message-container">
        <div
          className="user-card-message-header"
          onClick={handleCloseAll}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {user?.avatar ? (
            <img src={user?.avatar} alt="" />
          ) : (
            <span className="user-card-message-img-alt">
              <RxAvatar />
            </span>
          )}
          <div className="card-items">
            <span style={{ display: "block" }}>{user?.username}</span>
            <small>
              {user?.text || user?.media ? (
                <>
                  <div>{user?.text}</div>
                  {user?.media?.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {user?.media?.length} <FaImages />
                    </div>
                  )}
                </>
              ) : (
                user?.fullname
              )}
            </small>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserCardMessages;
