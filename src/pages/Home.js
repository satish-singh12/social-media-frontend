import React from "react";
import HomeLeft from "../components/HomeComponents/HomeLeft";
import HomeMid from "../components/HomeComponents/HomeMid";
import HomeRight from "../components/HomeComponents/HomeRight";
import "../styles/home.css";
import Banner from "../components/HomeComponents/Banner";

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
