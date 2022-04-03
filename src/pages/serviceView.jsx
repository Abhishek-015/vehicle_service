import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import RelatedServices from "../components/serviceView/relatedServices";
import { SERVICE_VIEW } from "../redux/actionTypes";

import { getServiceById } from "../utils/serviceRoute";

const ServiceView = () => {
  const serviceView = useSelector((state) => state.serviceView);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    getServiceById(id)
      .then((res) => {
        dispatch({
          type: SERVICE_VIEW,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleService = (serviceToUserCart) => {
    //checking id userCart already exist
    if (localStorage.getItem("userCart")) {
      console.log("lovcal aghg");
      const userCart = JSON.parse(localStorage.getItem("userCart"));
      for (let el of userCart) {
        // checking if service already exist then notify user else add service to local storage
        if (el.id === serviceToUserCart.id) {
          toast.error("Current service already added to cart");
          return;
        } else {
          const cartSrvices = JSON.parse(localStorage.getItem("userCart"));
          const newCart = [...cartSrvices, serviceToUserCart];
          localStorage.setItem("userCart", JSON.stringify(newCart));
          toast.success("service added to cart");
        }
      }
    } else {
      const serviceArray = [serviceToUserCart];
      localStorage.setItem("userCart", JSON.stringify(serviceArray));
      toast.success("service added to cart");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row m-4">
        <div className="col-md-8">
          <div className="card mb-3">
            <img
              src={serviceView.ImageUrl}
              className="card-img-top"
              alt="..."
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5 className="card-title">{serviceView.serviceName}</h5>
                <span>
                  <Rating
                    initialValue={Number(serviceView.rating)}
                    fillColor="red"
                    allowHover={false}
                  />
                  ({serviceView.rating})
                </span>
              </div>
              <p className="card-text">{serviceView.desc}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h4>Service details</h4>
          <hr />
          <p>
            Service Charge :{" "}
            <span className="text-danger">₹{serviceView.price}</span>
          </p>
          <p>
            Discount Percentage :{" "}
            <span className="text-danger">{serviceView.discount}%</span>
          </p>
          <p>
            Radius :{" "}
            <span className="text-danger">{serviceView.radius} km</span>
          </p>
          <p>
            Location :{" "}
            <span className="text-danger">{serviceView.location}</span>
          </p>
          <p>
            Online Payment :{" "}
            <span className="text-danger">{serviceView.onlinePayment}</span>
          </p>
          <hr />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleService(serviceView)}
          >
            Add service to Cart
          </button>
        </div>
      </div>

      {/* related services */}
      <div className="text-center h4 text-warning p-3 my-2 display-5 jumbotron">
        Related services
      </div>
      <RelatedServices serviceView={serviceView} />
    </div>
  );
};

export default ServiceView;
