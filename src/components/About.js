import React, { useEffect, useState } from "react";
import { getProfileUsers } from "../redux/actions/profileActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const About = () => {
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

  return (
    <div className="profile-about">
      {userData.length > 0 &&
        userData.map((user) => (
          <div className="about-container" key={user._id}>
            <div className="profile-about-container-top">
              <h4>Bio</h4>
              {/* <p>{user.story}</p> */}
            </div>

            <div className="profile-about-container-center">
              <h4>Address</h4>
              <p>{user.address}</p>
            </div>

            <div className="profile-about-container-bottom">
              <div className="profile-about-container-bottom-info">
                <h6>Joined</h6>
                <p>{user.createdAt}</p>
              </div>
              <div className="profile-about-container-bottom-info">
                <h6>Gender</h6>
                <p>{user.gender}</p>
              </div>
              <div className="profile-about-container-bottom-info">
                <h6>Phone</h6>
                <p>{user.phone}</p>
              </div>
              <div className="profile-about-container-bottom-info">
                <h6>Email</h6>
                <p>{user.email}</p>
              </div>
              <div className="profile-about-container-bottom-info">
                <h6>Website</h6>
                <p>{user.website}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default About;
