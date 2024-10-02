import React from "react";
import Info from "../components/Info";
import Posts from "../components/Posts";
import About from "../components/About";
import "../styles/profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <Info />
      <div className="profile-body">
        <div className="profile-body-left">
          <About />
        </div>

        <div className="profile-body-left">
          <Posts />
        </div>

        <div className="profile-body-center">
          <About />
        </div>
      </div>
    </div>
  );
};

export default Profile;
