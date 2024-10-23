import React from "react";
import HomeLeft from "../components/HomeComponents/HomeLeft";
import HomeMid from "../components/HomeComponents/HomeMid";
import "./styles/home.css";
import Banner from "../components/HomeComponents/Banner";

const Home = () => {
  return (
    <div className="home-page-header">
      <Banner />
      <div className="home-body-area">
        <HomeLeft />
        <HomeMid />
      </div>
    </div>
  );
};

export default Home;
