import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./productPage.css";
import { useState } from "react";
import axios from "axios";

export const ProductPage = () => {
  const navigate = useNavigate();
  const [data, Setdata] = useState([]);
  const [moneyPin, SetmoneyPin] = useState("");
  useEffect(() => {
    async function callDataApi() {
      const res = await axios.get("http://localhost:3000/rov");
      Setdata(res.data);
    }
    callDataApi();
  }, []);

  async function checkMoneyPin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/checkCode", {
        moneyPin,
      });
      if (res.data == "SUCCESS") {
        alert("Success! Your ID will be sent to your email within 1 minute.");
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  }

  const { productId } = useParams();
  const datagame = data.find((f) => f.id == productId);
  if (!datagame) return <p>Loading...</p>;
  return (
    <>
      <div className="main-containner2">
        <div className="card-game-full card mb-3" style={{ maxWidth: "80vw" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={datagame.image}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-text">ID #{datagame.id}</h1>
                <h2 className="card-text">{datagame.info}</h2>
                <form action="" className="my-3" onSubmit={checkMoneyPin}>
                  <label htmlFor="trueMoneyCode">
                    <h5>ชำระด้วยบัตรเงินสด TRUE MONEY 14 หลัก</h5>
                  </label>
                  <input
                    type="text"
                    name=""
                    id="trueMoneyCode"
                    className="form-control"
                    placeholder="36371590827401"
                    value={moneyPin}
                    onChange={(e) => SetmoneyPin(e.target.value)}
                  />
                  <label htmlFor="trueMoneyCode" className="mt-3">
                    <h5>อีเมลล์ สำหรับรับสินค้า</h5>
                  </label>
                  <input
                    type="text"
                    name=""
                    id="trueMoneyCode"
                    className="form-control"
                    placeholder="xxxxxx@gmail.com"
                  />
                  <button className="btn btn-danger mt-2" type="submit">
                    ชำระสินค้า
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <h1>คลิปส่อง ID #{datagame.id}</h1>
        <div className="iframe-container">
          <iframe
            src="https://www.youtube.com/embed/eEquAh9CD2Q"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};
