import React from "react";
import "./styles/pageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="not-found-header">
      <div className="not-found">
        {" "}
        <h1>404: Page Not Found!</h1>
        <p>So Sorry!</p>
        <p>
          The page you are looking for cannot be found. Go to home page{" "}
          <Link to="/">here</Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
