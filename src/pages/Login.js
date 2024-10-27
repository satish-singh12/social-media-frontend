import React, { useState } from "react";
import "./styles/loginRegister.css";
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
            <img
              src={logoImage}
              alt="Logo"
              className="login-register-logo-img"
            />
          </h1>
          <h3>"Time To Be Social, Go Social"</h3>
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
                autoComplete="current-password"
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

          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
