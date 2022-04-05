import React from "react";

const UserOrders = ({ orders }) => {
  return (
    <div className="container-fluid">
      {orders.map((order, ind) => (
        <div key={order.OrderId}>
          <div className="table-secondary p-1 text-secondary">
            OrderId : {order.OrderId} / Order-Date : {order.date} / Order-Time :{" "}
            {order.time} / PaymentMode :{" "}
            <span className="text-danger">{order.paymentMode}</span>{" "}
          </div>
          <table className="table table-bordered table-sm table-hover">
            <thead>
              <tr
                className={
                  ind === 0 ? "table-success text-secondary" : "text-secondary"
                }
              >
                <th scope="col">Service Name</th>
                <th scope="col">Location</th>
                <th scope="col">Radius</th>
                <th scope="col">Price to pay</th>
              </tr>
            </thead>
            <tbody>
              {order.userOrders.map((el) => (
                <tr key={el.id} className="text-secondary">
                  <td>{el.serviceName}</td>
                  <td>{el.location}</td>
                  <td>{el.radius} Km</td>
                  <td>₹ {el.price}</td>
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
