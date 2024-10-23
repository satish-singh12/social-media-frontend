import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFriends, unFriends } from "../../redux/actions/profileActions";

const GlobalFriendBtn = ({ classBtn, user }) => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [friend, setFriend] = useState(false);

  useEffect(() => {
    setFriend(auth.user.following.some((item) => item._id === user._id));
  }, [auth.user.following, user._id]);

  const addFriend = async () => {
    await dispatch(addFriends({ users: profile.users, user, auth, socket }));
    setFriend(true);
  };

  const removeFriend = async () => {
    await dispatch(unFriends({ users: profile.users, user, auth, socket }));
    setFriend(false);
  };

  return (
    <>
      {friend ? (
        <button
          className={classBtn}
          style={{ color: "white", backgroundColor: "red" }}
          onClick={removeFriend}
        >
          UnFriend
        </button>
      ) : (
        <button
          className={classBtn}
          style={{ color: "white", backgroundColor: "green" }}
          onClick={addFriend}
        >
          Add Friend
        </button>
      )}
    </>
  );
};

export default GlobalFriendBtn;
