import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/notification.css";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Notifications = () => {
  const notification = useSelector((state) => state.notification);
  console.log(notification);
  return (
    <div className="notifications">
      <div className="notification-header">
        <h4>Notifications</h4>
        <samll>
          <FaBell />
        </samll>
      </div>
      {notification.data.length > 0 &&
        notification.data.map((dt, index) => (
          <div className="notification-data" key={index}>
            <Link to={`${dt.url}`} className="no-decoration">
              <div className="notification-top">
                <img src={dt.user.avatar} alt="avatar" />
                <div>
                  <h4>
                    {dt.user.fullname} {dt.text}
                  </h4>
                  <h6>{dt.content.slice(0, 20)}</h6>
                </div>
                <img src={dt.image} alt="image" />
              </div>
            </Link>
            <div className="notification-bottom">
              <small>{moment(dt.createdAt).fromNow()}</small>
              {dt.isRead ? <p> 0 </p> : <p style={{ color: "red" }}>0</p>}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notifications;
