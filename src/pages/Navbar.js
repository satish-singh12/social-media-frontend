import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { Link, useLocation } from "react-router-dom";
import { getDataApi } from "../utils/fetchDataApi";
import UserCard from "../components/UserCard";
import LoadIcon from "../images/loading.gif";
import logoImage from "../images/logo.png";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  // const { auth } = useSelector((state) => state);
  const auth = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (search && auth.token) {
      // Make an API call to search for users, using the 'search' term and 'auth.token' for authorization.
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
    <nav className="navbar">
      {/* Section 1: Logo and Website Name */}
      <div className="navbar-section logo">
        <img src={logoImage} alt="Logo" className="logo-img" />
        <h2>Website Name</h2>
      </div>

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
              <UserCard user={user} key={user._id} handleClose={handleClose} />
            ))}
        </div>
      </form>

      {/* Section 3: User icons */}
      <div className="navbar-section user-icons">
        <div className="user-profile">
          <Link to={`/profile/${auth.user && auth?.user._id}`}>
            <div className="user-profile-icon">
              <img
                src={auth?.user?.avatar || '<i className="fa fa-user"></i> '}
                alt="auth?.user?.fullname"
              />
            </div>
          </Link>

          <h6
            style={{
              color: "white",
              marginLeft: "5px",
            }}
          >
            {auth && auth.user?.fullname}
          </h6>
        </div>
        <div>
          <Link to="/">
            <i className={`fa fa-home ${isActive("/")}`}></i>
          </Link>
          <Link to="/notification">
            <i className={`fa fa-bell ${isActive("/notification")}`}></i>
          </Link>
          <Link to="/message">
            <i className={`fa fa-envelope ${isActive("/message")}`}></i>
          </Link>

          <Link to="/explore">
            <i className={`fa fa-compass ${isActive("/explore")}`}></i>{" "}
            {/* Explore icon */}
          </Link>

          <i
            onClick={() => dispatch(logout())}
            className="fa fa-power-off fa-rotate-90"
          ></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
