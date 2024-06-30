document
  .getElementById("searchBtn")
  .addEventListener("click", async function () {
    const countryName = document.getElementById("countryInput").value.trim();

    if (countryName) {
      try {
        const countryCode = getCountryCode(countryName);
        if (countryCode) {
          const mapUrl = getMapUrl(countryCode);
          displayMap(mapUrl, countryName);
        } else {
          alert("Country not found. Please enter a valid country name.");
        }
      } catch (error) {
        console.error("Error fetching map data:", error);
        alert("Failed to fetch map data.");
      }
    } else {
      alert("Please enter a country name.");
    }
  });

function getMapUrl(countryCode) {
  const apiKey = "AIzaSyA1u2rNLif_SR6WBSbtufuAOGa-OQ4dL1A";
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${countryCode}`;
}

function displayMap(mapUrl, countryName) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  const titleCard = createResultCard(
    `Map of ${capitalizeFirstLetter(countryName)}`,
    ""
  );
  resultsContainer.appendChild(titleCard);

  const mapCard = createMapCard(mapUrl);
  resultsContainer.appendChild(mapCard);
}

function createMapCard(mapUrl) {
  const card = document.createElement("div");
  card.classList.add("result-card", "card", "mb-3");
  card.innerHTML = `
        <div class="card-body">
            <iframe src="${mapUrl}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
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
