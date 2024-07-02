import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Maps() {
  const [country, setCountry] = useState("");
  const [mapUrl, setMapUrl] = useState(
    "https://www.google.com/maps/embed/v1/view?key=AIzaSyA1u2rNLif_SR6WBSbtufuAOGa-OQ4dL1A&center=0,0&zoom=2"
  );

  const handleSearch = () => {
    if (country) {
      const formattedCountry = country.replace(" ", "+");
      setMapUrl(
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyA1u2rNLif_SR6WBSbtufuAOGa-OQ4dL1A&q=${formattedCountry}`
      );
    }
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
      <iframe
        width="100%"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
      ></iframe>
    </Container>
  );
}

export default Maps;
