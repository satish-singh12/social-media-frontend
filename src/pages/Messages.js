import React from "react";
import LeftSideMessage from "../components/MessageComponents/LeftSideMessage";
import RightSideMessage from "../components/MessageComponents/RightSideMessage";
import "./styles/messages.css";

const Messages = () => {
  return (
    <div className="messages">
      <div className="messagesleftside">
        <LeftSideMessage />
      </div>
      <div className="messagesrightside">
        <RightSideMessage />
      </div>
    </div>
  );
};

export default Messages;
