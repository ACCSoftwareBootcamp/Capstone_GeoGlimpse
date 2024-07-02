require("dotenv").config();
const express = require("express");
const app = express();
const port = 3002;
// import process.env

const dotenv = process.env;
const { NEWS_KEY } = process.env;

// Middleware to handle JSON requests
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// News endpoint
app.get("/api/news", async (req, res) => {
  const { countryNews } = req.query;
  const apiKeyNews = NEWS_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=${countryNews}&apiKey=${apiKeyNews}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).send("Error fetching news");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
