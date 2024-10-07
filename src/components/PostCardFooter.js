import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdInsertComment } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";
import "../styles/postCardFooter.css";

const PostCardFooter = ({ pos }) => {
  // console.log("posfooter", pos);
  return (
    <div className="post-card-footer">
      <div className="post-card-footer-top">
        <div className="post-card-footer-top-items">
          <p>{pos.likes.length}</p> <MdFavoriteBorder />
        </div>

        <div className="post-card-footer-top-items">
          <p>{pos.likes.length}</p> <MdInsertComment />
        </div>
      </div>

      <div className="post-card-footer-bottom">
        <div className="post-card-footer-bottom-items">
          <MdFavoriteBorder />
          <span>Favorite</span>
        </div>
        <div className="post-card-footer-bottom-items">
          <MdInsertComment />
          <span>Opinion</span>
        </div>
        <div className="post-card-footer-bottom-items">
          <MdOutlineSaveAlt />
          <span>Save</span>
        </div>
      </div>
    </div>
  );
};

export default PostCardFooter;
