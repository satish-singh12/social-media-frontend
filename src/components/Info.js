import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/profileInfo.css";
import { getProfileUsers } from "../redux/actions/profileActions";

const Info = () => {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatcth = useDispatch();

  //At the start redux store is undefined, it will take time.
  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatcth(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth.user, auth]);

  //console.log(userData);

  return (
    <div className="profile-info">
      {userData.length > 0 &&
        userData.map((user) => (
          <div className="profile-info-container" key={user._id}>
            <div className="profile-info-top">
              <img src={user.avatar} alt="user.username" />
            </div>
            <div className="profile-info-center">
              {/* WILL USE HERE AVATAR UI IN PLACE OF IMAGE*/}
              <img
                className="profile-info-center-avatar"
                src={user.avatar}
                alt="user.username"
              />
              <button className="profile-info-center-button">Add Friend</button>
            </div>

            <div className="profile-info-bottom">
              <div className="profile-info-bottom-left">
                <div className="profile-info-state">
                  <h6 className="profile-info-stat-number">
                    {user.friends.length}
                  </h6>
                  <h6 className="profile-info-stat-desc">FRIENDS</h6>
                </div>
                <div className="profile-info-stat">
                  <h6 className="profile-info-stat-number">
                    {user.following.length}
                  </h6>
                  <h6 className="profile-info-stat-desc">FOLLOWING</h6>
                </div>
              </div>

              <div className="profile-info-bottom-center">
                <h3 className="profile-info-fullname">{user.fullname}</h3>
                <h5 className="profile-info-username">{user.username}</h5>
              </div>

              <div className="profile-info-bottom-right">
                <div className="profile-info-stat">
                  <h6 className="profile-info-stat-number">
                    {user.friends.length}
                  </h6>
                  <h6 className="profile-info-stat-desc">POSTS</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Info;
