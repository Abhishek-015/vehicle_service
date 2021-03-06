import "./App.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { LOGGED_IN_USER } from "./redux/actionTypes";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/nav/navbar";
import { SignIn } from "./components/auth/signin";
import Home from "./pages/home";
import Services from "./pages/service";
import Cart from "./pages/cart";
import AdminDashboard from "./pages/admin/dashboard";
import CreateService from "./pages/admin/createService";
import CreateCoupon from "./pages/admin/coupon";

import { ToastContainer } from "react-toastify";
import { getServices } from "./utils/serviceRoute";
import { addServiceData } from "./redux/action";
import ServiceView from "./pages/serviceView";
import AdminOrders from "./pages/admin/adminOrders";
import Payment from "./pages/payment";
import UserDashboard from "./pages/user/dashboard";
import UserOrder from "./pages/user/userOrders";

function App() {
  // const services = useSelector((state) => state.serviceData);
  const dispatch = useDispatch();
  useEffect(() => {
    authentication();
    getServiceData();
  }, []);
  const authentication = async () => {
    const userAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { token, claims } = await user.getIdTokenResult();
        const { name, picture } = claims;
        const payload = {
          email: user.email,
          role:
            user.email === process.env.REACT_APP_ADMIN ? "admin" : "subscriber",
          name,
          picture,
          token,
        };
        dispatch({
          type: LOGGED_IN_USER,
          payload,
        });
      }
    });
    return () => userAuth();
  };

  const getServiceData = () => {
    getServices()
      .then(({ data }) => {
        dispatch(addServiceData(data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
          <Route path="/admin/service" element={<CreateService />}></Route>
          <Route path="/admin/coupon" element={<CreateCoupon />}></Route>
          <Route path="/service/:id" element={<ServiceView />}></Route>
          <Route path="/admin/adminOrders" element={<AdminOrders />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/user/dashboard" element={<UserDashboard />}></Route>
          <Route path="/user/orders" element={<UserOrder />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
