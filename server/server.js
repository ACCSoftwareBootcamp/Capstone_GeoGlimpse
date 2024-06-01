const express = require("express");
const app = express();
const port = 3002;

// Middleware to handle JSON requests
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// REST Countries API Route
app.get("/api/rest-countries", (req, res) => {
  res.status(200).send("REST Countries API is working!");
});

// Google Maps API Route
app.get("/api/google-maps", (req, res) => {
  res.status(200).send("Google Maps API is working!");
});

// OpenWeather API Route
app.get("/api/openweather", (req, res) => {
  res.status(200).send("OpenWeather API is working!");
});

// News API Route
app.get("/api/news", (req, res) => {
  res.status(200).send("News API is working!");
});

// SkyScanner API Route
app.get("/api/skyscanner", (req, res) => {
  res.status(200).send("SkyScanner API is working!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
