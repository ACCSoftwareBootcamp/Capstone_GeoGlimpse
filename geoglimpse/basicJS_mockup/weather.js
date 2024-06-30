document
  .getElementById("searchBtn")
  .addEventListener("click", async function () {
    const userInput = document.getElementById("countryInput").value.trim();

    if (userInput) {
      try {
        let capitalCity;
        if (userInput.length === 2) {
          // Check if user input is a two-letter country code
          capitalCity = getCapitalCityByCode(userInput.toLowerCase());
        } else {
          // Assume user input is a country name
          capitalCity = getCapitalCity(userInput.toLowerCase());
        }

        if (capitalCity) {
          // Fetch current weather
          const currentWeatherData = await fetchCurrentWeather(capitalCity);
          displayCurrentWeather(
            currentWeatherData,
            capitalizeFirstLetter(capitalCity),
            userInput
          );

          // Fetch 5-day forecast
          const forecastData = await fetchForecast(capitalCity);
          displayForecast(forecastData, currentWeatherData.weather.timezone);
        } else {
          alert(
            "Capital city not found for the entered input. Please enter a valid country name or code."
          );
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Failed to fetch weather.");
      }
    } else {
      alert("Please enter a country name or code.");
    }
  });

async function fetchCurrentWeather(capitalCity) {
  const apiKey = "f7b89105db1741101a4c5b9283d6f938";
  const currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${apiKey}`;

  const weatherResponse = await fetch(currentWeatherAPI).then((response) =>
    response.json()
  );

  return {
    weather: weatherResponse,
  };
}

async function fetchForecast(capitalCity) {
  const apiKey = "f7b89105db1741101a4c5b9283d6f938";
  const forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${capitalCity}&appid=${apiKey}`;

  const forecastResponse = await fetch(forecastAPI).then((response) =>
    response.json()
  );

  return {
    forecast: forecastResponse,
  };
}

function displayCurrentWeather(weatherData, capitalCityName, userInput) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  const countryName = capitalizeFirstLetter(userInput);
  const tempC = (weatherData.weather.main.temp - 273.15).toFixed(2);
  const tempF = (
    ((weatherData.weather.main.temp - 273.15) * 9) / 5 +
    32
  ).toFixed(2);

  const weatherIcon = getWeatherIcon(weatherData.weather.weather[0].icon);

  // Display current weather
  const weatherCard = createResultCard(
    `Weather in ${countryName}`,
    `
        <p>Capital City: ${capitalCityName}</p>
        <p>${tempC} °C / ${tempF} °F</p>
        <p>${weatherData.weather.weather[0].description}</p>
        <img src="${weatherIcon}" class="img-fluid mx-auto d-block" alt="Weather Icon" style="max-width: 400px;">
    `
  );
  resultsContainer.appendChild(weatherCard);

  // Set background color based on local time of the capital city
  const isNight = isNightTime(
    new Date().getTime() + weatherData.weather.timezone * 1000
  );
  resultsContainer.querySelector(
    ".result-card .card-body"
  ).style.backgroundColor = isNight
    ? "rgba(111, 66, 193, 0.8)"
    : "rgba(255, 193, 7, 0.8)";
}

function displayForecast(forecastData, timezoneOffset) {
  const forecastContainer = document.createElement("div");
  forecastContainer.classList.add("forecast-container");

  forecastData.forecast.list.forEach((item) => {
    const formattedDateTime = formatDateTime(item.dt_txt, timezoneOffset);
    const weatherIcon = getWeatherIcon(item.weather[0].icon);
    const isNight = isNightTime(
      new Date(item.dt * 1000 + timezoneOffset * 1000).getTime()
    );

    const forecastCard = createForecastCard(
      formattedDateTime,
      item.main.temp,
      weatherIcon,
      isNight
    );
    forecastContainer.appendChild(forecastCard);
  });

  document.getElementById("results").appendChild(forecastContainer);
}

function createForecastCard(dateTime, temperature, weatherIcon, isNight) {
  const tempC = (temperature - 273.15).toFixed(2);
  const tempF = (((temperature - 273.15) * 9) / 5 + 32).toFixed(2);

  const card = document.createElement("div");
  card.classList.add("card", "text-center", "mb-3");
  card.innerHTML = `
        <div class="card-header">${dateTime}</div>
        <div class="card-body" style="background-color: ${
          isNight ? "rgba(111, 66, 193, 0.8)" : "rgba(255, 193, 7, 0.8)"
        };">
            <h5 class="card-title">${tempC} °C / ${tempF} °F</h5>
            <img src="${weatherIcon}" class="img-fluid mx-auto d-block" alt="Weather Icon" style="max-width: 200px;">
        </div>
    `;

  return card;
}

function createResultCard(title, content) {
  const card = document.createElement("div");
  card.classList.add("result-card", "card", "bg-light", "mb-3");
  card.innerHTML = `
        <h3 class="card-header">${title}</h3>
        <div class="card-body">
            ${content}
        </div>
    `;
  return card;
}

function formatDateTime(dt_txt, timezoneOffset) {
  const date = new Date(dt_txt);
  const localDate = new Date(date.getTime() + timezoneOffset * 1000);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    hour12: true,
  };
  return localDate.toLocaleDateString("en-US", options);
}

function getWeatherIcon(iconCode) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function getCapitalCity(countryNameOrCode) {
  // Check if input is a country name
  if (countryToCapitalCity.hasOwnProperty(countryNameOrCode)) {
    return countryToCapitalCity[countryNameOrCode];
  }
  // Check if input is a two-letter country code
  if (countryCodeToCapitalCity.hasOwnProperty(countryNameOrCode)) {
    return countryCodeToCapitalCity[countryNameOrCode];
  }
  return null;
}

function getCapitalCityByCode(countryCode) {
  return countryCodeToCapitalCity[countryCode];
}

function isNightTime(timestamp) {
  const date = new Date(timestamp);
  const hour = date.getUTCHours(); // Get hours in UTC
  return hour >= 19 || hour < 7; // Night is considered from 7pm to 7am (local time)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
