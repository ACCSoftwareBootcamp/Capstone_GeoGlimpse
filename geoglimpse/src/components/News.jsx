import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

function News() {
  const [country, setCountry] = useState("");
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = "8f2024498c2841d7ab642cfc7a0cceee";

  const handleSearch = async () => {
    if (country) {
      try {
        const countryCode = getCountryCode(country);
        if (!countryCode) {
          setError("Invalid country name. Please try a different country.");
          setNewsData(null);
          return;
        }

        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError(
            "Expected JSON response but received: " + contentType
          );
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data && data.articles) {
          setNewsData(data.articles);
          setError(""); // Clear any previous errors
        } else {
          setNewsData(null);
          setError("No articles found. Please try a different country.");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(`Failed to fetch news: ${error.message}`);
        setNewsData(null);
      }
    } else {
      setError("Please enter a country name.");
      setNewsData(null);
    }
  };

  const getCountryCode = (countryName) => {
    const countryCodes = {
      "united arab emirates": "ae",
      argentina: "ar",
      austria: "at",
      australia: "au",
      belgium: "be",
      bulgaria: "bg",
      brazil: "br",
      canada: "ca",
      switzerland: "ch",
      china: "cn",
      colombia: "co",
      cuba: "cu",
      "czech republic": "cz",
      germany: "de",
      egypt: "eg",
      france: "fr",
      "united kingdom": "gb",
      greece: "gr",
      "hong kong": "hk",
      hungary: "hu",
      indonesia: "id",
      ireland: "ie",
      israel: "il",
      india: "in",
      italy: "it",
      japan: "jp",
      "south korea": "kr",
      lithuania: "lt",
      latvia: "lv",
      morocco: "ma",
      mexico: "mx",
      malaysia: "my",
      nigeria: "ng",
      netherlands: "nl",
      norway: "no",
      "new zealand": "nz",
      philippines: "ph",
      poland: "pl",
      portugal: "pt",
      romania: "ro",
      serbia: "rs",
      russia: "ru",
      sweden: "se",
      singapore: "sg",
      slovenia: "si",
      slovakia: "sk",
      thailand: "th",
      turkey: "tr",
      taiwan: "tw",
      ukraine: "ua",
      "united states": "us",
      venezuela: "ve",
      "south africa": "za",
    };

    return countryCodes[countryName.toLowerCase()] || null;
  };

  const displaySource = (title) => {
    const lastHyphenIndex = title.lastIndexOf("-");
    if (lastHyphenIndex !== -1) {
      return title.slice(lastHyphenIndex + 1).trim();
    }
    return "N/A";
  };

  return (
    <Container className="mt-4">
      <Form className="mb-4">
        <Form.Group controlId="countryInput">
          <Form.Control
            type="text"
            placeholder="Enter a country..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="results-container mt-4">
        {newsData ? (
          newsData.map((article, index) => (
            <Card key={index} className="mb-3">
              <Card.Header>{article.title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {article.description ||
                    `Source: ${displaySource(article.title)}`}
                </Card.Text>
                <Card.Img
                  variant="top"
                  src={article.urlToImage || "https://via.placeholder.com/200"}
                  alt="News image"
                />
                <Card.Link
                  className="imgLink"
                  href={article.url}
                  target="_blank"
                >
                  Read more
                </Card.Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No data available. Please enter a valid country name.</p>
        )}
      </div>
    </Container>
  );
}

export default News;
