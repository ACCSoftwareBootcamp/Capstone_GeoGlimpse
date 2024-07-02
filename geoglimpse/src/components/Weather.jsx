import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

function Weather() {
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const handleSearch = async () => {
    try {
      const capitalCity = getCapitalCity(country);
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=f7b89105db1741101a4c5b9283d6f938`
      );
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${capitalCity}&appid=f7b89105db1741101a4c5b9283d6f938`
      );
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData.list);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const getCapitalCity = (country) => {
    const countryToCapitalCity = {
      unitedarabemirates: "abu dhabi",
      argentina: "buenos aires",
      austria: "vienna",
      australia: "canberra",
      belgium: "brussels",
      bulgaria: "sofia",
      brazil: "brasília",
      canada: "ottawa",
      switzerland: "bern",
      china: "beijing",
      colombia: "bogotá",
      cuba: "havana",
      czechrepublic: "prague",
      germany: "berlin",
      egypt: "cairo",
      france: "paris",
      unitedkingdom: "london",
      greece: "athens",
      hongkong: "hong kong",
      hungary: "budapest",
      indonesia: "jakarta",
      ireland: "dublin",
      israel: "jerusalem",
      india: "new delhi",
      italy: "rome",
      japan: "tokyo",
      southkorea: "seoul",
      lithuania: "vilnius",
      latvia: "riga",
      morocco: "rabat",
      mexico: "mexico city",
      malaysia: "kuala lumpur",
      nigeria: "abuja",
      netherlands: "amsterdam",
      norway: "oslo",
      newzealand: "wellington",
      philippines: "manila",
      poland: "warsaw",
      portugal: "lisbon",
      romania: "bucharest",
      serbia: "belgrade",
      russia: "moscow",
      sweden: "stockholm",
      singapore: "singapore",
      slovenia: "ljubljana",
      slovakia: "bratislava",
      thailand: "bangkok",
      turkey: "ankara",
      taiwan: "taipei",
      ukraine: "kyiv",
      unitedstates: "washington, d.c.",
      venezuela: "caracas",
      southafrica: "pretoria",
    };
    return countryToCapitalCity[country.toLowerCase()];
  };

  return (
    <Container className="mt-4">
      <Form>
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
      <div className="results-container mt-4">
        {weatherData && (
          <Card className="mb-3">
            <Card.Header>Weather in {country}</Card.Header>
            <Card.Body>
              <Card.Text>Capital City: {weatherData.name}</Card.Text>
              <Card.Text>
                {(weatherData.main.temp - 273.15).toFixed(2)} °C /{" "}
                {(((weatherData.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)}{" "}
                °F
              </Card.Text>
              <Card.Text>{weatherData.weather[0].description}</Card.Text>
              <Card.Img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </Card.Body>
          </Card>
        )}
        <div className="forecast-container">
          {forecastData.map((item, index) => (
            <Card key={index} className="mb-3">
              <Card.Header>
                {new Date(item.dt_txt).toLocaleString()}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {(item.main.temp - 273.15).toFixed(2)} °C /{" "}
                  {(((item.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)} °F
                </Card.Text>
                <Card.Img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Weather;
