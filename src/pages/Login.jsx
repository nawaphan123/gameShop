import React from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [inputText, setInputText] = useState([{ email: "", pass: "" }]);
  const [showPassword, setShowPassword] = useState(true);
  const [account, setAcount] = useState([
    {
      email: "admin@gmail.com",
      pass: "admin",
    },
    {
      email: "user@gmail.com",
      pass: "user",
    },
    {
      email: "1",
      pass: "1",
    },
  ]);
  const navigate = useNavigate();

  function checkLogin() {
    account.map((user) => {
      if (user.email == inputText.email && user.pass == inputText.pass) {
        navigate("/main");
      }
    });
  }
  return (
    <>
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

        <button className="btn btn-primary" onClick={checkLogin}>
          เข้าสู่ระบบ
        </button>
      </div>
    </>
  );
};
