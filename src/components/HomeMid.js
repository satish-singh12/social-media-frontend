import React from "react";
import Status from "./Status";
import Post from "./Posts";
import { useSelector } from "react-redux";
import "../styles/homeMid.css";

const HomeMid = () => {
  const { homePost } = useSelector((state) => state);
  return (
    <div className="home-mid">
      <Status />
      {homePost && homePost.loading ? (
        <p>Loading... </p>
      ) : homePost.results === 0 ? (
        <h4>No Post Available</h4>
      ) : (
        <Post />
      )}
    </div>
  );
};

export default HomeMid;
