import React from "react";
import AdminNavbar from "../../components/nav/adminNav";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar/>
        </div>
        <div className="col-md-10">
          <h4>Admin dashboard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
