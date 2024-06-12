require('dotenv').config()
const express = require("express");
const app = express();
const port = 3002;


//Destructured the API Keys
const { API_OpenWeather, API_GoogleMaps, API_News, API_RestfulCountries } = process.env


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
