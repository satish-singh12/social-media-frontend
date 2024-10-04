import React from "react";
import GlobalCard from "./GlobalCard";

const FriendsCard = ({ user }) => {
  console.log(user);
  return (
    <div>
      FriendCard
      {user.length > 0 && user.map((frd) => <GlobalCard user={frd} />)}
    </div>
  );
};

export default FriendsCard;
