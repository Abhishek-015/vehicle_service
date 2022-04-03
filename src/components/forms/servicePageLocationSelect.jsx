import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SEARCH_QUERY } from "../../redux/actionTypes";

const city = [
  "Kanpur",
  "Mumbai",
  "Banglore",
  "Chennai",
  "Calcutta",
  "Chandigarh",
  "Delhi",
];

const ServicePageLocationSelect = () => {
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    dispatch({
      type: SEARCH_QUERY,
      payload: e.target.value,
    });
    navigate(`/services`);
  };

  return (
    <form>
      <div className="form-group">
        <select
          name="location"
          className="form-control bg-secondary text-white"
          id="exampleFormControlSelect1"
          required
          onChange={handleChange}
          //   defaultValue={searchQuery !== "" && searchQuery}
        >
          <option value="select Rating" selected disabled hidden>
            {searchQuery != "" ? searchQuery : "Select your location..."}
          </option>
          {city.map((el) => (
            <option key={el}>{el}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default ServicePageLocationSelect;
