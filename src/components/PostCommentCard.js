import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import "../styles/postCommentCard.css";
import { useSelector } from "react-redux";
import CommentMenuItem from "./CommentMenuItem";
import LikePost from "./LikePost";

const PostCommentCard = ({ comment, pos }) => {
  const auth = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIslike] = useState(false);

  const handleLike = () => {
    setIslike(true);
  };
  const handleUnlike = () => {
    setIslike(false);
  };

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  return (
    <div className="post-comment-card">
      <div className="post-comment-card-user">
        <Link to={`profile/${comment.user._id}`}>
          <div className="post-comment-card-user-info">
            <img
              className="post-comment-card-avatar"
              src={comment.user.avatar}
              alt={comment.user.fullname}
            />
            <div className="post-comment-card-avatar-info">
              <h4 className="post-comment-card-fullname">
                {comment.user.fullname}
              </h4>
              <h6 className="post-comment-card-time">
                {moment(comment.createdAt).fromNow()}
              </h6>
            </div>
          </div>
        </Link>
        <div className="post-comment-card-user-dropdown">
          {/* <p>ooo</p> */}
          <CommentMenuItem auth={auth} comment={comment} pos={pos} />
        </div>
      </div>
      <div className="post-comment-card-content">
        <div className="post-comment-card-content-content">
          <span>
            {/* { content.length < 100 ? content : readMore ? content + ".." : content.slice(0, 100) + ' ... '} */}
            {content.length > 100 ? (
              <>
                {readMore ? content : content.slice(0, 100) + "... "}
                <button onClick={() => setReadMore(!readMore)}>
                  {readMore ? (
                    <span>Show less</span>
                  ) : (
                    <span>...Read more</span>
                  )}
                </button>
              </>
            ) : (
              content
            )}
          </span>
        </div>
        <div className="post-comment-card-content-content-likes">
          <p className="post-comment-card-content-content-likes-count">
            {comment.likes.length}
          </p>
          <MdOutlineFavoriteBorder style={{ color: "red" }} />
          <p className="post-comment-card-content-content-reply">Reply</p>
        </div>
        <div className="post-comment-card-like-button">
          <LikePost
            isLike={isLike}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCommentCard;
