import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

function Home() {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = "944|4uv7UsVepzAiZtnsWmgBwRFO1Fzcttwp0QC1ihzU";

  const handleSearch = async () => {
    if (country) {
      try {
        const response = await fetch(
          `https://restfulcountries.com/api/v1/countries/${country}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data && data.data && data.data.population && data.data.currency) {
          setCountryData(data.data);
          setError(""); // Clear any previous errors
        } else {
          setCountryData(null);
          setError("Incomplete data received. Please try a different country.");
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
        setError("Failed to fetch country data.");
        setCountryData(null);
      }
    } else {
      setError("Please enter a country name.");
      setCountryData(null);
    }
  };

  const displayPresident = (president) => {
    if (typeof president === "string") {
      return president;
    } else if (president && typeof president === "object") {
      return president.name; // Assuming the object has a 'name' key
    } else {
      return "N/A";
    }
  };

  const populationDensity = () => {
    // let copyOfCountryData = [...countryData]
    let popNum = countryData.population
    let countrySize = countryData.size
    console.log(popNum,countrySize)
    countrySize = countrySize.replaceAll(",", "").slice(0, countrySize.length - 4)
    // countrySize = countrySize.slice(0, countrySize.length - 4)
    popNum = popNum.replaceAll(",", "")
    console.log(popNum, countrySize)
    return `${(parseInt(popNum) / parseInt(countrySize)).toFixed(2)}/km²`
  }

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
        {countryData ? (
          <Card className="mb-3">
            <Card.Header>{countryData.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>President:</strong>{" "}
                {displayPresident(countryData.current_president)}
              </Card.Text>
              <Card.Text>
                <strong>Population:</strong> {countryData.population}
              </Card.Text>
              <Card.Text>
                <strong>Population Density:</strong> {populationDensity()}
              </Card.Text>
              <Card.Text>
                <strong>Currency:</strong> {countryData.currency}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <p>No data available. Please enter a valid country name.</p>
        )}
      </div>
    </Container>
  );
}

export default Home;
