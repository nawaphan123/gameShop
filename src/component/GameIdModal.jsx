import React from "react";

export const EditIdModal = ({ classButton, text, type }) => {
  return (
    <>
      <button
        type="button"
        className={classButton}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        {text}
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                แก้ไขข้อมูล
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
                  />
                  <label for="detail" class="form-label mt-2">
                    รายละเอียด
                  </label>
                  <textarea
                    class="form-control"
                    id="detail"
                    rows="3"
                  ></textarea>
                  <label htmlFor="price" className="mt-2">
                    ราคา
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                  />
                  <label htmlFor="status" className="mt-2">
                    สถานะ
                  </label>
                  <select name="status" id="status" className="form-select">
                    <option value="true">ยังไม่ขาย</option>
                    <option value="false">ขายแล้ว</option>
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
