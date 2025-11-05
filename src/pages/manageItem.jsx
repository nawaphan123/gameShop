import "./CSS/manageItem.css";
import axios from "axios";
import { EditIdModal } from "../component/gameIdModal";
import { useEffect, useState } from "react";
export function ManageItem() {
  const [data, Setdata] = useState([]);

  async function callDataApi() {
    const res = await axios.get("http://localhost:3000/getDB");
    Setdata(res.data);
  }
  useEffect(() => {
    callDataApi();
  }, []);

  async function deleteItem(id) {
    console.log(id);
    const res = await axios.delete("http://localhost:3000/deleteItem", {
      data: { id },
    });
    callDataApi();
  }

  return (
    <>
      <div className="mt-3 text-center display-1 fw-bold">MANAGE STOCK</div>
      <div className="px-5 py-3">
        <EditIdModal
          classButton={"btn btn-success btn-lg my-3"}
          text={"ADD"}
          type={"ADD"}
          id={"ADD"}
          image={""}
          info={""}
          price={0}
          status={false}
          onsave={callDataApi}
        />
        <table className="table table-striped">
          <thead className="text-center table-dark sticky-top">
            <tr>
              <th className="col-1 fs-2">#ID</th>
              <th className="col-2 fs-2">IMAGE</th>
              <th className="col-5 fs-2">INFO</th>
              <th className="col-1 fs-2">PRICE</th>
              <th className="col-1 fs-2">STATUS</th>
              <th className="col-2 fs-2">ACTION</th>
            </tr>
          </thead>
          <tbody className="table-item-tbody">
            {data.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="text-center align-middle fs-1 fw-bold">
                    {item.id}
                  </td>
                  <td className="text-center align-middle ">
                    <img src={item.image} alt="" className="img-item" />
                  </td>
                  <td className="fs-4">{item.info}</td>
                  <td className="text-center align-middle fs-2 ">
                    {item.price}
                  </td>
                  <td
                    className={
                      item.status
                        ? "text-center align-middle fs-2"
                        : "text-center align-middle fs-2 text-danger"
                    }
                  >
                    {item.status ? "ยังไม่ขาย" : "ขายแล้ว"}
                  </td>
                  <td className="align-middle text-center">
                    <div>
                      <EditIdModal
                        classButton={"btn btn-warning mx-1 fs-4"}
                        text={"EDIT"}
                        type={"EDIT"}
                        id={item.id}
                        image={item.image}
                        info={item.info}
                        price={item.price}
                        status={item.status}
                        onsave={callDataApi}
                      />
                      <button
                        type="button"
                        className="btn btn-danger mx-1 fs-4"
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <EditIdModal
          classButton={"btn btn-success btn-lg my-3"}
          text={"ADD"}
          type={"ADD"}
          id={"ADD"}
          image={""}
          info={""}
          price={0}
          status={false}
          onsave={callDataApi}
        />
      </div>
    </>
  );
}
