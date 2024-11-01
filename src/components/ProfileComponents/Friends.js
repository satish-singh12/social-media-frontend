import React from "react";
import FriendsCard from "./FriendsCard";

const Friends = ({ userData, profile, auth, id }) => {
  return (
    <div>
      {userData.length > 0 &&
        userData.map((user) => (
          <FriendsCard key={user._id} user={user.friends} />
        ))}
    </div>
  );
};

export default Friends;
