import React from "react";
import { useSelector } from "react-redux";
import PostCardHeader from "./PostCardHeader";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import PostComment from "./PostComment";
import InputPostComment from "./InputPostComment";

const Posts = () => {
  // const { homePost } = useSelector((state) => state);
  const posts = useSelector((state) => state.homePost.post);
  // console.log(homePost);

  return (
    <div>
      {posts &&
        posts.length > 0 &&
        posts.map((pos) => (
          // {homePost &&
          //   homePost.posts.length > 0 &&
          //   homePost.posts.map((pos) => (
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

export default Posts;
