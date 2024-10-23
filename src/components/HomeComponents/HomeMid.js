import React from "react";
import Status from "./Status";
import Post from "../PostsComponents/Posts";
import { useSelector } from "react-redux";
import "./styles/homeMid.css";
import Posts from "../PostsComponents/Posts";

const HomeMid = () => {
  const homePost = useSelector((state) => state.homePost);
  return (
    <div className="home-mid">
      <Status />
      {homePost && homePost.loading ? (
        <p>Loading... </p>
      ) : homePost.results === 0 ? (
        <h4>No Post Available</h4>
      ) : (
        // <Post />
        <Posts />
      )}
    </div>
  );
};

export default HomeMid;
