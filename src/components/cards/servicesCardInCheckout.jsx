import React from "react";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

import { Tooltip } from "antd";

const CartServices = ({ service, handleRemove, handleServiceId }) => {
  return (
    <tbody>
      <tr>
        <td>{service.serviceName}</td>
        <td className="text-center">₹{service.price}</td>
        <td className="text-center">{service.radius} Km</td>
        <td className="text-center">{service.location}</td>
        <td className="text-center">
          {service.date ? (
            <span className="text-success">{service.date}</span>
          ) : (
            <span className="text-primary">Click edit icon</span>
          )}
        </td>
        <td className="text-center">
          {service.time ? (
            <span className="text-success">{service.time}</span>
          ) : (
            <span className="text-primary">Click edit icon</span>
          )}
        </td>
        <td className="text-center">
          {service.onlinePayment === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td>{service.promoCodeApplied ? (
            <span className="text-success h6 m-auto">APPLIED <CheckCircleFilled/></span>
          ) : (
            <span className="text-primary">Click edit icon</span>
          )}</td>
        <td className="text-center pointer">
          <Tooltip title="Set Date,Time and apply promocode">
            <EditOutlined
              onClick={() => handleServiceId(service.id)}
              className="text-primary pointer mx-1"
            />
          </Tooltip>
          <Tooltip title="Remove this service from cart">
            <DeleteOutlined
              onClick={() => handleRemove(service.id)}
              className="text-danger pointer mx-1"
            />
          </Tooltip>
        </td>
      </tr>
    </tbody>
  );
};

export default CartServices;
