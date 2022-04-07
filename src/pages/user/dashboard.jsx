import React from "react";
import UserNavbar from "../../components/nav/userNav";
import { Link } from "react-router-dom";

const UserDashboard = () => {
 
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNavbar />
        </div>
        <div className="col-md-10">
          <h5  className="my-2 text-secondary">Dashboard</h5>

          <div className="row">
           <div className="mx-3 underline">
               <Link to="/services">Continue Shopping</Link>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
