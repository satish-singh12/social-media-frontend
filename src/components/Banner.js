// import React from "react";
// import { useSelector } from "react-redux";

// const Banner = () => {
//   const auth = useSelector((state) => state.auth);
//   return (
//     <div
//       style={{
//         backgroundImage: `url(${auth.user.avatar})`,
//         height: "250px",
//         marginTop: "24px",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         width: "1000px",
//         margin: "auto",
//         borderRadius: "20px",
//         position: "relative",
//       }}
//     >
//       <div
//         style={{
//           //   position: "absolute",

//           color: "white",
//           fontFamily: "cursive",
//           background: "#fad0c4",
//           backgroundImage: "linear-gradient(315deg, #a17c72 rgb(158, 64, 64))",
//           height: "250px",
//         }}
//       >
//         <h3>Welcome to Social Network The Gram</h3>
//       </div>
//     </div>
//   );
// };

// export default Banner;

import React from "react";
import { useSelector } from "react-redux";
import "../styles/banner.css"; // Import external CSS

const Banner = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${auth.user.avatar})`,
      }}
    >
      <div className="banner-content">
        <h3>Welcome to Social Network The Gram</h3>
      </div>
    </div>
  );
};

export default Banner;
