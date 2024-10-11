import React, { useState } from "react";
import "../../styles/inputPostComment.css";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentActions";

const InputPostComment = ({ pos }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
    };
    dispatch(createComment({ pos, newComment, auth }));
  };

  const [content, setContent] = useState("");

  return (
    <div className="input-post-comments">
      <div className="input-post-comments-left">
        <img src={auth.user.avatar} alt="/" />
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
