import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import "./styles/postCommentCard.css";
import { useDispatch, useSelector } from "react-redux";
import CommentMenuItem from "./CommentMenuItem";
import LikePost from "./LikePost";
import {
  updateComment,
  likeComment,
  unlikeComment,
} from "../../redux/actions/commentActions";
import InputPostComment from "./InputPostComment";

const PostCommentCard = ({ children, comment, pos, commentId }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIslike] = useState(false);
  const [load, setLoad] = useState(false);
  const [onReply, setOnReply] = useState(false);

  const handleLike = () => {
    if (load) return;
    setIslike(true);
    setLoad(true);
    dispatch(likeComment({ comment, pos, auth })).finally(() => setLoad(false));
  };
  const handleUnlike = () => {
    if (load) return;
    setIslike(false);
    setLoad(true);
    dispatch(unlikeComment({ comment, pos, auth })).finally(() =>
      setLoad(false)
    );
  };

  const handleUpdateComment = () => {
    if (comment.content === content) {
      setOnEdit(false);
    } else {
      dispatch(updateComment({ comment, content, pos, auth }));
      setOnEdit(false);
    }
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ comment, commentId });
  };

  useEffect(() => {
    setContent(comment.content);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIslike(true);
    }
  }, [comment.content, comment.likes]);

  return (
    <div className="post-comment-card">
      <div className="post-comment-card-user">
        <Link className="no-decoration" to={`profile/${comment.user._id}`}>
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
          <CommentMenuItem
            auth={auth}
            comment={comment}
            pos={pos}
            setOnEdit={setOnEdit}
          />
        </div>
      </div>
      <div className="post-comment-card-content">
        <div className="post-comment-card-content-content">
          {onEdit ? (
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="change your opinion"
            />
          ) : (
            <>
              {comment?.tag && comment?.tag?._id !== comment.user._id && (
                <Link to={`/profile/${comment?.tag?._id}`}>
                  <span className="post-comment-card-content-content-tag-user">
                    @{comment.tag.username}
                  </span>
                </Link>
              )}
              <span>
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
            </>
          )}
        </div>
        <div className="post-comment-card-content-content-likes">
          <p className="post-comment-card-content-content-likes-count">
            {comment.likes.length}
          </p>
          <MdOutlineFavoriteBorder />
          {onEdit ? (
            <>
              <p
                className="post-comment-card-content-content-reply"
                onClick={() => handleUpdateComment()}
              >
                Update
              </p>
              <p
                className="post-comment-card-content-content-reply"
                onClick={() => setOnEdit(false)}
              >
                Cancle
              </p>
            </>
          ) : (
            <p
              className="post-comment-card-content-content-reply"
              onClick={handleReply}
            >
              {onReply ? "Reply on opinion" : "Reply"}
            </p>
          )}
        </div>
        <div className="post-comment-card-like-button">
          <LikePost
            isLike={isLike}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />
        </div>
      </div>
      {onReply && (
        <>
          <InputPostComment
            comment={comment}
            pos={pos}
            onReply={onReply}
            setOnReply={setOnReply}
          />
          <Link to={`/profile/${onReply.comment?.user?._id}`}>
            @{onReply.comment?.user?.username}
          </Link>
        </>
      )}
      {children}
    </div>
  );
};

export default PostCommentCard;
