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
        user.following.map((friend, index) => (
          <GlobalShortCard friend={friend} key={index} />
        ))}
    </div>
  );
};

export default ShowFollowingProfile;
