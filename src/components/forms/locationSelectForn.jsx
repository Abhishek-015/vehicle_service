import React from "react";
import { useNavigate } from "react-router-dom";

const city = [
  "Kanpur",
  "Mumbai",
  "Banglore",
  "Chennai",
  "Calcutta",
  "Chandigarh",
  "Delhi",
];

const SelectLocation = () => {
    const navigate = useNavigate()
  const handleChange = (e) => {
      e.preventDefault()
      console.log(e.target.value);
      navigate(`/services/${e.target.value}`)
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
        >
          <option value="select Rating" selected disabled hidden>
            Select your location...
          </option>
          {city.map((el) => (
            <option key={el}>{el}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SelectLocation;
