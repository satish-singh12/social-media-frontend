import React, { useEffect, useState } from "react";
import Info from "../components/Info";
import Posts from "../components/Posts";
import About from "../components/About";
import "../styles/profile.css";
import { getProfileUsers } from "../redux/actions/profileActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
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
  }, [id, auth, profile.users, dispatcth]);

  return (
    <div className="profile">
      <Info userData={userData} profile={profile} auth={auth} id={id} />
      <div className="profile-body">
        <div className="profile-body-left">
          <About userData={userData} profile={profile} auth={auth} id={id} />
        </div>

        <div className="profile-body-center">
          <Posts />
        </div>

        <div className="profile-body-right">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Profile;
