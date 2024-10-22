import React from "react";
import "./styles/Navbar1.css"; // Ensure to import your CSS file

const Navbar1 = () => {
  const handleSearchToggle = () => {
    document.querySelector(".nav").classList.toggle("search");
    document.querySelector(".nav").classList.toggle("no-search");
    document.querySelector(".search-input").classList.toggle("search-active");
  };

  const handleMenuToggle = () => {
    document.querySelector(".nav").classList.toggle("mobile-nav");
    document.getElementById("mobile-menu").classList.toggle("is-active");
  };

  return (
    <div className="page-wrapper">
      <div className="nav-wrapper">
        <div className="grad-bar"></div>
        <nav className="navbar">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png"
            alt="Company Logo"
          />
          <div
            className="menu-toggle"
            id="mobile-menu"
            onClick={handleMenuToggle}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className="nav no-search">
            <li className="nav-item">
              <a href="#">Home</a>
            </li>
            <li className="nav-item">
              <a href="#">About</a>
            </li>
            <li className="nav-item">
              <a href="#">Work</a>
            </li>
            <li className="nav-item">
              <a href="#">Careers</a>
            </li>
            <li className="nav-item">
              <a href="#">Contact Us</a>
            </li>
            <i
              className="fas fa-search"
              id="search-icon"
              onClick={handleSearchToggle}
            ></i>
            <input
              className="search-input"
              type="text"
              placeholder="Search.."
            />
          </ul>
        </nav>
      </div>
      {/* <section className="headline">
        <h1>Responsive Navigation</h1>
        <p>Using CSS grid and flexbox to easily build navbars!</p>
      </section> */}
      {/* <section className="features">
        <div className="feature-container">
          <img
            src="https://cdn-images-1.medium.com/max/2000/1*HFAEJvVOq4AwFuBivNu_OQ.png"
            alt="Flexbox Feature"
          />
          <h2>Flexbox Featured</h2>
          <p>
            This pen contains use of flexbox for the headline and feature
            section! We use it in our mobile navbar and show the power of mixing
            CSS grid and flexbox.
          </p>
        </div>
        <div className="feature-container">
          <img
            src="https://blog.webix.com/wp-content/uploads/2017/06/20170621-CSS-Grid-Layout-710x355-tiny.png"
            alt="CSS Grid Feature"
          />
          <h2>CSS Grid Navigation</h2>
          <p>
            While flexbox is used for the mobile navbar, CSS grid is used for
            the desktop navbar showing many ways we can use both.
          </p>
        </div>
        <div className="feature-container">
          <img
            src="https://www.graycelltech.com/wp-content/uploads/2015/06/GCT-HTML5.jpg"
            alt="Basic HTML5 Feature"
          />
          <h2>Basic HTML5</h2>
          <p>
            This pen contains basic HTML to setup the page to display the
            responsive navbar.
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default Navbar1;
