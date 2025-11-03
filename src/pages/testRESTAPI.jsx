import axios from "axios";
import { useState } from "react";

export function TestRESTAPI() {
  const [moneyPin, SetMoneyPin] = useState("");
  async function checkMoneyPin(e) {
    e.preventDefault();
    await axios.post("http://localhost:3000/checkCode", { moneyPin });
  }

  return (
    <>
      <div>
        <form action="" onSubmit={checkMoneyPin}>
          <label htmlFor="moneyPin">PIN</label>
          <input
            type="text"
            name="moneyPin"
            id="moneyPin"
            value={moneyPin}
            onChange={(e) => SetMoneyPin(e.target.value)}
          />
          <button type="submit">ชำระสินค้า</button>
        </form>
      </div>
    </>
  );
}
