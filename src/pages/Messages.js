import React from "react";
import LeftSideMessage from "../components/MessageComponents/LeftSideMessage";
import RightSideMessage from "../components/MessageComponents/RightSideMessage";
import "./styles/messages.css";

const Messages = () => {
  return (
    <div className="messages-container">
      <div className="messages-left-side">
        <LeftSideMessage />
      </div>
      <div className="messages-right-side">
        <RightSideMessage />
      </div>
    </div>
  );
};

export default Messages;
