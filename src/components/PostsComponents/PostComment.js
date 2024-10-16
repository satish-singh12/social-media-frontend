import React, { useEffect, useState } from "react";
import PostCommentDisplay from "./PostCommentDisplay";
import "../../styles/postComment.css";

const PostComment = ({ pos }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    if (pos && pos.comments) {
      const newCmt = pos.comments.filter((cmt) => !cmt.reply);
      setComments(newCmt);
      setShowComments(newCmt.slice(newCmt.length - next));
    }
  }, [pos, next]);

  return (
    <div>
      {showComments &&
        showComments.map((comment) => (
          <div key={comment._id}>
            <PostCommentDisplay comment={comment} pos={pos} />
          </div>
        ))}
      {comments.length - next > 0 ? (
        <div
          className="post-comments-show-more"
          onClick={() => setNext((prev) => prev + 10)}
        >
          Show more
        </div>
      ) : (
        comments.length > 2 && (
          <div className="post-comments-show-less" onClick={() => setNext(2)}>
            Show less
          </div>
        )
      )}
    </div>
  );
};

export default PostComment;
