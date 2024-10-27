import React, { useEffect, useState } from "react";
import PostCommentDisplay from "./PostCommentDisplay";
import "./styles/postComment.css";

const PostComment = ({ pos }) => {
  const [comments, setComments] = useState([]);
  const [replyComment, setReplyComment] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    if (pos && pos.comments) {
      const newCmt = pos.comments.filter((cmt) => !cmt.reply);
      setComments(newCmt);
      setShowComments(newCmt.slice(newCmt.length - next));
    }
  }, [pos, next]);

  useEffect(() => {
    if (pos && pos.comments) {
      // Filter out only the comments that are replies.
      const newRplCmt = pos.comments.filter((cmt) => cmt.reply);
      setReplyComment(newRplCmt);
    }
  }, [pos.comments]);
  //console.log(showComments);

  // const replycomment = replyComment.filter((item) => item?.reply === )

  return (
    <div>
      {showComments &&
        showComments.map((comment) => (
          <div key={comment._id}>
            <PostCommentDisplay
              comment={comment}
              pos={pos}
              newReply={
                // Filter replies for the specific comment
                replyComment &&
                replyComment.filter((item) => item?.reply === comment._id)
              }
            />
          </div>
        ))}
      {comments.length - next > 0 ? (
        <div
          className="post-comments-show-more"
          onClick={() => setNext((prev) => prev + 10)}
        >
          Show more...
        </div>
      ) : (
        comments.length > 2 && (
          <div className="post-comments-show-less" onClick={() => setNext(2)}>
            ...Show less
          </div>
        )
      )}
    </div>
  );
};

export default PostComment;
