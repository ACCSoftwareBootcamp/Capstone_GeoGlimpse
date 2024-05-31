const express = require("express");
const app = express();
const port = 3002;

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is up :)");
});

// REST Countries Route
app.get("/api/rest-countries", (req, res) => {
  res.status(200).send("REST Countries API");
});

// Google Maps Route
app.get("/api/google-maps", (req, res) => {
  res.status(200).send("Google Maps API");
});

// OpenWeather Route
app.get("/api/openweather", (req, res) => {
  res.status(200).send("OpenWeather API");
});

// News Route
app.get("/api/news", (req, res) => {
  res.status(200).send("News API");
});

// SkyScanner Route
app.get("/api/skyscanner", (req, res) => {
  res.status(200).send("SkyScanner API");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
