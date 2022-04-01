import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const city = [
  "Kanpur",
  "Mumbai",
  "Banglore",
  "Chennai",
  "Calcutta",
  "Chandigarh",
  "Delhi",
];

const initialData = {
  "service-name": "",
  radius: "",
  rating: "",
  desc: "",
  ImageUrl: "",
  location: "",
};

const CreateServiceForm = () => {
  const [initial, setInitial] = useState(initialData);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInitial({ ...initial, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        ...initial,
        ObjectId:uuidv4()
    }

    console.log(payload);
    setInitial(initialData)
  };

  return (
    <form type="submit">
      <div className="form-group">
        {JSON.stringify(initial)}
        <br />
        <label for="exampleFormControlInput1">Service Name</label>
        <input
          name="service-name"
          type="text"
          className="form-control "
          id="exampleFormControlInput1"
          placeholder="Service Name"
          autoFocus
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label for="exampleFormControlInput1">Radius</label>
        <input
          name="radius"
          type="Number"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Radius"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label for="exampleFormControlInput1">Image Url</label>
        <input
          name="ImageUrl"
          type="url"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter Image Url"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label for="exampleFormControlInput1">Description</label>
        <input
          name="desc"
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Add description"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label for="exampleFormControlSelect1">Rating</label>
        <select
          name="rating"
          className="form-control bg-secondary text-white"
          id="exampleFormControlSelect1"
          onChange={handleChange}
        >
          <option selected disabled hidden>
            select Rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="form-group">
        <label for="exampleFormControlSelect1">City</label>
        <select
          name="location"
          className="form-control bg-secondary text-white"
          id="exampleFormControlSelect1"
          onChange={handleChange}
        >
          <option selected disabled hidden>
            select location
          </option>
          {city.map((el) => (
            <option>{el}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label for="exampleFormControlInput1">Online Payment</label>
        <select
          name="online-payment"
          className="form-control bg-secondary text-white"
          id="exampleFormControlSelect1"
          onChange={handleChange}
        >
          <option selected disabled hidden>
            Online Payment
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <button
        type="submit"
        class="btn btn-primary btn-sm"
        onClick={handleSubmit}
      >
        Create
      </button>
    </form>
  );
};

export default CreateServiceForm;
