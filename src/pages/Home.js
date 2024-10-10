import React from "react";
import HomeLeft from "../components/HomeLeft";
import HomeMid from "../components/HomeMid";
import HomeRight from "../components/HomeRight";
import "../styles/home.css";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="home-page-header">
      {/* <h1>Welcome to Home Page</h1> */}
      <Banner />
      <div className="home-body-area">
        <HomeLeft />
        <HomeMid />
        <HomeRight />
      </div>
    </div>
  );
};

export default Home;
