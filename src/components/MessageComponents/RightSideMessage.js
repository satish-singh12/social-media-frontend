import React, { useEffect, useState } from "react";
import UserCardMessages from "./UserCardMessages";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessageDisplay from "./MessageDisplay";
import "./styles/rightSideMessage.css";
import { IoSend } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";

const RightSideMessage = () => {
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);

  useEffect(() => {
    const newData = message.users.find((item) => item._id === id);
    if (newData) {
      setUser(newData);
    }
  }, [message.users, id]);
  return (
    <div className="right-side-message">
      <div className="right-side-message-content-header">
        <UserCardMessages user={user}>
          <RiDeleteBin6Fill />
        </UserCardMessages>
      </div>
      <div className="right-side-content-messages">
        <div className="right-side-content-messages-other">
          <MessageDisplay user={user} />
        </div>
        <div className="right-side-content-messages-other">
          <MessageDisplay user={user} />
        </div>
      </div>
      <form className="right-side-content-messages-input">
        <input
          type="text"
          className="right-side-content-messages-input-text"
          placeholder="Type your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="right-side-content-messages-input-btn"
          disabled={text ? false : true}
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default RightSideMessage;
