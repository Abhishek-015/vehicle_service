import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";

const ServiceCard = ({ service, handleServiceDelete, handleServiceEdit }) => {
  const user = useSelector((state) => state.userDetails);
  const searchQuery = useSelector((state) => state.searchQuery);
  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <img
        src={service.ImageUrl}
        alt="cap"
        style={{ height: "150px", width: "100%" }}
      />
      <div className="card-body my-0 pb-0">
        <h5 className="card-title mb-0 ">{service.serviceName}</h5>
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
        <p className="card-text mt-1 ">{(service.desc).substr(0,60)}....</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="card-text ">
            Service Charge :{" "}
            <span className="text-danger">₹{service.price}</span>
          </p>
          <p className="card-text">
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
          className="card-body m-0 p-0"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <button
            onClick={() => handleServiceEdit(service.id)}
            className="btn bg-transparent text-primary my-0 "
          >
            <span>
              <EditOutlined className="mx-1 text-danger" />
              Edit
            </span>
          </button>
          <button
            onClick={() => handleServiceDelete(service.id)}
            className="btn bg-transparent text-primary my-0  "
          >
            <span>
              <DeleteOutlined className="mx-1 text-danger" />
              Delete
            </span>
          </button>
        </div>
      )}
      <div className="card-body text-center m-0 pt-0 ">
        <Tooltip
          title={
            searchQuery === ""
              ? "please select location"
              : "Click to View Service"
          }
        >
          <Link
            to={`/service/${service.id}`}
            className={
              searchQuery === ""
                ? "btn btn-primary disabled"
                : "btn btn-primary"
            }
          >
            <span>
              <EyeOutlined className="mx-1 text-warning" />
              View service
            </span>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default ServiceCard;
