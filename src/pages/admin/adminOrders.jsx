import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNavbar from "../../components/nav/adminNav";
import UserOrders from "../../components/orders/userOrders";
import { getOrders, cancelOrder, updateOrder } from "../../utils/userRoute";

const AdminOrders = () => {
  const user = useSelector((state) => state.userDetails);
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [postponeDateTime, setPostponeDateTime] = useState({
    date: "",
    time: "",
  });

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

  const handlePostponedService = (e) => {
    const { name, value } = e.target;
    setPostponeDateTime({ ...postponeDateTime, [name]: value });
    console.log(postponeDateTime);
  };

  const handleSavePostponed = (e, orderId) => {
    e.preventDefault();
    const updatedOrder = [...orders].filter((order) => order.id === orderId);
    const order = updatedOrder[0].userOrders;
    for (var i = 0; i < order.length; i++) {
      if (order[i].ObjectId === editId) {
        if (postponeDateTime.date != "" && postponeDateTime.time === "") {
          order[i] = { ...order[i], date: postponeDateTime.date };
        } else if (postponeDateTime.date === "" && postponeDateTime.time != "")
          order[i] = { ...order[i], time: postponeDateTime.time };
      } else if (postponeDateTime.date != "" && postponeDateTime.time != "") {
        order[i] = { ...order[i], ...postponeDateTime };
      }
    }

    //updating server database
    updateOrder(orderId, updatedOrder[0])
      .then((res) =>
        getOrders()
          .then((res) => {
            const timeout = setTimeout(()=>{

              setOrders(res.data);
            },2000)
            clearTimeout(timeout)
          })
          .catch((err) => toast.error("server response error"))
      )
      .catch((err) => toast.error("server error"));

      toast.success(`Service has been postponed successfully`)

    setEditId(null);
  };

  // deleting the order from server database
  const handleCancelOrder = (id) => {
    console.log(id);
    cancelOrder(id)
      .then((res) => {
        console.log(res);
        getOrders(user.email)
          .then((res) => {
            toast.success(`Order with id "${id}" is cancelled successfully`);
            setOrders(res.data);
          })
          .catch((err) => toast.error("server error 1"));
      })
      .catch((err) => toast.error("server error 2"));
  };

  //handling editId;
  const handleEditId = (e, serviceId) => {
    e.preventDefault();
    setPostponeDateTime({
      date: "",
      time: "",
    });
    setEditId(serviceId);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          {orders.length === 0 ? (
            <h6>
              No Order.{" "}
              <span>
                {" "}
                <Link to="/services" className="underline">
                  Continue Shopping
                </Link>
              </span>{" "}
            </h6>
          ) : (
            <>
              <h5 className="m-2 text-secondary">Your Order History</h5>

              <UserOrders
                orders={orders}
                handleCancelOrder={handleCancelOrder}
                handleEditId={handleEditId}
                handlePostponedService={handlePostponedService}
                postponeDateTime={postponeDateTime}
                editId={editId}
                handleSavePostponed={handleSavePostponed}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
