import React, { useEffect, useState } from "react";
import "./styles/profileInfo.css";
import EditProfile from "./EditProfile";
import GlobalFriendBtn from "./GlobalFriendBtn";
import ResetPassword from "./ResetPassword";

const Info = ({ userData, profile, auth, id }) => {
  const [onEdit, setOnEdit] = useState(false);
  const [onReset, setOnReset] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile.userposts && profile.userposts.length > 0) {
      const userId = auth?.user?._id === id ? auth.user._id : id;
      const userPosts = profile.userposts.find((p) => p._id === userId);
      if (userPosts && userPosts.posts) {
        setPostCount(userPosts.posts.length);
      } else {
        setPostCount(0);
      }
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [profile.userposts, id, auth]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="profile-info">
      {userData && userData.length > 0 ? (
        userData.map((user, index) => (
          <div className="profile-info-container" key={index}>
            <div className="profile-info-top">
              <img src={user.avatar} alt={user.username} />
            </div>
            <div className="profile-info-center">
              {user.avatar ? (
                <img
                  className="profile-info-center-avatar"
                  src={user.avatar}
                  alt={user.username}
                />
              ) : (
                <i
                  className="fa fa-user default-avatar-icon"
                  style={{ fontSize: "50px" }}
                ></i>
              )}

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
              <div>
                <button
                  className="profile-info-reset-password-button"
                  onClick={() => setOnReset(true)}
                >
                  Reset password
                </button>
              </div>
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
                  <h6 className="profile-info-stat-number">{postCount}</h6>
                  <h6 className="profile-info-stat-desc">POSTS</h6>
                </div>
              </div>
            </div>
            {onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />}
            {onReset && <ResetPassword user={user} setOnReset={setOnReset} />}
          </div>
        ))
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Info;
