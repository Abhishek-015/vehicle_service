import React from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "antd";

import {
  LoginOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  SearchOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { LOGOUT, USER_CART } from "../../redux/actionTypes";
import { toast } from "react-toastify";

const Navbar = () => {
  const user = useSelector((state) => state.userDetails);
  const userCart = useSelector((state) => state.userCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //logout
  const handleLogout = () => {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: null,
    });

    //empty userCart from reduxStore
    dispatch({
      type: USER_CART,
      payload: [],
    });
    //removing userCart from localStorage
    localStorage.removeItem("userCart");

    //removing serachQuery from localStorage
    localStorage.removeItem("searchQuery");

    toast.success("You are successfully logged out.");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <img
          style={{ height: "50px", width: "50px" }}
          src="https://cdn-icons-png.flaticon.com/512/6887/6887043.png"
          alt=""
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <Link className="nav-link" to="/">
              <span>
                {" "}
                <HomeOutlined className="text-warning p-1" />
                Home
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services">
              <span>
                <ShopOutlined className="text-warning p-1" />
                Services
              </span>
            </Link>
          </li>
          <li className="nav-item pt-1">
            <Badge count={userCart.length} size={"small"}>
              <Link className="nav-link" to="/cart">
                <span>
                  <ShoppingCartOutlined className="text-warning p-1" />
                  Cart
                </span>
              </Link>
            </Badge>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control btn-sm mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <SearchOutlined className="text-warning" />
        </form>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {user && user.token ? (
                user.role === "admin" ? (
                  <Link className="nav-link" to="/admin/dashboard">
                    <SettingOutlined className="text-warning p-1" />
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link className="nav-link" to="/user/dashboard">
                    <SettingOutlined className="text-warning p-1" />
                    Hello!! {user &&user.token&& user.name}
                  </Link>
                )
              ) : null}
            </li>
            <li className="nav-item">
              {user && user.token ? (
                <Link className="nav-link" to="/">
                  <span onClick={handleLogout}>
                    <LogoutOutlined className="text-warning p-1" />
                    Logout
                  </span>
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  {" "}
                  <span>
                    <LoginOutlined className="text-warning p-1" />
                    Login
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
