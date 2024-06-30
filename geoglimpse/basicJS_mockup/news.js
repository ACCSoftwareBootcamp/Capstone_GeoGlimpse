document
  .getElementById("searchBtn")
  .addEventListener("click", async function () {
    const countryName = document.getElementById("countryInput").value.trim();
    console.log("Country name input:", countryName); // Log country name input

    if (countryName) {
      try {
        const countryCode = getCountryCode(countryName);
        console.log("Country code found:", countryCode); // Log country code found
        if (countryCode) {
          const newsData = await fetchNews(countryCode);
          console.log("News data fetched:", newsData); // Log fetched news data
          displayNews(newsData, countryName);
        } else {
          alert("Country not found. Please enter a valid country name.");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        alert("Failed to fetch news.");
      }
    } else {
      alert("Please enter a country name.");
    }
  });

async function fetchNews(countryCode) {
  const newsAPI = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=8f2024498c2841d7ab642cfc7a0cceee`;
  console.log("News API URL:", newsAPI); // Log the API URL

  const newsResponse = await fetch(newsAPI).then((response) => response.json());
  console.log("News API response:", newsResponse); // Log the API response

  return {
    news: newsResponse.articles,
  };
}

function displayNews(newsData, countryName) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  const titleCard = createResultCard(
    `Top Headlines in ${capitalizeFirstLetter(countryName)}`,
    ""
  );
  titleCard.querySelector(".card-header").style.fontSize = "2rem"; // Larger font size for top headlines title
  resultsContainer.appendChild(titleCard);

  if (newsData.news.length > 0) {
    // Display news articles
    const newsCards = newsData.news.map((article) => createNewsCard(article));
    newsCards.forEach((card) => resultsContainer.appendChild(card));
  } else {
    // Handle case where no articles are found
    const noResultsCard = createResultCard(
      "No articles found",
      "Try searching for a different country."
    );
    resultsContainer.appendChild(noResultsCard);
  }
}

function createNewsCard(article) {
  const card = document.createElement("div");
  card.classList.add("result-card", "card", "mb-3");

  let description = article.description;
  let title = article.title;
  if (!description) {
    const lastHyphenIndex = title.lastIndexOf("-");
    if (lastHyphenIndex !== -1) {
      description = `Source: ${title.substring(lastHyphenIndex + 1).trim()}`;
      title = title.substring(0, lastHyphenIndex).trim(); // Remove the source from the title
    } else {
      description = "Source: Unknown";
    }
  }

  card.innerHTML = `
        <div class="card-header">${title}</div>
        <div class="card-body">
            ${
              article.urlToImage
                ? `<img src="${article.urlToImage}" alt="Article image" class="img-fluid mb-3" style="max-height: 200px;">`
                : ""
            }
            <p class="card-text">${description}</p>
            <a href="${
              article.url
            }" target="_blank" class="btn btn-primary">Read more</a>
        </div>
    `;
  return card;
}

function createResultCard(title, content) {
  const card = document.createElement("div");
  card.classList.add("result-card", "card", "mb-3");
  card.innerHTML = `
        <div class="card-header">${title}</div>
        <div class="card-body">
            <p class="card-text">${content}</p>
        </div>
    `;
  return card;
}

const countryCodeMappings = {
  ae: ["united arab emirates", "uae"],
  ar: ["argentina"],
  at: ["austria"],
  au: ["australia"],
  be: ["belgium"],
  bg: ["bulgaria"],
  br: ["brazil"],
  ca: ["canada"],
  ch: ["switzerland"],
  cn: ["china"],
  co: ["colombia"],
  cu: ["cuba"],
  cz: ["czech republic"],
  de: ["germany"],
  eg: ["egypt"],
  fr: ["france"],
  gb: ["united kingdom", "uk", "england"],
  gr: ["greece"],
  hk: ["hong kong"],
  hu: ["hungary"],
  id: ["indonesia"],
  ie: ["ireland"],
  il: ["israel"],
  in: ["india"],
  it: ["italy"],
  jp: ["japan"],
  kr: ["south korea", "korea"],
  lt: ["lithuania"],
  lv: ["latvia"],
  ma: ["morocco"],
  mx: ["mexico"],
  my: ["malaysia"],
  ng: ["nigeria"],
  nl: ["netherlands", "holland"],
  no: ["norway"],
  nz: ["new zealand"],
  ph: ["philippines"],
  pl: ["poland"],
  pt: ["portugal"],
  ro: ["romania"],
  rs: ["serbia"],
  ru: ["russia"],
  se: ["sweden"],
  sg: ["singapore"],
  si: ["slovenia"],
  sk: ["slovakia"],
  th: ["thailand"],
  tr: ["turkey"],
  tw: ["taiwan"],
  ua: ["ukraine"],
  us: ["united states", "usa", "america"],
  ve: ["venezuela"],
  za: ["south africa"],
};

function getCountryCode(countryName) {
  countryName = countryName.toLowerCase();
  for (const code in countryCodeMappings) {
    if (countryCodeMappings[code].includes(countryName)) {
      return code;
    }
  }
  return null; // Return null if no matching code found
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
