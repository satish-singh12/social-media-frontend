import React from "react";
import PostCardHeader from "./PostCardHeader";
import PostCardBody from "./PostCardBody";
import PostCardFooter from "./PostCardFooter";
import PostComment from "./PostComment";
import InputPostComment from "./InputPostComment";
import "./styles/singleUserPosts.css";

const SingleUserPosts = ({ userPosts, profile, auth, id }) => {
  return (
    <div>
      {userPosts && userPosts?.length > 0 ? (
        userPosts.map((pos, index) => (
          <div className="post-card" key={index}>
            <PostCardHeader pos={pos} />
            <PostCardBody pos={pos} />
            <PostCardFooter pos={pos} />
            <PostComment pos={pos} />
            <InputPostComment pos={pos} />
          </div>
        ))
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "2rem",
            fontSize: "1.5rem",
            color: "gray",
          }}
        >
          NO POST FOUND
        </div>
      )}
    </div>
  );
};

export default SingleUserPosts;
