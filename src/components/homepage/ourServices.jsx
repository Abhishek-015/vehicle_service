import React, { useEffect, useState } from "react";

import { Pagination } from "antd";
import { getServices, getServicesByCount } from "../../utils/serviceRoute";
import ServiceCard from "../cards/serviceCard";

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [servicesCount, setServicesCount] = useState(0);

  useEffect(() => {
    loadAllServices();
  }, [page]);

  const loadAllServices = () => {
    getServicesByCount(page)
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log("home Page show products error --->", err.message);
      });
  };

  useEffect(() => {
    getServices().then((res) => {
      setServicesCount(res.data.length);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {services.map((service) => (
            <div className="col-md-4" key={service.ObjectId}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center py-3 mt-3">
          <Pagination
            size="large"
            current={page}
            total={Math.ceil(servicesCount / 3) * 10}
            onChange={(value) => {
              setPage(value);
              console.log(value);
            }}
          />
        </nav>
      </div>
    </>
  );
};

export default OurServices;
