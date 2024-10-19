import React from "react";
import "../../styles/postCardHeader.css";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { ALERT_TYPES } from "../../redux/actions/alertActions";
import { deletePost } from "../../redux/actions/postActions";
import { BASE_URL } from "../../utils/config";

const PostCardHeader = ({ pos }) => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditPost = (edt) => {
    //console.log(edt);
    dispatch({ type: ALERT_TYPES.STATUS, payload: { ...pos, edit: true } });
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost({ pos, auth, socket }));
    navigate("/");
  };

  const handleCopyPostLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${pos._id}`);
  };

  return (
    <div>
      <Link to={`/profile/${pos?.user?._id}`} className="no-decoration">
        <div className="post-card-header">
          <div className="post-card-header-avatar">
            <img src={pos.user?.avatar} alt={pos.user?.fullname} />
          </div>
          <div className="post-card-header-info">
            <h4>
              {pos.user?.fullname} <span> posted </span>
              {/* {pos.images?.length || 0} */}
              {pos.images?.length > 1 ? " items" : " item"}
            </h4>
            <h6>{moment(pos.user?.createdAt).fromNow()}</h6>
          </div>
        </div>
      </Link>
      <div className="post-card-header-down">
        <p>OOO</p>
        <div className="post-card-header-dropdown">
          {auth?.user?._id === pos?.user?._id ? (
            <>
              <div
                onClick={() => {
                  handleEditPost(pos);
                }}
              >
                Update Post
              </div>
              <div onClick={handleDeletePost}>Delete Post</div>
              <div onClick={handleCopyPostLink}>Copy Link</div>
            </>
          ) : (
            <div onClick={handleCopyPostLink}>Copy Link</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCardHeader;
