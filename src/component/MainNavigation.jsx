import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./CSS/MainNavigation.css";

export const MainNavigation = () => {
  return (
    <header className="header px-5">
      <div className="navImgContainer">
        <NavLink to={""}>
          {" "}
          <img src="./navLogo.png" alt="" className="navImg" />
        </NavLink>
      </div>

      <nav className="nav-container"></nav>
    </header>
  );
};
