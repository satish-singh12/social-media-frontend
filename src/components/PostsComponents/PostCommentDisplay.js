import React, { useEffect, useState } from "react";
import PostCommentCard from "./PostCommentCard";

// getting props from PostCommentCard
const PostCommentDisplay = ({ comment, pos, newReply }) => {
  const [showReply, setShowReply] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowReply(newReply.slice(newReply.length - next));
  }, [newReply, next]);

  return (
    <div>
      <PostCommentCard comment={comment} pos={pos} commentId={comment._id}>
        <div>
          {showReply &&
            showReply.map(
              (item, index) =>
                item.reply && (
                  <PostCommentCard
                    key={index}
                    comment={item}
                    commentId={comment._id}
                    pos={pos}
                  />
                )
            )}
          {/* ============== */}
          {newReply && newReply.length - next > 0 ? (
            <div
              className="post-comments-reply-show-more"
              onClick={() => setNext((prev) => prev + 10)}
            >
              Show more reply...
            </div>
          ) : (
            newReply &&
            newReply.length > 1 && (
              <div
                className="post-comments-reply-show-less"
                onClick={() => setNext(1)}
              >
                ...Show less reply
              </div>
            )
          )}
          {/* ========== */}
        </div>
      </PostCommentCard>
    </div>
  );
};

export default PostCommentDisplay;
