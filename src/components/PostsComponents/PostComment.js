import React, { useEffect, useState } from "react";
import PostCommentDisplay from "./PostCommentDisplay";
import "../../styles/postComment.css";

const PostComment = ({ pos }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    const newCmt = pos.comments.filter((cmt) => !cmt.reply);
    setComments(newCmt);
    setShowComments(newCmt.slice(newCmt.length - next));
  }, [pos.comments, next]);
  return (
    <div className="post-comments-header">
      {showComments &&
        showComments.map((comment) => (
          <div className="post-comment">
            <PostCommentDisplay comment={comment} key={comment._id} pos={pos} />
          </div>
        ))}
      <div className="show-more">
        {comments.length - next > 0 ? (
          <div onClick={() => setNext((prev) => prev + 10)}>Show more</div>
        ) : (
          comments.length > 2 && <div onClick={() => setNext(2)}>Show less</div>
        )}
      </div>
    </div>
  );
};

export default PostComment;
