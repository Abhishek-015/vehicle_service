import React from "react";
import { Link } from "react-router-dom";
import {
  LoginOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  SearchOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Navbar
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
              <span >
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
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <span>
                <ShoppingCartOutlined className="text-warning p-1" />
                Cart
              </span>
            </Link>
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
              <Link className="nav-link" to="/">
                <SettingOutlined className="text-warning p-1" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <span>
                  <LoginOutlined className="text-warning p-1" />
                  Login
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
