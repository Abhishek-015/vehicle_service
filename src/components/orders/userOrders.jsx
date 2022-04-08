import { EditFilled } from "@ant-design/icons";
import React from "react";

const UserOrders = ({
  orders,
  handleCancelOrder,
  handlePostponedService,
  handleEditId,
  editId,
  postponeDateTime,
  handleSavePostponed,
}) => {
  return (
    <div className="container-fluid">
      {orders.map((order, ind) => (
        <div key={order.OrderId}>
          <div className="table-secondary p-1 text-secondary">
            OrderId : {order.OrderId} / Order-Date : {order.date} / Order-Time :{" "}
            {order.time} / PaymentMode :{" "}
            <span
              className={
                order.paymentMode === "Cash On Service"
                  ? "text-danger"
                  : "text-success"
              }
            >
              {order.paymentMode}
            </span>{" "}
            /
            <span>
              Total : <b className="text-danger">₹ {order.totalPrice}</b>
            </span>
            <span>
              <button
                className="btn btn-secondary btn-sm mx-5"
                onClick={() => handleCancelOrder(order.id)}
              >
                Cancel Order
              </button>
            </span>
          </div>
          <form action="">
            <table className="table table-bordered table-sm table-hover mb-4">
              <thead>
                <tr
                  className={
                    ind === 0
                      ? "table-success text-center text-secondary"
                      : "text-secondary text-center"
                  }
                >
                  <th scope="col">Service Name</th>
                  <th scope="col">Location</th>
                  <th scope="col">Radius</th>
                  <th scope="col">Service Date</th>

                  <th scope="col">Service Time</th>
                  {order.paymentMode === "Cash On Service" ? (
                    <th scope="col">Price to pay</th>
                  ) : (
                    <th scope="col">Price Paid</th>
                  )}
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {order.userOrders.map((el) => (
                  <tr key={el.id} className="text-secondary text-center">
                    <td>{el.serviceName}</td>
                    <td>{el.location}</td>
                    <td>{el.radius} Km</td>
                    {editId === el.ObjectId ? (
                      <td>
                        <input
                          type="date"
                          value={
                            postponeDateTime.date !== ""
                              ? postponeDateTime.date
                              : el.date
                          }
                          name="date"
                          onChange={(e) =>
                            handlePostponedService(e, el.ObjectId)
                          }
                        />
                      </td>
                    ) : (
                      <td>{el.date}</td>
                    )}
                    {editId === el.ObjectId ? (
                      <td>
                        <input
                          type="time"
                          value={
                            postponeDateTime.time !== ""
                              ? postponeDateTime.time
                              : el.time
                          }
                          name="time"
                          onChange={(e) =>
                            handlePostponedService(e, el.ObjectId)
                          }
                        />
                      </td>
                    ) : (
                      <td>{el.time}</td>
                    )}
                    <td>
                      ₹{" "}
                      {el.priceAfterDiscount ? el.priceAfterDiscount : el.price}
                    </td>
                    <td className="text-center pointer">
                      {editId ===el.ObjectId ? (
                        <button
                          onClick={(e)=>handleSavePostponed(e,order.id)}
                          className="btn btn-warning btn-sm m-0 py-0"
                          data-toggle="tooltip"
                          data-placement="left"
                          title="save and postpone service"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleEditId(e, el.ObjectId)}
                          className="btn btn-outlined-none btn-sm m-0 p-0"
                          data-toggle="tooltip"
                          data-placement="left"
                          title="Postpone service date and time"
                        >
                          <EditFilled className="m-1 text-primary " />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
