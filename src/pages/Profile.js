import React, { useEffect, useState } from "react";
import Info from "../components/ProfileComponents/Info";
import Posts from "../components/PostsComponents/Posts";
import About from "../components/ProfileComponents/About";
import "../styles/profile.css";
import {
  getProfileUserPosts,
  getProfileUsersData,
} from "../redux/actions/profileActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { IoBookmarks } from "react-icons/io5";
import Following from "../components/ProfileComponents/Following";
import Friends from "../components/ProfileComponents/Friends";
import SingleUserPosts from "../components/PostsComponents/SingleUserPosts";
import SavedPost from "../components/ProfileComponents/SavedPost";
import ProfilePhotoShow from "../components/ProfileComponents/ProfilePhotoShow";
import ProfileVideoShow from "../components/ProfileComponents/ProfileVideoShow";
import ShowFriendsProfile from "../components/ProfileComponents/ShowFriendsProfile";
import ShowFollowingProfile from "../components/ProfileComponents/ShowFollowingProfile";

const Profile = () => {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const post = useSelector((state) => state.homePost.post);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [showAccount, setShowAccount] = useState(true);
  const [showFriend, setShowFriend] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleToggle = (ht) => {
    setShowAccount(ht === "showAccount");
    setShowFriend(ht === "showFriend");
    setShowFollowing(ht === "showFollowing");
    setShowSaved(ht === "showSaved");
  };

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      // Set logged-in user's data if viewing their own profile
      setUserData([auth.user]);
    } else {
      // Check if the user's data is already in the profile
      const newData = profile?.users?.filter((user) => user._id === id);

      if (newData && newData.length > 0) {
        setUserData(newData);
      } else {
        // Dispatch action to fetch the profile user data if not found
        dispatch(
          getProfileUsersData({
            users: profile.users || [], // Fallback to empty array
            id,
            auth,
          })
        );
      }
    }
  }, [id, auth, profile.users, dispatch]);

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      // Fetch the logged-in user's posts only once
      if (profile.userposts && profile.userposts.length > 0) {
        const newPosts = profile?.userposts.find((post) => post._id === id);
        setUserPosts(newPosts); // Directly set posts if they exist
      } else {
        dispatch(getProfileUsersData({ id, auth })); // Fetch user posts from API
      }
    } else {
      // Fetch other user's posts only if they haven't been fetched yet
      if (profile.ids.every((item) => item !== id)) {
        dispatch(getProfileUsersData({ id, auth }));
      } else {
        const newPosts = profile?.userposts.find((post) => post._id === id);
        setUserPosts(newPosts ? newPosts : []);
      }
    }
  }, [profile.userposts, id, auth, dispatch]);

  useEffect(() => {
    const newProfileImages = profile?.userposts?.filter(
      (item) => item.posts.images || []
    );
    setPhotos(newProfileImages);
  }, [profile.userposts]);

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
            <ShowFriendsProfile user={auth.user} />
            <ShowFollowingProfile user={auth.user} />
          </div>

          <div className="profile-body-center">
            <SingleUserPosts
              userPosts={userPosts?.posts}
              profile={profile}
              auth={auth}
              id={id}
            />
          </div>

          <div className="profile-body-right">
            <ProfilePhotoShow photos={photos} />
            <ProfileVideoShow photos={photos} />
          </div>
        </div>
      )}
      {showFriend && userData.length > 0 && (
        <Friends userData={userData} profile={profile} auth={auth} id={id} />
      )}
      {showFollowing && userData.length > 0 && (
        <Following userData={userData} profile={profile} auth={auth} id={id} />
      )}
      {showSaved && <SavedPost auth={auth} />}
    </div>
  );
};

export default Profile;
