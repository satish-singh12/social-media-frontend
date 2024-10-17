import React from "react";
import GlobalShortCard from "./GlobalShortCard";
import "../../styles/showFriendsProfile.css";

const ShowFollowingProfile = ({ user }) => {
  return (
    <div className="show-friends-profile">
      <div>
        <h4>
          Following <span>{user?.following.length}</span>
        </h4>
      </div>
      {user?.following?.length > 0 &&
        user.following.map((friend) => (
          <GlobalShortCard friend={friend} key={friend._id} />
        ))}
    </div>
  );
};

export default ShowFollowingProfile;
