import React, { useEffect, useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import { useDispatch, useSelector } from "react-redux";
import { USER_ORDERS, USER_CART } from "../redux/actionTypes";
import { toast } from "react-toastify";
import { Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../utils/userRoute";

const initialState = {
  number: "",
  name: "",
  expiry: "",
  cvc: "",
  focus: "",
};
const Payment = () => {
  const userOrders = useSelector((state) => state.userOrders);
  const user = useSelector((state) => state.userDetails);
  const [details, setDetails] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userOrders")) {
      dispatch({
        type: USER_ORDERS,
        payload: JSON.parse(localStorage.getItem("userOrders")),
      });
    }
    if (localStorage.getItem("userCart")) {
      const localCart = JSON.parse(localStorage.getItem("userCart"));
      dispatch({
        type: USER_CART,
        payload: localCart,
      });
    }
  }, []);

  const handleInputFocus = (e) =>
    setDetails({ ...details, focus: e.target.name });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handlePayment = (e) => {
    //   e.preventDefault()
    for (let key in details) {
      if (key === "number" && details[key].length !== 16) {
        toast.error("card number must be of 16 digit");
        return;
      } else if (key === "name" && details[key].length < 2) {
        toast.error("card holder name must includes atleast 2 charachters");
        return;
      } else if (key === "expiry" && details[key] === "") {
        toast.error("fill the expiry date");
        return;
      } else if (key === "cvc" && details[key].length < 3) {
        toast.error("cvc must be of 3 digit number");
        return;
      }
    }

    //store userOrder to database(server)
    createOrder(userOrders).then((res) =>
      toast.success("Payment successfull !! View your order history")
    );
    //empty userOrder from Redux store
    dispatch({
      type: USER_ORDERS,
      payload: [],
    });
    //empty userOrder from local storage
    localStorage.removeItem("userOrders");
    //empty cart from redux store
    dispatch({
      type: USER_CART,
      payload: [],
    });
    //empty cart from localstoarge
    localStorage.removeItem("userCart");
    //navigate to user order page
    if (user && user.token && user.role === "admin") {
      navigate("/admin/adminOrders");
    } else {
      navigate("/user/history");
    }
  };

  function confirm(e) {
    console.log(e);
    message.success("Click on Yes");
  }

  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }

  return (
    <div>
      <div
        className="container table-success text-center py-2 my-5"
        style={{ marginTop: "200px", width: "38%" }}
      >
        Total Payable amount :
        <b className="text-danger"> ₹ {userOrders.totalPrice}</b>
      </div>
      <form>
        <div
          id="PaymentForm"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="mx-4">
            <Cards
              cvc={details.cvc}
              expiry={details.expiry}
              focused={details.focus}
              name={details.name}
              number={details.number}
            />
          </div>
          <div className="mx-4">
            <input
              type="tel"
              name="number"
              placeholder="Enter 16 digit Card Number"
              className="form-control m-2"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={16}
              minLength={16}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Cardholder Name"
              className="form-control m-2"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={32}
              minLength={2}
              required
            />
            <input
              type="date"
              name="expiry"
              placeholder="Card Expiry"
              className="form-control m-2"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              min={31 - 12 - 2022}
              required
            />
            <input
              type="tel"
              name="cvc"
              placeholder="Card CVC"
              className="form-control m-2"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={3}
              minLength={3}
              required
            />
          </div>
        </div>
        <div className="container text-center my-5 ">
          <Popconfirm
            title="Are you sure want to complete this payment?"
            onConfirm={handlePayment}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement="bottom"
            color={"LightGray"}
          >
            <button className="btn btn-success w-50">
              <a href="#" className="text-white">
                Pay
              </a>
            </button>
          </Popconfirm>
        </div>
      </form>
    </div>
  );
};

export default Payment;
