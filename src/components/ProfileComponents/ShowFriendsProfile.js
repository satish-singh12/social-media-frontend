import React from "react";
import GlobalShortCard from "./GlobalShortCard";
import "../../styles/showFriendsProfile.css";

const ShowFriendsProfile = ({ user }) => {
  return (
    <div className="show-friends-profile">
      <div>
        <h4>
          Friends <span>{user?.friends.length}</span>
        </h4>
      </div>
      {user?.friends?.length > 0 &&
        user.friends.map((friend) => (
          <GlobalShortCard friend={friend} key={friend._id} />
        ))}
    </div>
  );
};

export default ShowFriendsProfile;
