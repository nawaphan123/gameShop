import React from "react";
import "./CSS/gameIdCard.css";
import { Navigate, useNavigate } from "react-router-dom";

export const IdCard = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="card-game card shadow-sm"
      style={{ width: "20rem", height: "34rem" }}
    >
      <img
        src={`${props.img}`}
        style={{
          filter: props.status ? "none" : "grayscale(100%)",
          width: "100%",
          height: "22rem",
          objectFit: "cover",
          objectPosition: "top",
        }}
        className="card-img-top"
        alt=""
      />
      <div className="card-body">
        <h3 className="card-title">{props.title}</h3>
        <h5 className="card-text">ราคา {props.price} บาท</h5>
        <button
          className={
            props.status
              ? "btn btn-danger mt-2 btn-lg"
              : "btn btn-outline-secondary mt-2 btn-lg"
          }
          disabled={!props.status ? true : false}
          onClick={() => {
            navigate(`products/${props.id}`);
          }}
        >
          {props.status ? "ซื้อสินค้า" : "สินค้าหมด"}
        </button>
      </div>
    </div>
  );
};
