import React, { useEffect, useState } from "react";
import "./styles/navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { Link, useLocation } from "react-router-dom";
import { getDataApi } from "../utils/fetchDataApi";
import UserCard from "../components/GlobalComponents/UserCard";
import LoadIcon from "../images/loading.gif";
import logoImage from "../images/logo.png";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const notification = useSelector((state) => state.notification);
  const { pathname } = useLocation();

  useEffect(() => {
    if (search && auth.token) {
      getDataApi(`search?username=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) => {
          dispatch({
            type: "ALERT",
            payload: {
              error: err.response.data.message,
            },
          });
        });
    }
  }, [search, auth.token, dispatch]);

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
        <div className="container-fluid">
          <Link to="/" navbar-link className="navbar-link-logo-img">
            <img src={logoImage} alt="Logo" className="logo-img" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={`/profile/${auth.user && auth?.user._id}`}
                  className="navbar-link"
                >
                  <div className="user-profile-icon">
                    <img
                      src={
                        auth?.user?.avatar || '<i className="fa fa-user"></i> '
                      }
                      alt="auth?.user?.fullname"
                    />
                  </div>
                  <h6
                    style={{
                      color: "white",
                      marginLeft: "5px",
                    }}
                  >
                    {auth && auth.user?.fullname}
                  </h6>
                </Link>
              </li>
              <li className="nav-notification">
                <Link to="/" className="navbar-link">
                  <i className={`fa fa-home ${isActive("/")}`} title="Home"></i>
                </Link>
              </li>
              <li className="nav-notification">
                <Link to="/notification" className="navbar-link">
                  <i
                    className={`fa fa-bell ${isActive("/notification")}`}
                    title="Notification"
                  ></i>
                  <span className="notification-counter">
                    {notification && notification.data.length}
                  </span>
                </Link>
              </li>
              <li className="nav-message">
                <Link to="/messages" className="navbar-link">
                  <i
                    className={`fa fa-envelope ${isActive("/messages")}`}
                    title="Message"
                  ></i>
                </Link>
              </li>
              <li className="nav-message navbar-link">
                <i
                  onClick={() => dispatch(logout())}
                  className="fa fa-power-off fa-rotate-90"
                  title="Logout"
                ></i>
              </li>
            </ul>
            {/* Section 2: Search Bar */}
            {/* <form className="input-box" onSubmit={handleSearch}> HANDELINGNG SEARCH */}
            <form className="input-box">
              <input
                type="text"
                placeholder="Search Profiles"
                value={search}
                className="search-input"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="button"
                style={{
                  fontSize: "25px",
                  opacity: users.length > 0 ? "0" : "1",
                }}
              >
                <i className="fa fa-search"></i>
              </button>
              <span className="search-close-btn">
                <span
                  style={{
                    fontSize: "30px",
                    opacity: users.length > 0 ? "1" : "0",
                  }}
                  onClick={handleClose}
                >
                  &times;
                </span>
              </span>

              <div className="search-lists">
                {load && (
                  <img
                    src={LoadIcon}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
                {users.length > 0 &&
                  users.map((user) => (
                    <UserCard
                      user={user}
                      key={user._id}
                      handleClose={handleClose}
                    />
                  ))}
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
