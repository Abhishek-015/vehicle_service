import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { createService, getServices } from "../../utils/serviceRoute";

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
  serviceName: "",
  radius: "",
  rating: "",
  desc: "",
  ImageUrl: "",
  location: "",
  onlinePayment: "",
};

const CreateServiceForm = () => {
  const user = useSelector((state) => state.userDetails);
  const [initial, setInitial] = useState(initialData);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInitial({ ...initial, [name]: value });
  };

  const handleSubmit = (e) => {
    for (let el of Object.values(initial)) {
      if (el === "") {
        toast.error("fill the required fields");
        return;
      }
    }
    const payload = {
      ...initial,
      ObjectId: uuidv4(),
    };

    console.log(payload);
    //post the service to server
    user &&
      user.token &&
      user.role === "admin" &&
      createService(payload)
        .then((res) => {
          toast.success("service created successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    setInitial(initialData);
  };

  return (
    <form type="submit">
      <div className="form-group">
        {JSON.stringify(initial)}
        <br />
        <label>Service Name</label>
        <input
          name="serviceName"
          type="text"
          className="form-control "
          id="exampleFormControlInput1"
          placeholder="Service Name"
          value={initial.serviceName}
          autoFocus
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Radius</label>
        <input
          name="radius"
          type="Number"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Radius"
          value={initial.radius}
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Image Url</label>
        <input
          name="ImageUrl"
          type="url"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter Image Url"
          value={initial.ImageUrl}
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          name="desc"
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Add description"
          value={initial.desc}
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Rating</label>
        <select
          name="rating"
          className="form-control bg-secondary text-white"
          id="exampleFormControlSelect1"
          required
          onChange={handleChange}
        >
          <option value="select Rating" selected disabled hidden>
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
        <label>City</label>
        <select
          name="location"
          className="form-control bg-secondary text-white"
          id="exampleFormControlSelect1"
          required
          onChange={handleChange}
        >
          <option selected disabled hidden>
            select location
          </option>
          {city.map((el) => (
            <option key={el}>{el}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Online Payment</label>
        <select
          name="onlinePayment"
          className="form-control bg-secondary text-white"
          id="exampleFormControlSelect1"
          onChange={handleChange}
        >
          <option selected disabled hidden>
            Online Payment Available
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        onClick={handleSubmit}
      >
        Create
      </button>
    </form>
  );
};

export default CreateServiceForm;
