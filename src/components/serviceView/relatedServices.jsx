import React, { useEffect, useState } from "react";

import {
  getServiceById,
  getServicesByLocation,
} from "../../utils/serviceRoute";
import ServiceCard from "../cards/serviceCard";
import { useParams } from "react-router-dom";

const RelatedServices = ({ serviceView }) => {
  const [services, setServices] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    loadRelatedServices();
  }, []);

  const loadRelatedServices = () => {
    getServiceById(id)
      .then(({ data }) => {
        getServicesByLocation(data.location)
          .then((res) => {
            setServices(res.data);
          })
          .catch((err) => {
            console.log("home Page show products error --->", err.message);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          {services.length === 1 ? (
            <h5 className="m-auto text-secondary">No Related services available</h5>
          ) : (
            services
              .filter((service) => service.id !== serviceView.id)
              .map((service) => (
                <div className="col-md-3" key={service.ObjectId}>
                  <ServiceCard service={service} />
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default RelatedServices;
