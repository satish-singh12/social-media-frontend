import React, { useEffect, useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdInsertComment } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";
import "../styles/postCardFooter.css";
import { Link } from "react-router-dom";
import LikePost from "./LikePost";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/postActions";

const PostCardFooter = ({ pos }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const updatedPos = useSelector((state) => {
  //   if (Array.isArray(state.homePost.post) && pos?._id) {
  //     return state.homePost.post.find((p) => p._id === pos._id);
  //   }
  //   return null;
  // });

  const [isLike, setIsLike] = useState(false);
  const [load, setLoad] = useState(false);

  // Ensure pos.likes is an array before checking
  useEffect(() => {
    if (Array.isArray(pos.likes)) {
      setIsLike(pos.likes.some((like) => like._id === auth.user._id));
    }
  }, [pos.likes, auth.user._id]);

  const handleLike = () => {
    if (load) return;
    setLoad(true);
    dispatch(likePost({ pos, auth }))
      .then(() => {
        setIsLike(true);
        // Optimistically update likes count
        const updatedLikes = [...pos.likes, { _id: auth.user._id }];
        pos.likes = updatedLikes; // Avoid direct mutation if possible
      })
      .catch((error) => {
        console.error("Error liking the post:", error);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  const handleUnlike = () => {
    if (load) return;
    setLoad(true);
    dispatch(unlikePost({ pos, auth }))
      .then(() => {
        setIsLike(false);
        // Optimistically update likes count
        pos.likes = pos.likes.filter((like) => like._id !== auth.user._id);
      })
      .catch((error) => {
        console.error("Error unliking the post:", error);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  return (
    <div className="post-card-footer">
      <div className="post-card-footer-top">
        <div className="post-card-footer-top-items">
          <p>{pos?.likes?.length}</p>
          <MdOutlineFavoriteBorder style={{ color: "red", fontSize: "20px" }} />
        </div>

        <div className="post-card-footer-top-items">
          <p>{pos?.comments?.length}</p>{" "}
          <MdInsertComment style={{ color: "white", fontSize: "20px" }} />
        </div>
      </div>

      <div className="post-card-footer-bottom">
        <div className="post-card-footer-bottom-items">
          <LikePost
            isLike={isLike}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />
          <span>Favorite</span>
        </div>
        <Link to={`/post/${pos._id}`}>
          <div className="post-card-footer-bottom-items">
            <MdInsertComment />

            <span>Opinion</span>
          </div>
        </Link>
        <div className="post-card-footer-bottom-items">
          <MdOutlineSaveAlt />
          <span>Save</span>
        </div>
      </div>
    </div>
  );
};

export default PostCardFooter;
