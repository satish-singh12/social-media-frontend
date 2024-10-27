import React from "react";
import { useSelector } from "react-redux";
import "./styles/banner.css";
import bannerUrl from "../../images/banner.jpg";

const Banner = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${auth.user.avatar || bannerUrl})`,
      }}
    >
      <div className="banner-content">
        <h3>Welcome to Social Network The Gram</h3>
      </div>
    </div>
  );
};

export default Banner;
