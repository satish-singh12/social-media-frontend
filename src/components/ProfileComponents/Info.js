import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/profileInfo.css";
import EditProfile from "./EditProfile";
import GlobalFriendBtn from "./GlobalFriendBtn";

const Info = ({ userData, profile, auth, id }) => {
  const [onEdit, setOnEdit] = useState(false);

  return (
    <div className="profile-info">
      {userData && userData.length > 0 ? (
        userData.map((user, index) => (
          <div className="profile-info-container" key={index}>
            <div className="profile-info-top">
              <img src={user.avatar} alt="user.username" />
            </div>
            <div className="profile-info-center">
              {/* WILL USE HERE AVATAR UI IN PLACE OF IMAGE*/}
              <img
                className="profile-info-center-avatar"
                src={user.avatar}
                alt={user.username}
              />
              {user._id && auth && user._id === auth.user._id ? (
                <button
                  className="profile-info-center-button"
                  onClick={() => setOnEdit(true)}
                >
                  EDIT PROFILE
                </button>
              ) : (
                <GlobalFriendBtn
                  classBtn="profile-info-center-button"
                  user={user && user}
                />
              )}
            </div>

            <div className="profile-info-bottom">
              <div className="profile-info-bottom-left">
                <div className="profile-info-state">
                  <h6 className="profile-info-stat-number">
                    {user && user.friends?.length}
                  </h6>
                  <h6 className="profile-info-stat-desc">FRIENDS</h6>
                </div>
                <div className="profile-info-stat">
                  <h6 className="profile-info-stat-number">
                    {user.following?.length}
                  </h6>
                  <h6 className="profile-info-stat-desc">FOLLOWING</h6>
                </div>
              </div>

              <div className="profile-info-bottom-center">
                <h4 className="profile-info-fullname">{user.fullname}</h4>
                <h5 className="profile-info-username">{user.username}</h5>
              </div>

              <div className="profile-info-bottom-right">
                <div className="profile-info-stat">
                  <h6 className="profile-info-stat-number">
                    {user.friends?.length}
                  </h6>
                  <h6 className="profile-info-stat-desc">POSTS</h6>
                </div>
              </div>
            </div>
            {onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />}
          </div>
        ))
      ) : (
        <p>Loading user data...</p> // Add this fallback or some loading indicator
      )}
    </div>
  );
};

export default Info;
