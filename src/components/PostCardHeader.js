import React from "react";
import "../styles/postCardHeader.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

const PostCardHeader = ({ pos }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <Link to={`/profile/${pos.user._id}`} className="no-decoration">
        <div className="post-card-header">
          <div className="post-card-header-avatar">
            <img src={pos.user.avatar} alt={pos.user.fullname} />
          </div>
          <div className="post-card-header-info">
            <h4>
              {pos.user.fullname} <span> posted </span>
              {pos.images.length} images
            </h4>
            <h6>{moment(pos.user.createdAt).fromNow()}</h6>
          </div>
        </div>
      </Link>
      <div className="post-card-header-down">
        <p>O O O </p>
        <div className="post-card-header-dropdown">
          {auth?.user._id === pos.user._id ? (
            <>
              <div>Update Post</div>
              <div>Delete Post</div>
              <div>Copy Link</div>
            </>
          ) : (
            <div>Copy Link</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCardHeader;
