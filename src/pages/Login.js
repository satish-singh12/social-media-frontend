import React, { useState } from "react";
import "../styles/loginRegister.css";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import logoImage from "../images/logo.png";

const Login = () => {
  const initialState = { email: "", password: "" };

  const [showPass, setShowPass] = useState(false);
  const [userData, setUserData] = useState(initialState);

  const dispatch = useDispatch();

  const { email, password } = userData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(login(userData));
  };

  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1>
            <img src={logoImage} alt="Logo" className="logo-img" />
          </h1>
          {/* <h1>Social Media</h1> */}
          <h3>
            {/* “Don’t use "TheGram" to impress people; use it to impact people.” */}
          </h3>
          <span>
            <p>login with social media</p>
            <Link to="">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </Link>
            <Link to="">
              <i className="fa fa-twitter" aria-hidden="true"></i> Login with
              Twitter
            </Link>
          </span>
        </div>
      </div>

      <div className="right">
        <h5>Login</h5>
        <p>
          Don't have an account? <Link to="/register">Creat your account</Link>{" "}
          it takes less than a minute
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <div className="password-input">
              <input
                type={showPass ? "type" : "password"}
                value={password}
                autocomplete="current-password"
                name="password"
                onChange={handleChange}
                placeholder="Enter you password"
              />
              <small
                className="show-hide-password"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Hide" : "Show"}
              </small>
            </div>
          </div>

          <div className="remember-me--forget-password">
            <label>
              <input type="checkbox" name="item" checked onChange={() => {}} />
              <span className="text-checkbox">Remember me</span>
            </label>
            <p>forget password?</p>
          </div>

          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
