import React from "react";
import Navbar from "./Navbar_Test";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome to GeoGlimpse</h1>
        <h2>- Let's Explore -</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Search for a country..."
        />
      </div>
    </div>
  );
};

export default Homepage;
