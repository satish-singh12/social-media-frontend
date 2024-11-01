import React from "react";
import FollowingCard from "./FollowingCard";

const Following = ({ userData, profile, auth, id }) => {
  return (
    <div>
      {userData.length > 0 &&
        userData.map((user) => (
          <FollowingCard user={user.following} key={user._id} />
        ))}
    </div>
  );
};

export default Following;
