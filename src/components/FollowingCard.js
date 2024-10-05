import React from "react";
import GlobalCard from "./GlobalCard";

const FollowingCard = ({ user }) => {
  console.log(user);
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
          {user.length} <span>Following</span>
        </h4>
      </div>
      <div
        style={{
          display: "grid",
          width: "1200px",
          maxWidth: "100%",
          margin: "1rem auto",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Adjust the number of columns based on card size
          gap: "2rem", // Adds space between the cards
          gridAutoFlow: "row", // Ensures that items are placed row by row
        }}
      >
        {user.length > 0 && user.map((flw) => <GlobalCard user={flw} />)}
      </div>
    </>
  );
};

export default FollowingCard;
