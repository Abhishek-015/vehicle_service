import React from "react";
import {
  CloseCircleOutlined,
  CloseOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const CartServices = ({ service, userOrders, setUserOrders,handleRemove }) => {
  return (
    <tbody>
      <tr>
        <td>{service.serviceName}</td>
        <td className="text-center">₹{service.price}</td>
        <td className="text-center">{service.radius}</td>
        <td className="text-center">{service.location}</td>
        <td className="text-center">
          <input
            name="date"
            type="date"
            onChange={(e) => {
              e.preventDefault();
              const { name, value } = e.target;
              //   console.log(e.target.name, e.target.value);
              // service[name]=value
              const data = [service];
              console.log(data);
              setUserOrders([...userOrders, ...data,e.target.name = value]);
              console.log("userOrders==>", userOrders);
            }}
          />
        </td>
        <td className="text-center">
          <input
            name="time"
            type="time"
            onChange={(e) => {
              e.preventDefault();
              const { name, value } = e.target;
              //   console.log(e.target.name, e.target.value);
              //   service[name] = value;
              const data = [service];
            //   setUserOrders([...userOrders, ...data,{...data, e.target.name = value}]);
              console.log("userOrders==>", userOrders);
            }}
          />
        </td>
        <td className="text-center">
          {service.onlinePayment === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center pointer">
          <CloseOutlined
              onClick={()=>handleRemove(service.id)}
            className="text-danger pointer"
          />
        </td>
        <td>
         promo code
        </td>
      </tr>
    </tbody>
  );
};

export default CartServices;
