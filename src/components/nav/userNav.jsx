import React from "react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
    return   <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/user/orders" className="nav-link">
         Order History
        </Link>
      </li>
    </ul>
  </nav>
}

export default UserNavbar