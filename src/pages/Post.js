import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostSingle } from "../redux/actions/postActions";
import PostCardHeader from "../components/PostsComponents/PostCardHeader";
import PostCardBody from "../components/PostsComponents/PostCardBody";
import PostCardFooter from "../components/PostsComponents/PostCardFooter";
import PostComment from "../components/PostsComponents/PostComment";
import InputPostComment from "../components/PostsComponents/InputPostComment";

const Post = () => {
  const [post, setPost] = useState([]);
  const { auth, detailPost } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostSingle({ detailPost, auth, id }));
    if (detailPost.length > 0) {
      const newPost = detailPost.filter((item) => item._id === id);
      setPost(newPost);
    }
  }, [detailPost, auth, id]);

  return (
    <div
      className="profile-post"
      style={{
        width: "700px",
        maxWidth: "100%",
        margin: "auto",
        marginTop: "10rem",
      }}
    >
      {post &&
        post.length > 0 &&
        post.map((pos) => (
          <div
            className="post-card"
            key={pos._id}
            style={{
              backgroundColor: "rgb(82, 113, 179)",
              padding: "1rem",
              margin: "1rem",
              borderRadius: "10px",
              boxShadow: "3px 3px gray",
            }}
          >
            <PostCardHeader pos={pos} />
            <PostCardBody pos={pos} />
            <PostCardFooter pos={pos} />
            <PostComment pos={pos} />
            <InputPostComment pos={pos} />
          </div>
        ))}
    </div>
  );
};

export default Post;
