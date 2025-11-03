import "./manageItem.css";
import rovId from "../data/rovId.json";
export function ManageItem() {
  return (
    <>
      <div className="px-5 py-5">
        <button type="button" className="btn btn-success btn-lg my-3">
          ADD
        </button>
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
            {rovId.map((item, idx) => {
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
                  <td className="text-center align-middle fs-2">
                    {item.status.toString().toUpperCase()}
                  </td>
                  <td className="align-middle text-center">
                    <div>
                      <button
                        type="button"
                        className="btn btn-warning mx-1 fs-4"
                      >
                        EDIT
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1 fs-4"
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
        <button type="button" className="btn btn-success btn-lg my-3">
          ADD
        </button>
      </div>
    </>
  );
}
