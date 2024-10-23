import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/notification.css";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { readNotification } from "../redux/actions/notificationActions";
import { CiUnread } from "react-icons/ci";
import { CiRead } from "react-icons/ci";
import { deleteNotificationsAll } from "../redux/actions/notificationActions";

const Notifications = () => {
  const notification = useSelector((state) => state.notification);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isReadNotification = (dt) => {
    console.log(dt);
    dispatch(readNotification({ dt, auth }));
  };

  const handleDeleteAll = () => {
    // if (!notification || !notification.data) {
    //   console.error("Notification data is undefined");
    //   return;
    // }

    const newArr = notification?.data?.filter((item) => item.isRead === false);

    if (newArr.length === 0) {
      dispatch(deleteNotificationsAll({ auth }));
      return;
    }

    if (
      window.confirm(
        `You have ${newArr.length} notifications. Are you sure you want to delete?`
      )
    ) {
      dispatch(deleteNotificationsAll({ auth }));
    }
  };

  return (
    <div className="notifications">
      <div className="notification-header">
        <h4>Notifications</h4>
        <h5
          className="notification-header-delete-all"
          onClick={handleDeleteAll}
        >
          Delete All
        </h5>
        <samll>
          <FaBell />
        </samll>
      </div>
      {notification.data.length > 0 &&
        notification.data.map((dt) => (
          <div className="notification-data" key={dt._id}>
            <Link
              to={`${dt.url}`}
              className="no-decoration"
              onClick={() => isReadNotification(dt)}
            >
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
              {dt.isRead ? (
                <CiRead
                  className="notification-bottom-read-unread"
                  style={{ color: "green" }}
                />
              ) : (
                <CiUnread
                  className="notification-bottom-read-unread"
                  style={{ color: "red" }}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notifications;
