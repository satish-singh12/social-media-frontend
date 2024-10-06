import React from "react";
import { useSelector } from "react-redux";
import PostCardHeader from "./PostCardHeader";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";

const Posts = () => {
  const { homePost } = useSelector((state) => state);

  return (
    <div>
      {homePost &&
        homePost.post.length > 0 &&
        homePost.post.map((pos) => (
          <div
            className="post-card"
            key={pos._id}
            style={{
              backgroundColor: "orange",
              padding: "1rem",
              margin: "1rem",
            }}
          >
            <PostCardHeader pos={pos} />
            <PostCardBody pos={pos} />
            <PostCardFooter pos={pos} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
