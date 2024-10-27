import React from "react";
import "./styles/messageDisplay.css";

const imageshow = (src) => {
  return (
    <>
      <img src={src} alt="" className="status-msg-middle-images" />
    </>
  );
};
const videoshow = (src) => {
  return (
    <>
      <video controls src={src} alt="" className="status-msg-middle-images" />
    </>
  );
};

const MsgDisplay = ({ user, msg }) => {
  return (
    <div className="msg-display">
      <div className="msg-display-info-user">
        <img
          className="msg-display-info-user-avatar"
          src={user?.avatar}
          alt={user?.fullname}
        />

        <span className="msg-display-info-user-user-name">
          {" "}
          {user?.username}
        </span>
      </div>
      <div className="msg-display-text">
        {msg.text && <p className="msg-display-info-content">{msg.text}</p>}
        {msg.media.map((item, index) => (
          <div key={index}>
            {item.secure_url.match(/video/i)
              ? videoshow(item.secure_url)
              : imageshow(item.secure_url)}
          </div>
        ))}
      </div>
      <div className="msg-display-time">
        {msg.createdAt && (
          <small className="msg-display-info-user-time">{msg.createdAt}</small>
        )}
      </div>
    </div>
  );
};

export default MsgDisplay;
