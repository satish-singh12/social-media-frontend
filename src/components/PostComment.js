import React from "react";
import PostCommentDisplay from "./PostCommentDisplay";

const PostComment = ({ pos }) => {
  // console.log(pos.comments);
  return (
    <div>
      {pos.comments &&
        pos.comments.map((comment) => (
          <PostCommentDisplay comment={comment} key={comment._id} pos={pos} />
        ))}
    </div>
  );
};

export default PostComment;
