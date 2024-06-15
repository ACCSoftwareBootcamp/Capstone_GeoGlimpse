require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;

//Destructured the API Keys
const { API_OpenWeather, API_GoogleMaps, API_News, API_RestfulCountries } =
  process.env;

// Middleware to handle JSON requests
app.use(express.json());

// allow any browser to access our API
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/GoogleMaps", function (req, res) {
  console.log(API_GoogleMaps);
  res.json(API_GoogleMaps);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/Weather", function (req, res) {
  console.log(API_OpenWeather);
  res.json(API_OpenWeather);
});

app.get("/News", function (req, res) {
  console.log(API_News);
  res.json(API_News);
});

app.get("/Countries", function (req, res) {
  console.log(API_RestfulCountries);
  res.json(API_RestfulCountries);
});
