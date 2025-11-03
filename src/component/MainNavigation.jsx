import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./MainNavigation.css";

export const MainNavigation = () => {
  return (
    <header className="header">
      <h1 className="h1">GAMESHOP</h1>
      <nav className="nav-container">
        <ul className="list">
          <li>
            <NavLink to={""}>GAME</NavLink>
          </li>
          <li>
            <NavLink to={"login"}>LOGIN</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
