import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartServices from "../components/cards/servicesCardInCheckout";
import { USER_CART, USER_ORDERS } from "../redux/actionTypes";
import { createOrder } from "../utils/userRoute";
import EditCartService from "../components/cards/editServiceCardInCheckout";

const Cart = () => {
  const cart = useSelector((state) => state.userCart);
  const user = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serviceId, setServiceId] = useState(null);
  const [dateTimePromo, setDateTimePromo] = useState({});

  useEffect(() => {
    if (localStorage.getItem("userCart")) {
      const localCart = JSON.parse(localStorage.getItem("userCart"));
      dispatch({
        type: USER_CART,
        payload: localCart,
      });
    }
  }, []);

  const handleServiceId = (id) => setServiceId(id);

  const handleDateTimePromo = (e) => {
    setDateTimePromo({ ...dateTimePromo, [e.target.name]: e.target.value });
    console.log(dateTimePromo);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newCart = [...cart];

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === serviceId) {
        newCart[i] = { ...newCart[i], ...dateTimePromo };
      }
      if (newCart[i].promoCodeApplied) {
        newCart[i].priceAfterDiscount = (
          newCart[i].price -
          (newCart[i].price * newCart[i].discount) / 100
        ).toFixed(2);
      }
    }

    console.log(newCart);

    // store new Edited cart with date,time and promocode applied
    dispatch({
      type: USER_CART,
      payload: newCart,
    });
    // toast.success(`${newEditData.name} is successfully updated`);
    setDateTimePromo({});
    setServiceId(null);
  };

  const getTotal = () => {
    return [...cart].reduce((currentValue, nextValue) => {
      return (
        currentValue +
        Number(
          nextValue.priceAfterDiscount
            ? nextValue.priceAfterDiscount
            : nextValue.price
        )
      );
    }, 0);
  };

  const handleCashOrders = () => {
    //filter online payment services if any
    for (let item of cart) {
      if (item.onlinePayment === "Yes") {
        toast.error(
          "Please remove services with online payment availiability "
        );
        return;
      } else if (!item.time || !item.date) {
        toast.error("Time and Date must be scheduled for each service");
        return;
      }
    }

    //creating user orders
    const userOrders = {
      totalPrice: getTotal().toFixed(2),
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

    //empty searchQuery from localstorage
    localStorage.removeItem("searchQuery");

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
      navigate("/user/orders");
    }
  };

  const handleOnlineOrders = () => {
      //filter online payment services if any
      for (let item of cart) {
        if (item.onlinePayment === "No") {
          toast.error(
            "Please remove services without online payment availiability "
          );
          return;
        } else if (!item.time || !item.date) {
          toast.error("Time and Date must be scheduled for each service");
          return;
        }
      }

      const getTotal = () => {
        return [...cart].reduce((currentValue, nextValue) => {
          return (
            currentValue +
            Number(
              nextValue.priceAfterDiscount
                ? nextValue.priceAfterDiscount
                : nextValue.price
            )
          );
        }, 0);
      };
  
      //creating user orders
      const userOrders = {
        totalPrice: getTotal().toFixed(2),
        userOrders: cart,
        userEmail: user.email,
        orderOn: new Date(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        OrderId: uuidv4(),
        paymentMode: "CARD(online)",
      };
      // console.log("cart", JSON.stringify(userOrders, null, 4));
  
      //save orders to redux store
      dispatch({
        type: USER_ORDERS,
        payload: userOrders,
      });

      //save userOrders to local storage
      localStorage.setItem("userOrders",JSON.stringify(userOrders))

        // navigate to payment Page
    if (user && user.token) {
      navigate("/payment");
    } 
  }

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
        <form>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Service center</th>
                <th scope="col">Service Charge</th>
                <th scope="col">Radius</th>
                <th scope="col">Location</th>
                <th scope="col">Service Date</th>
                <th scope="col">Service Time</th>
                <th scope="col">Online Pay Avail.</th>
                <th scope="col">Apply PromoCode</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {cart.map((service) =>
              service.id === serviceId ? (
                <EditCartService
                  key={service.id}
                  service={service}
                  handleRemove={handleRemove}
                  handleDateTimePromo={handleDateTimePromo}
                  handleSave={handleSave}
                />
              ) : (
                <CartServices
                  key={service.id}
                  service={service}
                  handleRemove={handleRemove}
                  handleServiceId={handleServiceId}
                />
              )
            )}
          </table>
        </form>
      </>
    );
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4 className="text-secondary">Cart / {cart.length} Services</h4>
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
          <h4 className=" text-secondary">Order Summary</h4>
          <hr />
          {cart.map((service, ind) => (
            <div key={ind}>
              <p>
                {service.priceAfterDiscount ? (
                  <span className="table-success py-1">
                    {service.serviceName} ={" "}
                    <span
                      className="text-secondary"
                      style={{ textDecoration: "line-through" }}
                    >
                      ₹{service.price} ,
                    </span>{" "}
                    Price after Discount :
                    <span className="text-danger h6">
                      ₹{service.priceAfterDiscount}
                    </span>
                  </span>
                ) : (
                  <span>
                    {service.serviceName}={" "}
                    <span className="text-danger">₹{service.price}</span>
                  </span>
                )}
              </p>
            </div>
          ))}
          <hr />
          Total Payable : <b>₹{getTotal().toFixed(2)}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={handleOnlineOrders}
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
              className="btn btn-sm btn-primary mt-1"
              style={{ border: "none" }}
            >
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
                className="text-white"
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
