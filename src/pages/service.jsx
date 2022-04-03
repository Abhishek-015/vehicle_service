import React, { useEffect, useState } from "react";
import { Menu, Slider, Checkbox } from "antd";
import {
  DollarOutlined,
  StarOutlined,
  TransactionOutlined,
  VerticalAlignBottomOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";

import { getServices } from "../utils/serviceRoute";
import ServiceCard from "../components/cards/serviceCard";
import { useDispatch, useSelector } from "react-redux";
import ServicePageLocationSelect from "../components/forms/servicePageLocationSelect";
import { FILTER_SERVICES_BY_LOCATION, SEARCH_QUERY } from "../redux/actionTypes";
const { SubMenu } = Menu;

const Services = () => {
  const serviceData = useSelector((state) => state.serviceData);
  const filterServicesByLocation = useSelector(
    (state) => state.filterServicesByLocation
  );
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [radius, setRadius] = useState(0);
  const [onlinePay, setOnlinePay] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    getAllServices();
    localStorage.setItem("searchQuery",searchQuery)
  }, [searchQuery]);

  const getAllServices = () => {
    setOnlinePay("");
    setRating("");
    setDiscount("");
    setPrice("");
    setRadius("");
    getServices().then(({ data }) => {
      if (searchQuery != "") {
        const filterDataBysearchquery = [...data].filter(
          (service) => service.location === searchQuery
        );

        dispatch({
          type: FILTER_SERVICES_BY_LOCATION,
          payload: filterDataBysearchquery,
        });

        setServices(filterDataBysearchquery);
      } else {
        setServices(data);
      }
    });
  };

  //show services by radius range
  const handleSlider = (value) => {
    setOnlinePay("");
    setRating("");
    setDiscount("");
    setPrice("");
    setRadius(value);
    const filterServices = (
      searchQuery !== "" ? [...filterServicesByLocation] : [...serviceData]
    ).filter((service) => Number(service.radius) <= value);
    setServices(filterServices);
  };

  // show products based on online payment availaibilty
  const showOnlinePayAvail = () => (
    <>
      <Checkbox
        className=" mx-4 py-1"
        onChange={handleOnlinePay}
        value="Yes"
        checked={onlinePay === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="mx-4 py-1"
        onChange={handleOnlinePay}
        value="No"
        checked={onlinePay === "No"}
      >
        No
      </Checkbox>
    </>
  );

  //handle Online Pay
  const handleOnlinePay = (e) => {
    setRadius(0);
    setRating("");
    setDiscount("");
    setPrice("");
    setOnlinePay(e.target.value);
    const filterServices = (
      searchQuery !== "" ? [...filterServicesByLocation] : [...serviceData]
    ).filter((service) => service.onlinePayment === e.target.value);
    setServices(filterServices);
  };

  // 5. show services by star ratings
  const handleStarRating = (e) => {
    setRadius(0);
    setOnlinePay("");
    setDiscount("");
    setPrice("");
    setRating(e.target.value);
    if (e.target.value === "desc") {
      const filterServices = (
        searchQuery !== "" ? [...filterServicesByLocation] : [...serviceData]
      ).sort((a, b) => Number(b.rating) - Number(a.rating));
      setServices(filterServices);
    } else if (e.target.value === "asc") {
      const filterServices = (
        searchQuery !== "" ? [...filterServicesByLocation] : [...serviceData]
      ).sort((a, b) => Number(a.rating) - Number(b.rating));
      setServices(filterServices);
    }
  };

  const showStars = () => {
    return (
      <>
        <Checkbox
          className=" mx-4 py-1"
          onChange={handleStarRating}
          value="desc"
          checked={rating === "desc"}
        >
          High to low
        </Checkbox>
        <Checkbox
          className="mx-4 py-1"
          onChange={handleStarRating}
          value="asc"
          checked={rating === "asc"}
        >
          Low to high
        </Checkbox>
      </>
    );
  };

  // show services by price
  const handlePrice = (e) => {
    setRadius(0);
    setOnlinePay("");
    setRating("");
    setDiscount("");
    setPrice(e.target.value);
    if (e.target.value === "desc") {
      const filterServices = (
        searchQuery !== "" ? [...filterServicesByLocation] : [...serviceData]
      ).sort((a, b) => Number(b.price) - Number(a.price));
      setServices(filterServices);
    } else if (e.target.value === "asc") {
      const filterServices = (
        searchQuery !== "" ? [...filterServicesByLocation] : [...serviceData]
      ).sort((a, b) => Number(a.price) - Number(b.price));
      setServices(filterServices);
    }
  };

  const showPrice = () => {
    return (
      <>
        <Checkbox
          className=" mx-4 py-1"
          onChange={handlePrice}
          value="desc"
          checked={price === "desc"}
        >
          High to low
        </Checkbox>
        <Checkbox
          className="mx-4 py-1"
          onChange={handlePrice}
          value="asc"
          checked={price === "asc"}
        >
          Low to high
        </Checkbox>
      </>
    );
  };

  // 5. show services by discount
  const handleDiscount = (e) => {
    setRadius(0);
    setOnlinePay("");
    setRating("");
    setPrice("");
    setDiscount(e.target.value);
    if (e.target.value === "desc") {
      const filterServices = (
        searchQuery !== "" ? [...filterServicesByLocation] : [...serviceData]
      ).sort((a, b) => Number(b.discount) - Number(a.discount));
      setServices(filterServices);
    } else if (e.target.value === "asc") {
      const filterServices = (
        searchQuery !== "" ? [...filterServicesByLocation] : [...serviceData]
      ).sort((a, b) => Number(a.discount) - Number(b.discount));
      setServices(filterServices);
    }
  };

  const showDiscount = () => {
    return (
      <>
        <Checkbox
          className=" mx-4 py-1"
          onChange={handleDiscount}
          value="desc"
          checked={discount === "desc"}
        >
          High to low
        </Checkbox>
        <Checkbox
          className="mx-4 py-1"
          onChange={handleDiscount}
          value="asc"
          checked={discount === "asc"}
        >
          Low to high
        </Checkbox>
      </>
    );
  };

  return (
    <div container-fluid>
      <div className="row">
        <div className="col-md-3">
          <h4 className="m-3">Filters</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3", "4", "5"]} mode="inline">
            {/* for Radius */}
            <SubMenu
              key="1"
              title={
                <span className="h6 text-danger">
                  <TransactionOutlined /> Radius
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `${v}Km`}
                  value={radius}
                  onChange={handleSlider}
                  max="1000"
                />
              </div>
            </SubMenu>
            {/* star */}
            <SubMenu
              key="2"
              title={
                <span className="h6 text-danger ">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div
                style={{
                  marginTop: "-10px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  padding: "8px 0px",
                }}
              >
                {showStars()}
              </div>
            </SubMenu>
            {/* Price */}
            <SubMenu
              key="3"
              title={
                <span className="h6 text-danger">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div
                style={{
                  marginTop: "-10px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  padding: "8px 0px",
                }}
              >
                {showPrice()}
              </div>
            </SubMenu>
            {/* Discount */}
            <SubMenu
              key="4"
              title={
                <span className="h6 text-danger">
                  <VerticalAlignBottomOutlined /> Discount
                </span>
              }
            >
              <div
                style={{
                  marginTop: "-10px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  padding: "8px 0px",
                }}
              >
                {showDiscount()}
              </div>
            </SubMenu>

            {/* Online Payment */}
            <SubMenu
              key="5"
              title={
                <span className="h6 text-danger">
                  <AccountBookOutlined />
                  Online Payment
                </span>
              }
            >
              <div
                style={{
                  marginTop: "-10px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  padding: "8px 0px",
                }}
              >
                {showOnlinePayAvail()}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9">
          <h4 className="m-2">All Services</h4>
          <div className="container my-3">
            <ServicePageLocationSelect />
          </div>
          <div className="row">
            {services.length === 0 ? (
              <h5>No service available</h5>
            ) : (
              services.map((service) => (
                <div className="col-md-4" key={service.ObjectId}>
                  <ServiceCard service={service} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
