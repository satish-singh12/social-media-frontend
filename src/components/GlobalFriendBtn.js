import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFriends, unFriends } from "../redux/actions/profileActions";

const GlobalFriendBtn = ({ classBtn, user }) => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [friend, setFriend] = useState(false);

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFriend(true);
    }
  }, [auth.user.following, user._id]);

  const addFriend = () => {
    setFriend(true);
    dispatch(addFriends({ users: profile.users, user, auth }));
  };
  const removeFriend = () => {
    setFriend(false);
    dispatch(unFriends({ users: profile.users, user, auth }));
  };

  return (
    <>
      {friend ? (
        <button
          className={classBtn}
          style={{ color: "red" }}
          onClick={removeFriend}
        >
          UnFriend
        </button>
      ) : (
        <button
          className={classBtn}
          style={{ color: "green" }}
          onClick={addFriend}
        >
          Add Friend
        </button>
      )}
    </>
  );
};

export default GlobalFriendBtn;
