import React, { useState } from "react";
import "../styles/globalCard.css";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";
import GlobalFriendBtn from "./GlobalFriendBtn";
import { Link } from "react-router-dom";

const GlobalCard = ({ user }) => {
  const [showInfo, setShowInfo] = useState(true);
  const [showInfoAbout, setShowInforAbout] = useState(false);

  const auth = useSelector((state) => state.auth);

  const toggleShowInfo = (sinfo) => {
    if (sinfo === "showInfo") {
      setShowInfo(true);
      setShowInforAbout(false);
    } else if (sinfo === "showInfoAbout") {
      setShowInfo(false);
      setShowInforAbout(true);
    }
  };
  return (
    <div className="global-card">
      <div className="global-card-content">
        <div className="global-card-content-top">
          <img src={user.avatar} alt="" />
        </div>
        <div className="global-card-content-middle">
          <img src={user.avatar} alt="" />
        </div>
        <Link
          to={`/profile/${user && user._id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="global-card-content-middle-info">
            <h4>{user.fullname}</h4>
            <h6>{user.username}</h6>
          </div>
        </Link>
        {showInfo && (
          <>
            <div className="global-card-content-bottom">
              <div className="global-card-content-bottom-stat">
                <h6>{user && user.friends && user.friends.length}</h6>
                <p>Followers</p>
              </div>
              <div className="global-card-content-bottom-stat">
                <h6>{user && user.friends && user.following.length}</h6>
                <p>Following</p>
              </div>
              <div className="global-card-content-bottom-stat">
                <h6>0</h6>
                <p>Posts</p>
              </div>

              <div className="global-card-content-bottom-gender">
                <IoPerson
                  style={{
                    color: user.gender === "male" ? "blue" : "rgb(150, 50, 67)",
                  }}
                />
              </div>
            </div>
            {auth.user._id !== user._id && (
              <GlobalFriendBtn
                classBtn="global-card-content-bottom-btn"
                user={user}
              />
            )}
          </>
        )}
        {showInfoAbout && (
          <div className="global-card-content-bottom-about">
            <p className="global-card-content-bottom-about-story">
              {user.story}
            </p>

            <h4 className="global-card-content-bottom-about-email">
              {user.email}
            </h4>
            <h5 className="global-card-content-bottom-about-website">
              {user.website}
            </h5>
          </div>
        )}

        <div className="global-card-content-bottom-navigate">
          <span onClick={() => toggleShowInfo("showInfo")}> o </span>
          <span onClick={() => toggleShowInfo("showInfoAbout")}> o </span>
        </div>
      </div>
    </div>
  );
};

export default GlobalCard;
