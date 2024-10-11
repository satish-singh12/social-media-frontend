import React, { useEffect, useState } from "react";
import Info from "../components/ProfileComponents/Info";
import Posts from "../components/PostsComponents/Posts";
import About from "../components/ProfileComponents/About";
import "../styles/profile.css";
import { getProfileUsers } from "../redux/actions/profileActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { IoBookmarks } from "react-icons/io5";
import Following from "../components/ProfileComponents/Following";
import Friends from "../components/ProfileComponents/Friends";

const Profile = () => {
  const [userData, setUserData] = useState([]);

  const [showAccount, setShowAccount] = useState(true);
  const [showFriend, setShowFriend] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleToggle = (ht) => {
    if (ht === "showAccount") {
      setShowFriend(false);
      setShowFollowing(false);
      setShowSaved(false);
      setShowAccount(true);
    } else if (ht === "showFriend") {
      setShowFriend(true);
      setShowFollowing(false);
      setShowSaved(false);
      setShowAccount(false);
    } else if (ht === "showFollowing") {
      setShowFriend(false);
      setShowFollowing(true);
      setShowSaved(false);
      setShowAccount(false);
    } else if (ht === "showSaved") {
      setShowFriend(false);
      setShowFollowing(false);
      setShowSaved(true);
      setShowAccount(false);
    }
  };

  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  //At the start redux store is undefined, it will take time.
  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(
        getProfileUsers({ users: profile.users && profile.users, id, auth })
      );
    }
  }, [id, auth, profile.users, dispatch]);

  useEffect(() => {
    if (profile.users) {
      const newData = profile.users.filter((user) => user._id === id);
      if (newData.length > 0) {
        setUserData(newData);
      }
    }
  }, [profile.users, id]);

  return (
    <div className="profile">
      <Info userData={userData} profile={profile} auth={auth} id={id} />
      <div className="profile-header">
        <div className="profile-header-items">
          <div
            className="button-icons"
            onClick={() => handleToggle("showAccount")}
          >
            <RiAccountPinCircleFill />
          </div>
          <hr />
          <div
            className="button-icons"
            onClick={() => handleToggle("showFriend")}
          >
            <MdPeopleAlt />
          </div>
          <hr />
          <div
            className="button-icons"
            onClick={() => handleToggle("showFollowing")}
          >
            <IoPersonAdd />
          </div>
          <hr />
          <div
            className="button-icons"
            onClick={() => handleToggle("showSaved")}
          >
            <IoBookmarks />
          </div>
        </div>
      </div>

      {showAccount && (
        <div className="profile-body">
          <div className="profile-body-left">
            <About userData={userData} profile={profile} auth={auth} id={id} />
          </div>

          <div className="profile-body-center">
            <Posts />
          </div>
          {/* 
          <div className="profile-body-right">
            <Posts />
          </div> */}
        </div>
      )}
      {showFriend && userData.length > 0 && (
        <Friends userData={userData} profile={profile} auth={auth} id={id} />
      )}
      {showFollowing && userData.length > 0 && (
        <Following userData={userData} profile={profile} auth={auth} id={id} />
      )}
      {showSaved && <h3>Saved</h3>}
    </div>
  );
};

export default Profile;
