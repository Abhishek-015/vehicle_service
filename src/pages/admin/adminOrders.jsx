import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNavbar from "../../components/nav/adminNav";
import UserOrders from "../../components/orders/userOrders";
import { getOrders } from "../../utils/userRoute";

const AdminOrders = () => {
  const user = useSelector((state) => state.userDetails);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getUserOrders();
  }, []);

  const getUserOrders = () => {
    getOrders(user.email)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Error");
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          {orders.length === 0 ? (
            <h5>
              No Order.{" "}
              <span>
                {" "}
                <Link to="/services">Continue Shopping</Link>
              </span>{" "}
            </h5>
          ) : (
            <>
              <h5>Your Order History</h5>
              <UserOrders orders={orders} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
