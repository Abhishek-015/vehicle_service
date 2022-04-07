import React from "react";

const UserOrders = ({ orders }) => {
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
          </div>
          <table className="table table-bordered table-sm table-hover mb-4">
            <thead>
              <tr
                className={
                  ind === 0 ? "table-success text-secondary" : "text-secondary"
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
              </tr>
            </thead>
            <tbody>
              {order.userOrders.map((el) => (
                <tr key={el.id} className="text-secondary">
                  <td>{el.serviceName}</td>
                  <td>{el.location}</td>
                  <td>{el.radius} Km</td>
                  <td>{el.date}</td>
                  <td>{el.time}</td>
                  <td>
                    ₹ {el.priceAfterDiscount ? el.priceAfterDiscount : el.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
