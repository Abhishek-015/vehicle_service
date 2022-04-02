import React from "react";
import TypeWriterEffect from "../components/typewritter/typeWritterEffect";
import SelectLocation from "../components/forms/locationSelectForn";
import OurServices from "../components/homepage/ourServices";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-warning h2 font-weight-bold text-center mt-2 p-2">
        <TypeWriterEffect
          text={[
            "Vehicle Services corporation welcomes you !!!",
            "Latest services",
            "Best services",
          ]}
        />
      </div>
      <div className="container">
        <SelectLocation />
      </div>
      <h4 className="text-center text-warning p-3 my-5 display-5 jumbotron">
        Our Services
      </h4>
      <OurServices />
    </>
  );
};

export default Home;
