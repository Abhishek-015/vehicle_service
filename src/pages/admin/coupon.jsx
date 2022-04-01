import React from "react";
import AdminNavbar from "../../components/nav/adminNav";

const CreateCoupon = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h4>Create Coupon</h4>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
