import { IdCard } from "../component/gameIdCard";
// import game from "../data/rovId.json";
import "./mainPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function GAME() {
  const [game, Setdata] = useState([]);
  useEffect(() => {
    async function callDataApi() {
      const res = await axios.get("http://localhost:3000/rov");
      Setdata(res.data);
    }
    callDataApi();
  }, []);
  return (
    <>
      <div className="main-container">
        <div className="ID-container">
          {game.map((IDG) => (
            <IdCard
              key={IDG.id}
              img={IDG.image}
              title={IDG.info}
              price={IDG.price}
              status={IDG.status}
              id={IDG.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
