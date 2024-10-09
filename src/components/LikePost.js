import React from "react";
import { MdFavorite } from "react-icons/md";

const LikePost = ({ isLike, handleLike, handleUnlike }) => {
  return (
    <div>
      {isLike ? (
        <MdFavorite onClick={handleUnlike} style={{ color: "green" }} />
      ) : (
        <MdFavorite onClick={handleLike} style={{ color: "white" }} />
      )}
    </div>
  );
};

export default LikePost;
