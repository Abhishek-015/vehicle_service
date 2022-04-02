import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ServiceCard from "../../components/cards/serviceCard";
import AdminNavbar from "../../components/nav/adminNav";
import { addServiceData } from "../../redux/action";
import { deleteService, getServices } from "../../utils/serviceRoute";

const AdminDashboard = () => {
  const serviceData = useSelector((state) => state.serviceData);
  const dispatch = useDispatch();

  // service deletion
  const handleServiceDelete = (serviceId) => {
    //deleting service from database
    deleteService(serviceId)
      .then((res) => {
        console.log("deleted data===>", res.data);
        toast.success("service deleted successfully");

        //updating redux store
        getServices().then((res) => {
          console.log("data after delete==>", res.data);
          dispatch(addServiceData(res.data));
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`);
      });
  };

  //edit service
    const handleServiceEdit = () => {
      //editing service in server-datbase;
      
    }



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavbar />
        </div>
        <div className="col-md-10">
          <h4 className="my-2">All Services</h4>

          <div className="row">
            {!serviceData ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              serviceData.map((el) => (
                <div className="col-md-4 my-1" key={el.ObjectId}>
                  <ServiceCard
                    service={el}
                    handleServiceDelete={handleServiceDelete}
                    handleServiceEdit={handleServiceEdit}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
