import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
    return   <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/service" className="nav-link">
         Create Service
        </Link>
      </li>
      
      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/adminOrders" className="nav-link">
          Admin orders
        </Link>
      </li>
    </ul>
  </nav>
}

export default AdminNavbar