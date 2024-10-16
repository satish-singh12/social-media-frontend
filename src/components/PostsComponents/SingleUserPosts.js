import React from "react";
import PostCardHeader from "./PostCardHeader";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import PostComment from "./PostComment";
import InputPostComment from "./InputPostComment";

const SingleUserPosts = ({ userPosts, profile, auth, id }) => {
  return (
    <div>
      {userPosts &&
        userPosts?.length > 0 &&
        userPosts.map((pos, index) => (
          <div
            className="post-card"
            key={index}
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

export default SingleUserPosts;
