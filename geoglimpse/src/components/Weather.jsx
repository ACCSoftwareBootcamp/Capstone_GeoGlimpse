import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

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

const countryCodeToCapitalCity = {
  ae: "abu dhabi",
  ar: "buenos aires",
  at: "vienna",
  au: "canberra",
  be: "brussels",
  bg: "sofia",
  br: "brasília",
  ca: "ottawa",
  ch: "bern",
  cn: "beijing",
  co: "bogotá",
  cu: "havana",
  cz: "prague",
  de: "berlin",
  eg: "cairo",
  fr: "paris",
  gb: "london", // UK and GB both map to London
  gr: "athens",
  hk: "hong kong",
  hu: "budapest",
  id: "jakarta",
  ie: "dublin",
  il: "jerusalem",
  in: "new delhi",
  it: "rome",
  jp: "tokyo",
  kr: "seoul",
  lt: "vilnius",
  lv: "riga",
  ma: "rabat",
  mx: "mexico city",
  my: "kuala lumpur",
  ng: "abuja",
  nl: "amsterdam",
  no: "oslo",
  nz: "wellington",
  ph: "manila",
  pl: "warsaw",
  pt: "lisbon",
  ro: "bucharest",
  rs: "belgrade",
  ru: "moscow",
  se: "stockholm",
  sg: "singapore",
  si: "ljubljana",
  sk: "bratislava",
  th: "bangkok",
  tr: "ankara",
  tw: "taipei",
  ua: "kyiv",
  us: "washington, d.c.",
  ve: "caracas",
  za: "pretoria",
};

const Weather = () => {
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "f7b89105db1741101a4c5b9283d6f938";

  const handleSearch = async () => {
    if (country) {
      try {
        let capitalCity;
        if (country.length === 2) {
          capitalCity = getCapitalCityByCode(country.toLowerCase());
        } else {
          capitalCity = getCapitalCity(
            country.toLowerCase().replace(/\s/g, "")
          );
        }

        if (!capitalCity) {
          setError("Invalid country name or code. Please try again.");
          setWeatherData(null);
          setForecastData(null);
          return;
        }

        console.log(`Fetching weather data for capital city: ${capitalCity}`);

        const currentWeatherData = await fetchCurrentWeather(capitalCity);
        setWeatherData(currentWeatherData);

        const forecastData = await fetchForecast(capitalCity);
        setForecastData(forecastData);

        setError(""); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data.");
        setWeatherData(null);
        setForecastData(null);
      }
    } else {
      setError("Please enter a country name or code.");
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const getCapitalCity = (countryName) => {
    console.log(`Looking up capital city for country: ${countryName}`);
    return countryToCapitalCity[countryName];
  };

  const getCapitalCityByCode = (countryCode) => {
    console.log(`Looking up capital city for country code: ${countryCode}`);
    return countryCodeToCapitalCity[countryCode];
  };

  const fetchCurrentWeather = async (capitalCity) => {
    const currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${API_KEY}`;
    const response = await fetch(currentWeatherAPI);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  };

  const fetchForecast = async (capitalCity) => {
    const forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${capitalCity}&appid=${API_KEY}`;
    const response = await fetch(forecastAPI);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  };

  const displayWeather = (weather) => {
    const tempC = (weather.main.temp - 273.15).toFixed(2);
    const tempF = (((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2);
    const weatherIcon = getWeatherIcon(weather.weather[0].icon);
    const capitalCityName =
      countryToCapitalCity[country.toLowerCase().replace(/\s/g, "")];

    return (
      <Card className="mb-3">
        <Card.Header>
          Current Weather in {formatCityName(capitalCityName)}
        </Card.Header>
        <Card.Body>
          <h5>
            {tempC} °C / {tempF} °F
          </h5>
          <p>{weather.weather[0].description}</p>
          <img
            src={weatherIcon}
            alt="Weather Icon"
            style={{ maxWidth: "200px" }}
          />
        </Card.Body>
      </Card>
    );
  };

  const displayForecast = (forecast) => {
    return forecast.list.map((item, index) => {
      const tempC = (item.main.temp - 273.15).toFixed(2);
      const tempF = (((item.main.temp - 273.15) * 9) / 5 + 32).toFixed(2);
      const weatherIcon = getWeatherIcon(item.weather[0].icon);
      const dateTime = new Date(item.dt * 1000).toLocaleString();

      return (
        <Card key={index} className="mb-3">
          <Card.Header>{dateTime}</Card.Header>
          <Card.Body>
            <h5>
              {tempC} °C / {tempF} °F
            </h5>
            <p>{item.weather[0].description}</p>
            <img
              src={weatherIcon}
              alt="Weather Icon"
              style={{ maxWidth: "100px" }}
            />
          </Card.Body>
        </Card>
      );
    });
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatCityName = (cityName) => {
    if (!cityName) return "";
    return cityName
      .split(" ")
      .map((word) => {
        if (word.toLowerCase() === "d.c.") {
          return "D.C.";
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      })
      .join(" ");
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
        {weatherData && displayWeather(weatherData)}
        {forecastData && displayForecast(forecastData)}
      </div>
    </Container>
  );
};

export default Weather;
