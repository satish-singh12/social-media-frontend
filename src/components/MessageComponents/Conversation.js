import React from "react";
import LeftSideMessage from "./LeftSideMessage";
import RightSideMessage from "./RightSideMessage";
// import "./styles/messages.css";

const Conversation = () => {
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

export default Conversation;
