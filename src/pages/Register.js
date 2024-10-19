import React, { useEffect, useState } from "react";
import "../styles/loginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/actions/authActions";
import logoImage from "../images/logo.png";

const Register = () => {
  const initialState = {
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  };

  const [showPass, setShowPass] = useState(false);
  const [showcfPass, setShowcfPass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const { username, fullname, email, password, confirmPassword, gender } =
    userData;

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1>
            <img src={logoImage} alt="Logo" className="logo-img" />
          </h1>
          {/* <h1>Social Media</h1> */}
          <h3 style={{ marginTop: "1rem" }}>
            {/* “Don’t use "TheGram" to impress people; use it to impact people.” */}
          </h3>
        </div>
      </div>

      <div className="right">
        <h5>Register</h5>
        <p>
          You already have an account? <Link to="/">Login your account</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="text"
              value={fullname}
              name="fullname"
              onChange={handleChange}
              placeholder={
                alert.fullname ? `${alert.fullname}` : "Enter your fullname"
              }
              style={{ backgroundColor: `${alert.fullname ? "#0006" : " "}` }}
            />
            {alert.fullname ? (
              <small className="alert-input">{alert.fullname}*</small>
            ) : (
              " "
            )}
            <input
              type="text"
              value={username.toLocaleLowerCase().replace(/ /g, "")}
              name="username"
              onChange={handleChange}
              placeholder={
                alert.username ? `${alert.username}` : "Enter your username"
              }
            />
            {alert.username ? (
              <small className="alert-input">{alert.username}*</small>
            ) : (
              " "
            )}
            <div className="inputs">
              <input
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
                placeholder={
                  alert.email ? `${alert.email}` : "Enter your email"
                }
              />
              {alert.email ? (
                <small className="alert-input">{alert.email}*</small>
              ) : (
                " "
              )}
              <div className="password-input">
                <input
                  type={showPass ? "type" : "password"}
                  value={password}
                  name="password"
                  onChange={handleChange}
                  placeholder={
                    alert.password ? `${alert.password}` : "Enter your password"
                  }
                />
                {alert.password ? (
                  <small className="alert-input">{alert.password}*</small>
                ) : (
                  " "
                )}
                <small
                  className="show-hide-password"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "Hide" : "Show"}
                </small>
              </div>
              <div className="password-input">
                <input
                  type={showcfPass ? "type" : "password"}
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder={
                    alert.confirmPassword
                      ? `${alert.confirmPassword}`
                      : "Enter your password again"
                  }
                />
                <small
                  className="show-hide-password"
                  onClick={() => setShowcfPass(!showcfPass)}
                >
                  {showcfPass ? "Hide" : "Show"}
                </small>
              </div>
              {alert.confirmPassword ? (
                <small>{alert.confirmPassword}</small>
              ) : (
                " "
              )}
              <select
                className="select-gender"
                value={gender}
                name="gender"
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
