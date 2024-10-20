import React from "react";
import LeftSideMessage from "../components/MessageComponents/LeftSideMessage";
import RightSideMessage from "../components/MessageComponents/RightSideMessage";
import "./styles/messages.css";

const Messages = () => {
  return (
    <div className="message">
      <div className="message-left-side">
        <LeftSideMessage />
      </div>
      <div className="message-right-side">
        <RightSideMessage />
      </div>
    </div>
  );
};

export default Messages;
