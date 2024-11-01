import React, { useState } from "react";
import "./styles/inputPostComment.css";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentActions";

const InputPostComment = ({ children, pos, comment, onReply, setOnReply }) => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (onReply) return setOnReply(false);
      return;
    }

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.comment?.user,
    };
    dispatch(createComment({ pos, newComment, auth, socket }));
    setContent("");
    if (onReply) return setOnReply(false);
    setContent("");
  };
  return (
    <div className="input-post-comments">
      <div className="input-post-comments-left">
        <img src={auth.user?.avatar} alt="avatar" />
        {children}
      </div>
      <input
        className="input-post-comments-input"
        type="text"
        placeholder="Write your opinion"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />

      <button className="input-post-comments-button" onClick={handleSubmit}>
        Say it
      </button>
    </div>
  );
};

export default InputPostComment;
