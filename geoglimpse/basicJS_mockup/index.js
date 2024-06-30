document
  .getElementById("searchBtn")
  .addEventListener("click", async function () {
    const countryName = document.getElementById("countryInput").value.trim();

    if (countryName) {
      try {
        const countryCode = getCountryCode(countryName);
        if (countryCode) {
          const countryData = await fetchCountryData(countryCode);
          displayCountryData(countryData, countryName);
        } else {
          alert("Country not found. Please enter a valid country name.");
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
        alert("Failed to fetch country data.");
      }
    } else {
      alert("Please enter a country name.");
    }
  });

async function fetchCountryData(countryCode) {
  const countryAPI = `https://restfulcountries.com/api/v1/countries/${countryCode}?apikey=944|4uv7UsVepzAiZtnsWmgBwRFO1Fzcttwp0QC1ihzU`;

  const countryResponse = await fetch(countryAPI).then((response) =>
    response.json()
  );

  return {
    country: countryResponse,
  };
}

function displayCountryData(countryData, countryName) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  const titleCard = createResultCard(
    `Country Overview: ${capitalizeFirstLetter(countryName)}`,
    ""
  );
  resultsContainer.appendChild(titleCard);

  const countryCard = createCountryCard(countryData.country);
  resultsContainer.appendChild(countryCard);
}

function createCountryCard(country) {
  const card = document.createElement("div");
  card.classList.add("result-card", "card", "mb-3");
  card.innerHTML = `
        <div class="card-header">${country.name}</div>
        <div class="card-body">
            <p class="card-text">Capital: ${country.capital}</p>
            <p class="card-text">Currency: ${country.currency}</p>
            <p class="card-text">Population: ${country.population}</p>
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
