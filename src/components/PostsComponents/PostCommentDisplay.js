import React from "react";
import PostCommentCard from "./PostCommentCard";

const PostCommentDisplay = ({ comment, pos }) => {
  return (
    <div>
      <PostCommentCard comment={comment} pos={pos} />
    </div>
  );
};

export default PostCommentDisplay;
