import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartServices from "../components/cards/servicesCardInCheckout";
import { USER_CART, USER_ORDERS } from "../redux/actionTypes";
import { createOrder } from "../utils/userRoute";

const Cart = () => {
  const cart = useSelector((state) => state.userCart);
  const user = useSelector((state) => state.userDetails);
  const [userOrders, setUserOrders] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userCart")) {
      const localCart = JSON.parse(localStorage.getItem("userCart"));
      dispatch({
        type: USER_CART,
        payload: localCart,
      });
    }
  }, []);

  //   const getTotal = () => {
  //     return cart.reduce((currentValue, nextValue) => {
  //       return currentValue + nextValue.count * nextValue.price;
  //     }, 0);
  //   };

  // const saveOrderToDb = () => {
  //   // console.log("cart", JSON.stringify(cart, null, 4));
  //   userCart(cart, user.token)
  //     .then((res) => {
  //       console.log("CART POST RES", res);
  //       if (res.data.ok) history.push("/checkout");
  //     })
  //     .catch((err) => console.log("cart save error", err));
  // };

  const handleCashOrders = () => {
    //filter online payment services if any
    for (let item of cart) {
      if (item.onlinePayment === "Yes") {
        toast.error(
          "Please remove services with online payment availiability "
        );
        return;
      }
    }
    //creating user orders
    const userOrders = {
      userOrders: cart,
      userEmail: user.email,
      orderOn: new Date(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      OrderId: uuidv4(),
      paymentMode: "Cash On Service",
    };
    // console.log("cart", JSON.stringify(userOrders, null, 4));

    //save orders to redux store
    dispatch({
      type: USER_ORDERS,
      payload: userOrders,
    });

    //save order to server
    createOrder(userOrders).then((res) => console.log(res.data));

    //empty userCart from localstorage
    localStorage.removeItem("userCart");

    // empty usercart from redux store
    dispatch({
      type: USER_CART,
      payload: [],
    });

    toast.success(
      "You have successfully ordered the services. See your order history "
    );

    // navigate to order history
    if (user && user.token && user.role === "admin") {
      navigate("/admin/adminOrders");
    } else {
      navigate("/dashboard/orders");
    }
  };

  const handleRemove = (serviceId) => {
    const filterServices = [...cart].filter(
      (service) => service.id !== serviceId
    );
    localStorage.setItem("userCart", JSON.stringify(filterServices));
    dispatch({
      type: USER_CART,
      payload: filterServices,
    });
    // console.log(filterData);
    // localStorage.setItem("")
  };

  const showCartItems = () => {
    return (
      <>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Service center</th>
              <th scope="col">Service Charge</th>
              <th scope="col">Radius</th>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Online Payment</th>
              <th scope="col">Remove</th>
              <th scope="col">Apply PromoCode</th>
            </tr>
          </thead>
          {cart.map((service) => {
            return (
              <CartServices
                key={service.id}
                service={service}
                userOrders={userOrders}
                setUserOrders={setUserOrders}
                handleRemove={handleRemove}
              />
            );
          })}
        </table>
      </>
    );
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Services</h4>
          {!cart.length ? (
            <p>
              {" "}
              No Products in cart.{" "}
              <Link to="/services">Continue to explore services</Link>{" "}
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          {cart.map((service, ind) => (
            <div key={ind}>
              <p>
                {" "}
                {service.serviceName} =
                <span className="text-danger">₹{service.price}</span>
              </p>
            </div>
          ))}
          <hr />
          {/* Total : <b>₹{getTotal()}</b> */}
          <hr />
          {user ? (
            <>
              <button
                // onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2 "
                style={{ border: "none", marginBottom: "10" }}
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={handleCashOrders}
                className="btn btn-sm btn-danger mt-2 "
                style={{ border: "none", marginBottom: "10" }}
                disabled={!cart.length}
              >
                Pay Cash on Service
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm btn-primary mt-1 "
              style={{ border: "none" }}
            >
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
