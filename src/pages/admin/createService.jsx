import React from "react";
import CreateServiceForm from "../../components/forms/createSeviceForm";
import AdminNavbar from "../../components/nav/adminNav";

const CreateService = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h4>Create Service</h4>
          <CreateServiceForm />
        </div>
      </div>
    </div>
  );
};

export default CreateService;
