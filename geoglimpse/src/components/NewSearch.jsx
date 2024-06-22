import React, { useState } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import Navbar from "./Navbar_Test";

function NewSearch() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [other, setOther] = useState("");

  // useUser hook from clerk-react for accessing the current user's data
  const { user, isLoaded } = useUser();

  // handleSubmit function for handling the form submission
  const handleSubmit = (event) => {
    // Preventing the default form submission behavior
    event.preventDefault();

    if (!isLoaded) {
      console.error("User data is not loaded yet");
      return;
    }

    // Building out the fetch request to the backend
    fetch("http://localhost:3000/newsearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        country,
        city,
        other,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <SignedIn>
      <div className="container">
        <h1 className="text-center my-4">New Search</h1>
        {/* The form for creating a new search */}
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="other" className="form-label">
              Other
            </label>
            <textarea
              className="form-control"
              id="other"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Other"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </SignedIn>
  );
}

export default NewSearch;
