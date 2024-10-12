import React from "react";
import { MdOutlineFavorite } from "react-icons/md";

const LikePost = ({ isLike, handleLike, handleUnlike }) => {
  return (
    <div>
      {isLike ? (
        <MdOutlineFavorite
          onClick={handleUnlike}
          style={{ color: "green", fontSize: "1.5rem" }}
        />
      ) : (
        <MdOutlineFavorite
          onClick={handleLike}
          style={{ color: "black", fontSize: "1.5rem" }}
        />
      )}
    </div>
  );
};

export default LikePost;
