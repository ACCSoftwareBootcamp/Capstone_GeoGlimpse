document.getElementById('searchBtn').addEventListener('click', async function() {
const countryName = document.getElementById('countryInput').value.trim();

    if (countryName) {
        try {
            const countryData = await fetchCountryData(countryName);
            displayCountryInfo(countryData);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch country information.');
        }
    } else {
        alert('Please enter a country name.');
    }

});

async function fetchCountryData(countryName) {
const restfulCountriesAPI = `https://restfulcountries.com/api/v1/countries/${countryName}?key=944|4uv7UsVepzAiZtnsWmgBwRFO1Fzcttwp0QC1ihzU`;
const newsAPI = `https://newsapi.org/v2/top-headlines?country=${countryName}&apiKey=8f2024498c2841d7ab642cfc7a0cceee`;
const openWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=f7b89105db1741101a4c5b9283d6f938`;

    const [countryInfoResponse, newsResponse, weatherResponse] = await Promise.all([
        fetch(restfulCountriesAPI).then(response => response.json()),
        fetch(newsAPI).then(response => response.json()),
        fetch(openWeatherAPI).then(response => response.json())
    ]);

    return {
        countryInfo: countryInfoResponse,
        news: newsResponse.articles,
        weather: weatherResponse
    };

}

function displayCountryInfo(countryData) {
const resultsContainer = document.getElementById('results');
resultsContainer.innerHTML = '';

    // Display weather
    const weatherCard = createResultCard('Weather', `
        <p>Temperature: ${countryData.weather.main.temp} K</p>
        <p>Description: ${countryData.weather.weather[0].description}</p>
    `);
    resultsContainer.appendChild(weatherCard);

    // Display news
    const newsCard = createResultCard('News', formatNews(countryData.news));
    resultsContainer.appendChild(newsCard);

    // Display Google Maps
    const googleMapsCard = createResultCard('Location', `
        <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA1u2rNLif_SR6WBSbtufuAOGa-OQ4dL1A&q=${countryData.countryInfo.name}"
            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    `);
    resultsContainer.appendChild(googleMapsCard);

    // Display basic country overview
    const overviewCard = createResultCard('Overview', `
        <p>Capital: ${countryData.countryInfo.capital}</p>
        <p>Currency: ${countryData.countryInfo.currencies[0].name} (${countryData.countryInfo.currencies[0].code})</p>
    `);
    resultsContainer.appendChild(overviewCard);

}

function createResultCard(title, content) {
const card = document.createElement('div');
card.classList.add('result-card');
card.innerHTML = `        <h2>${title}</h2>
        <div>${content}</div>
   `;
return card;
}

function formatNews(news) {
return news.map(article => `        <div>
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        </div>
   `).join('');
}
