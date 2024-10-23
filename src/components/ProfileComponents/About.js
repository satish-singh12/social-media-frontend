import React, { useEffect, useState } from "react";
import { getProfileUsers } from "../../redux/actions/profileActions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./styles/profileAbout.css";
import moment from "moment";

const About = ({ userData, profile, auth, id }) => {
  return (
    <div className="profile-about">
      {userData &&
        userData.length > 0 &&
        userData.map((user, index) => (
          <div className="about-container" key={index}>
            <div className="profile-about-containt-top">
              <h4 className="profile-about-containt-top-head">About Me:</h4>
              {/* <p>{user.story}</p> */}
            </div>

            <div className="profile-about-content-center">
              {/* <h4 className="profile-about-content-center-story">Story</h4> */}
              <p>{user.story}</p>
            </div>

            <div className="profile-about-content-bottom">
              <div className="profile-about-content-bottom-info">
                <h6 className="profile-about-content-bottom-info-head">
                  Joined
                </h6>
                <p className="profile-about-content-bottom-info-body">
                  {moment(user.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="profile-about-content-bottom-info">
                <h6 className="profile-about-content-bottom-info-head">
                  Gender
                </h6>
                <p className="profile-about-content-bottom-info-body">
                  {user.gender}
                </p>
              </div>
              <div className="profile-about-content-bottom-info">
                <h6 className="profile-about-content-bottom-info-head">
                  Phone
                </h6>
                <p className="profile-about-content-bottom-info-body">
                  {user.phone}
                </p>
              </div>
              <div className="profile-about-content-bottom-info">
                <h6 className="profile-about-content-bottom-info-head">
                  Email
                </h6>
                <p className="profile-about-content-bottom-info-body">
                  {user.email}
                </p>
              </div>
              <div className="profile-about-content-bottom-info">
                <h6 className="profile-about-content-bottom-info-head">
                  Website
                </h6>
                <p className="profile-about-content-bottom-info-body">
                  {user.website}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default About;
