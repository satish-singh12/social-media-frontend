import React from "react";
import GlobalCard from "./GlobalCard";

const FriendsCard = ({ user }) => {
  return (
    <>
      <div
        style={{
          width: "1200px",
          maxWidth: "100%",
          margin: "1rem auto",
          background: "white",
          minHeight: "20px",
          padding: "1rem",
        }}
      >
        <h4 style={{ textAlign: "center" }}>
          {user.length} <span>Friends</span>
        </h4>
      </div>
      <div
        style={{
          display: "grid",
          width: "1200px",
          maxWidth: "100%",
          margin: "1rem auto",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem",
          gridAutoFlow: "row",
        }}
      >
        {user.length > 0 &&
          user.map((frd) => <GlobalCard user={frd} key={frd._id} />)}
      </div>
    </>
  );
};

export default FriendsCard;
