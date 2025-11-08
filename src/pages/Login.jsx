import React from "react";
import "./CSS/Login.css";
import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [inputText, setInputText] = useState([{ email: "", pass: "" }]);
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  async function checkLogin() {
    const res = await axios.post(
      "http://localhost:3000/login",
      {
        username: inputText.email,
        password: inputText.pass,
      },
      { withCredentials: true }
    );
    if (res.data.status) {
      navigate("/manageItem");
    }
    console.log();
  }
  return (
    <div className="bg-login">
      <div className="container">
        <h1>เข้าสู่ระบบ</h1>
        <form action="">
          <div className="inputfield">
            <label htmlFor="email">อีเมล</label>
            <input
              type="text"
              className="form-control"
              id="email"
              onChange={(e) =>
                setInputText({ ...inputText, email: e.target.value })
              }
            />
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type={showPassword ? "password" : "text"}
              className="form-control"
              id="password"
              onChange={(e) =>
                setInputText({ ...inputText, pass: e.target.value })
              }
            />

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckIndeterminate"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckIndeterminate"
              >
                แสดงรหัสผ่าน
              </label>
            </div>
          </div>
        </form>

        <button className="btn btn-danger" onClick={checkLogin}>
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
};
