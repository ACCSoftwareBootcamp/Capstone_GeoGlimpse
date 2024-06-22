require("dotenv").config();
const express = require("express");
const app = express();
const port = 3002;
// import process.env

const dotenv = process.env;

//Destructured the API Keys
const { WEATHER_API, MAPS_API, NEWS_API, COUNTRIES_API } = process.env;

// Middleware to handle JSON requests
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
