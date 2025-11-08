import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./CSS/Adminnavigation.css";

export const AdminNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="header-admin px-5">
        <div className="menu-btn btn-lg" onClick={() => setIsOpen(!isOpen)}>
          <span className="menu-icon">&#9776;</span>
        </div>

        <div className="navImgContainer-admin">
          <NavLink to={""}>
            <img src="./navLogo.png" alt="" className="navImg-admin" />
          </NavLink>
        </div>
      </header>
      <nav className={`sidebar-admin ${isOpen ? "open" : ""}`}>
        <h1>ADMIN</h1>
        <ul>
          <li>
            <NavLink to="/manageItem">
              <h3>จัดการสินค้า</h3>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders">
              <h3>คำสั่งซื้อ</h3>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports">
              <h3>รายงาน</h3>
            </NavLink>
          </li>
          <li className="" style={{ marginTop: "50px" }}>
            <NavLink
              onClick={() => {
                localStorage.removeItem("logInState");
              }}
              to="/"
            >
              <h4 className="bi bi-box-arrow-left"> Logout</h4>
            </NavLink>
          </li>
        </ul>
      </nav>
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};
