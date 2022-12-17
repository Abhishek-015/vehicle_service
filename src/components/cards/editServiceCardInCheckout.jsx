import React from "react";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Tooltip } from "antd";

const EditCartService = ({
  service,
  handleRemove,
  handleDateTimePromo,
  handleSave,
}) => {
  return (
    <tbody>
      <tr>
        <td>{service.serviceName}</td>
        <td className="text-center">₹{service.price}</td>
        <td className="text-center">{service.radius} Km</td>
        <td className="text-center">{service.location}</td>
        <td className="text-center">
          <input
            name="date"
            type="date"
            min={new Date().toLocaleDateString('en-ca')}
            value={service.date&&service.date}
            className="form-control"
            onChange={handleDateTimePromo}
            required={service.date===undefined}
          />
        </td>
        <td className="text-center">
          <input
            name="time"
            type="time"
            value={service.time&&service.time}
            className="form-control"
            onChange={handleDateTimePromo}
            required
          />
        </td>
        <td className="text-center">
          {service.onlinePayment === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td>
            <select className=" bg-secondary border-none text-light" name="promoCodeApplied" onChange={handleDateTimePromo}>
                <option selected hidden >Please select</option>
                <option value={`${service.discount}DISC`}>{`${service.discount}DISC`}</option>
            </select>
        </td>
        <td className="text-center pointer">
          <Tooltip title="Save">
            <button onClick={handleSave} className="btn btn-warning btn-sm py-0">
              Save
            </button>
          </Tooltip>
          <Tooltip title="Remove this service from cart">
          <DeleteFilled
            onClick={() => handleRemove(service.id)}
            className="text-danger pointer"
          />
          </Tooltip>
        </td>
      </tr>
    </tbody>
  );
};

export default EditCartService;
