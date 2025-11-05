import axios from "axios";
import React, { useState } from "react";

export const EditIdModal = (props) => {
  const [formData, SetFormData] = useState({
    id: props.id,
    image: props.image,
    info: props.info,
    price: props.price,
    status: props.status,
  });
  async function updateData() {
    try {
      const res = await axios.patch("http://localhost:3000/updateItem", {
        id: formData.id,
        image: formData.image,
        info: formData.info,
        price: formData.price,
        status: formData.status,
      });
      props.onsave();
    } catch (err) {
      alert(err);
    }
  }
  async function addData() {
    try {
      const res = await axios.post("http://localhost:3000/addItem", {
        id: formData.id,
        image: formData.image,
        info: formData.info,
        price: formData.price,
        status: formData.status,
      });
      props.onsave();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <button
        type="button"
        className={props.classButton}
        data-bs-toggle="modal"
        data-bs-target={`#${props.id}`}
      >
        {props.text}
      </button>

      <div
        className="modal fade"
        id={props.id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.text === "ADD" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="text-start">
                  <label htmlFor="image" className="mt-2">
                    Link รูปภาพ
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="imageLink"
                    className="form-control"
                    value={formData.image}
                    onChange={(e) => {
                      SetFormData({ ...formData, image: e.target.value });
                    }}
                  />
                  <label htmlFor="detail" className="form-label mt-2">
                    รายละเอียด
                  </label>
                  <textarea
                    className="form-control"
                    id="detail"
                    rows="3"
                    value={formData.info}
                    onChange={(e) => {
                      SetFormData({ ...formData, info: e.target.value });
                    }}
                  ></textarea>
                  <label htmlFor="price" className="mt-2">
                    ราคา
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    value={formData.price}
                    onChange={(e) => {
                      SetFormData({ ...formData, price: e.target.value });
                    }}
                  />
                  <label htmlFor="status" className="mt-2">
                    สถานะ
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="form-select"
                    value={formData.status ? "1" : "0"}
                    onChange={(e) => {
                      SetFormData({
                        ...formData,
                        status: e.target.value === "1" ? true : false,
                      });
                      console.log(e.target.value);
                    }}
                  >
                    <option value="1">ยังไม่ขาย</option>
                    <option value="0">ขายแล้ว</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer mt-2">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (props.text === "ADD") {
                    addData();
                  } else {
                    updateData();
                  }
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
