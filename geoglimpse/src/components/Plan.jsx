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

  const API_KEY_COUNTRIES = "944|4uv7UsVepzAiZtnsWmgBwRFO1Fzcttwp0QC1ihzU";
  const API_KEY_WEATHER = "f7b89105db1741101a4c5b9283d6f938";
  const API_KEY_NEWS = "8f2024498c2841d7ab642cfc7a0cceee";
  const API_KEY_MAPS = "AIzaSyA1u2rNLif_SR6WBSbtufuAOGa-OQ4dL1A";

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
        setError("Failed to fetch data. Please enter a valid country name.");
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
  const renderCountryInfo = () => {
    if (!countryData) return null;
    const flagUrl = `https://flagsapi.com/${countryData.iso2}/flat/64.png`;
    const presidentIcon = <FcBusinessman className="bussineesIcon"/>; // President icon
    const populationIcon =
      "https://img.icons8.com/ios-filled/50/000000/user-group-man-man.png"; // Population icon
    const populationDensityIcon = <FaMapMarkedAlt/>; //PopulationDensity icon
    const currencyIcon =
      "https://img.icons8.com/ios-filled/50/000000/currency-exchange.png"; // Currency icon

    return (
      <Card className="mb-3">
        <Card.Header style={{ textAlign: "center", fontSize: "1.5rem" }}>
          Country Info
        </Card.Header>
        <Card.Body>
          <Card.Img
            src={flagUrl}
            alt={`${countryData.name} flag`}
            style={{
              display: "block",
              margin: "0 auto 10px auto",
              width: "100px",
              height: "auto",
            }}
          />
          <Card.Text style={{ textAlign: "center" }}>
            {/* <img
              src={ }
              alt="President Icon"
              style={{ width: "20px", marginRight: "5px" }}
            /> */}
            {presidentIcon}
            {displayPresident(countryData.current_president)}
          </Card.Text>
          <Card.Text style={{ textAlign: "center" }}>
            <img
              src={populationIcon}
              alt="Population Icon"
              style={{ width: "20px", marginRight: "5px" }}
            />
            {countryData.population}
          </Card.Text>
          <Card.Text style={{ textAlign: "center" }}>
            {populationDensityIcon}
            {populationDensity()}
            </Card.Text>
          <Card.Text style={{ textAlign: "center" }}>
            <img
              src={currencyIcon}
              alt="Currency Icon"
              style={{ width: "20px", marginRight: "5px" }}
            />
            {countryData.currency}
          </Card.Text>
          {/* Add other country info here */}
        </Card.Body>
      </Card>
    );
  };

  const renderWeatherForecast = () => {
    if (!forecastData) return null;

    const filteredForecast = forecastData.filter((entry) =>
      entry.dt_txt.includes("12:00:00")
    );

    return (
      <div>
        <Row>
          <Col md={12}>
            {filteredForecast[0] && (
              <Card className="mb-3" style={{ width: "100%" }}>
                <Card.Header
                  style={{ fontSize: "1.5rem", textAlign: "center" }}
                >
                  {new Date(filteredForecast[0].dt * 1000).toLocaleDateString()}
                </Card.Header>
                <Card.Body style={{ fontSize: "1.2rem", textAlign: "center" }}>
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
        <Row>
          {filteredForecast.slice(1, 5).map((forecast, index) => (
            <Col key={index} sm={6} md={3}>
              <Card className="mb-3">
                <Card.Header>
                  {new Date(forecast.dt * 1000).toLocaleDateString()}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {Math.round(((forecast.main.temp - 273.15) * 9) / 5 + 32)}{" "}
                    °F / {Math.round(forecast.main.temp - 273.15)} °C
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

  const renderNews = () => {
    if (!newsData) return null;

    return newsData.map((article, index) => (
      <div key={index}>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.description}</Card.Text>
        {article.urlToImage && (
          <Card.Img
            src={article.urlToImage}
            alt={article.title}
            style={{ width: "100%", height: "auto", marginBottom: "10px" }}
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
      {countryData && (
        <div className="results-container">
          <Row>
            <Col md={6}>{renderCountryInfo()}</Col>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Header
                  style={{ textAlign: "center", fontSize: "1.5rem" }}
                >
                  Map
                </Card.Header>
                <Card.Body>
                  <div style={{ height: "400px", width: "100%" }}>
                    <iframe
                      width="100%"
                      height="100%"
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
            <Col>
              <Card className="mb-3">
                <Card.Header
                  style={{ textAlign: "center", fontSize: "1.5rem" }}
                >
                  Weather Forecast
                </Card.Header>
                <Card.Body>{renderWeatherForecast()}</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="mb-3">
                <Card.Header
                  style={{ textAlign: "center", fontSize: "1.5rem" }}
                >
                  News
                </Card.Header>
                <Card.Body>{renderNews()}</Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}

export default Plan;
