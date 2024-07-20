import React, { useState } from "react";
import { FcBusinessman } from "react-icons/fc";
import { FaMapMarkedAlt } from "react-icons/fa";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";

function Plan() {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [mapUrl, setMapUrl] = useState("");
  const [error, setError] = useState("");

  const API_KEY_COUNTRIES = import.meta.env.VITE_COUNTRIES_KEY;
  const API_KEY_WEATHER = import.meta.env.VITE_WEATHER_KEY;
  const API_KEY_NEWS = import.meta.env.VITE_NEWS_KEY;
  const API_KEY_MAPS = import.meta.env.VITE_MAPS_KEY;

  const handleSearch = async () => {
    if (country) {
      try {
        const countryResponse = await fetch(
          `https://restfulcountries.com/api/v1/countries/${country}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY_COUNTRIES}`,
            },
          }
        );

        if (!countryResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const countryData = await countryResponse.json();

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${countryData.data.capital}&appid=${API_KEY_WEATHER}`
        );
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${countryData.data.capital}&appid=${API_KEY_WEATHER}`
        );
        const forecastData = await forecastResponse.json();

        const newsResponse = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${countryData.data.iso2}&apiKey=${API_KEY_NEWS}`
        );
        const newsData = await newsResponse.json();

        const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY_MAPS}&q=${country}`;

        setCountryData(countryData.data);
        setWeatherData(weatherData);
        setForecastData(forecastData.list);
        setNewsData(
          newsData.articles.filter(
            (article) => !article.title.includes("[Removed]")
          )
        );
        setMapUrl(mapUrl);

        setError(""); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Possible invalid country name. Wait 5 sec & retry.");
        setCountryData(null);
        setWeatherData(null);
        setForecastData(null);
        setNewsData(null);
        setMapUrl("");
      }
    } else {
      setError("Please enter a country name.");
      setCountryData(null);
      setWeatherData(null);
      setForecastData(null);
      setNewsData(null);
      setMapUrl("");
    }
  };

  // -----------------------------------

  // President info:
  const displayPresident = (president) => {
    if (typeof president === "string") {
      return president;
    } else if (Array.isArray(president)) {
      return president.map((pres) => pres.name).join(", ");
    } else if (president && typeof president === "object") {
      return president.name; // Assuming the object has a 'name' key
    } else {
      return "N/A";
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatCityName = (cityName) => {
    return cityName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const populationDensity = () => {
    let popNum = countryData.population;
    let countrySize = countryData.size;
    countrySize = countrySize
      .replaceAll(",", "")
      .slice(0, countrySize.length - 4);
    popNum = popNum.replaceAll(",", "");
    return `${(((parseInt(popNum)) / (parseInt(countrySize))) / 0.386102).toFixed(2)}/Mi²`;
  };

  const renderCountryInfo = () => {
    if (!countryData) return null;
    const flagUrl = `https://flagsapi.com/${countryData.iso2}/flat/64.png`;
    const presidentIcon = <FcBusinessman className="bussineesIcon" />; // President icon
    const populationIcon =
      "https://img.icons8.com/ios-filled/50/000000/user-group-man-man.png"; // Population icon
    const populationDensityIcon = <FaMapMarkedAlt />; // PopulationDensity icon
    const currencyIcon =
      "https://img.icons8.com/ios-filled/50/000000/currency-exchange.png"; // Currency icon

    return (
      <Card className="mb-3">
        <Card.Header className="text-center fs-4">Country Info</Card.Header>
        <Card.Body className="card-body-country">
          <Card.Img
            src={flagUrl}
            alt={`${countryData.name} flag`}
            className="d-block mx-auto my-2"
            style={{ width: "100px", height: "auto" }}
          />

          {/* If country's president doesn't appear */}
          {countryData.current_president !== null && (
            <Card.Text className="text-center">
              {presidentIcon}{" "}
              <span className="ms-2">
                {displayPresident(countryData.current_president)}
              </span>
            </Card.Text>
          )}
          <Card.Text className="text-center">
            <img
              src={populationIcon}
              alt="Population Icon"
              style={{ width: "20px", marginRight: "5px" }}
            />
            {countryData.population}
          </Card.Text>
          <Card.Text className="text-center">
            {populationDensityIcon}
            <span className="ms-2">{populationDensity()}</span>
          </Card.Text>
          <Card.Text className="text-center">
            <img
              src={currencyIcon}
              alt="Currency Icon"
              style={{ width: "20px", marginRight: "5px" }}
            />
            {countryData.currency}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  // -----------------------------------

  // OpenWeather API results box
  const renderWeatherForecast = () => {
    if (!forecastData) return null;

    // Make the results show temps by the hour
    const filteredForecast = forecastData.filter((entry) =>
      entry.dt_txt.includes("12:00:00")
    );

    return (
      <div>
        <Row>
          <Col md={12}>
            {filteredForecast[0] && (
              <Card className="weather-card mb-3" style={{ width: "100%" }}>
                <Card.Header className="text-center fs-4">
                  {new Date(filteredForecast[0].dt * 1000).toLocaleDateString()}
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Text>
                    {Math.round(
                      ((filteredForecast[0].main.temp - 273.15) * 9) / 5 + 32
                    )}{" "}
                    °F / {Math.round(filteredForecast[0].main.temp - 273.15)} °C
                  </Card.Text>
                  <Card.Text>
                    {capitalizeFirstLetter(
                      filteredForecast[0].weather[0].description
                    )}
                  </Card.Text>
                  <Card.Img
                    src={`http://openweathermap.org/img/wn/${filteredForecast[0].weather[0].icon}@2x.png`}
                    alt={filteredForecast[0].weather[0].description}
                    style={{ width: "100px", height: "100px" }}
                  />
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>

        {/* 1st result spans more columns to let user know its current weather */}
        <Row className="forecast-container">
          {filteredForecast.slice(1, 5).map((forecast, index) => (
            <Col key={index} sm={6} md={3} className="d-flex">
              <Card className="weather-card mb-3">
                <Card.Header className="text-center fs-4">
                  {new Date(forecast.dt * 1000).toLocaleDateString()}
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Text>
                    {Math.round(((forecast.main.temp - 273.15) * 9) / 5 + 32)} °F / {Math.round(forecast.main.temp - 273.15)} °C
                  </Card.Text>
                  <Card.Text>
                    {capitalizeFirstLetter(forecast.weather[0].description)}
                  </Card.Text>
                  <Card.Img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt={forecast.weather[0].description}
                    style={{ width: "100px", height: "100px" }}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  // -----------------------------------

  // News API results box:
  const renderNews = () => {
    if (!newsData) return null;

    // limit to 10 news results per country using slice
    return newsData.slice(0, 10).map((article, index) => (
      <div key={index} className="mb-3">
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.description}</Card.Text>
        {article.urlToImage && (
          <Card.Img
            src={article.urlToImage}
            alt={article.title}
            className="news-image"
          />
        )}
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
        <hr />
      </div>
    ));
  };

  return (
    // -----------------------------------------

    // Logo area
    <Container className="mt-4">
      <Row>
        <Col md={12} className="text-center mb-4">
          <img
            src="https://imagesupload.xyz/ib/LNH0dYjzVAHw7mG_1721258956.png"
            alt="GeoGlimpse Logo"
            className="d-block mx-auto my-3"
            style={{ width: "150px", height: "170px" }}
          />
          <br></br>
          <br></br>
          <h1>Learn, Plan, Go</h1>
        </Col>
      </Row>

      {/* ----------------------------------- */}

      {/* Search bar */}
      <Form
        className="mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Form.Group controlId="countryInput" className="form-group-search">
          <Form.Control
            type="text"
            placeholder="Search for a country to get started..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button variant="primary" type="submit" className="btn">
            Search
          </Button>
        </Form.Group>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* ----------------------------------- */}

      {/* Countries API results box */}
      {countryData && (
        <div className="results-container">
          <Row>
            <Col md={6}>{renderCountryInfo()}</Col>
            <Col md={6}>
              <Card className="mb-3">
                {/* Google Maps API results box */}
                <Card.Header className="text-center fs-4">Map</Card.Header>
                <Card.Body>
                  <div className="map-container">
                    <iframe
                      width="100%"
                      height="450"
                      frameBorder="0"
                      allowFullScreen
                      src={mapUrl}
                      title="Map"
                    ></iframe>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            {/* Header of OpenWeather API results box */}
            <Col>
              <Card className="mb-3">
                <Card.Header className="text-center fs-4">
                  Weather Forecast
                </Card.Header>
                <Card.Body>{renderWeatherForecast()}</Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Header of News API results box */}
          <Row>
            <Col>
              <Card className="mb-3">
                <Card.Header className="text-center fs-4">News</Card.Header>
                <Card.Body>{renderNews()}</Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      {/* ----------------------------------- */}

      {/* copyright for footer, grabs current year */}
      <footer className="mt-4 text-center">
        <p>&copy; {new Date().getFullYear()} GeoGlimpse</p>
      </footer>
    </Container>
  );
}

export default Plan;
