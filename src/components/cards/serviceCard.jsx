import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";

const ServiceCard = ({ service, handleServiceDelete, handleServiceEdit }) => {
  const user = useSelector((state) => state.userDetails);
  return (
    <div className="card" style={{ width: "18rem",marginBottom:"5px" }}>
      <img
        src={service.ImageUrl}
        alt="cap"
        style={{ height: "150px", width: "100%" }}
      />
      <div className="card-body">
        <h5 className="card-title ">{service.serviceName}</h5>
        <span>
          <StarRatings
            numberOfStars={5}
            rating={Number(service.rating)}
            starRatedColor="red"
            starDimension="20px"
            starSpacing="3px"
          />
          ({service.rating})
        </span>
        <br />
        <p className="card-text mt-2">{service.desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="card-text mt-1">
            Service Charge :{" "}
            <span className="text-danger">₹{service.price}</span>
          </p>
          <p className="card-text mt-1">
            Discount : <span className="text-danger">{service.discount}%</span>
          </p>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Location : {service.location}</li>
        <li className="list-group-item">
          Online Payment available : {service.onlinePayment}
        </li>
      </ul>

      {user && user.token && user.role === "admin" && (
        <div
          className="card-body"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button
            onClick={() => handleServiceEdit(service.id)}
            className="btn bg-transparent text-primary "
          >
            <span>
              <EditOutlined className="m-1 text-danger" />
              Edit
            </span>
          </button>
          <button
            onClick={() => handleServiceDelete(service.id)}
            className="btn bg-transparent text-primary "
          >
            <span>
              <DeleteOutlined className="m-1 text-danger" />
              Delete
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
