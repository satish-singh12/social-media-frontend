import React from "react";
import LeftSideMessage from "./LeftSideMessage";
import RightSideMessage from "./RightSideMessage";
import "../../pages/styles/messages.css";

const Conversation = () => {
  return (
    <div className="messages-container">
      <div className="message-left-side">
        <LeftSideMessage />
      </div>
      <div className="message-right-side">
        <RightSideMessage />
      </div>
    </div>
  );
};

export default Conversation;
