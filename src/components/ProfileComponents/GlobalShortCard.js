import React from "react";
import "../../styles/globalShortCard.css";

const GlobalShortCard = ({ friend }) => {
  return (
    <div className="global-short-card">
      <img
        className="global-short-card-content-avatar"
        src={friend.avatar}
        alt="avatar"
      />
      <div className="global-short-card-content-info">
        <h5 className="global-short-card-content-info-fullname">
          {friend.fullname}
        </h5>
        <h6 className="global-short-card-content-info-username">
          {friend.username}
        </h6>
      </div>
    </div>
  );
};

export default GlobalShortCard;
