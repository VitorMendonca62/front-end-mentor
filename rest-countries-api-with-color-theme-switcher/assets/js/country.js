const elemFlag = document.querySelector(".flag");
const elemCommon = document.querySelector(".common");
const elemNativeName = document.querySelector(".nativeName");
const elemPopulation = document.querySelector(".population");
const elemRegion = document.querySelector(".region");
const elemSubregion = document.querySelector(".subregion");
const elemCapital = document.querySelector(".capital");
const elemTopLevelDomain = document.querySelector(".topLevelDomain");
const elemCurrencies = document.querySelector(".currencies");
const elemLanguages = document.querySelector(".languages");
const elemBorders = document.querySelector(".borders");

const nameCountry = location.href.split("country=")[1].replace("%20", " ");

async function getData() {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${nameCountry}?fullText=true`
  );
  const data = response.json();
  return data;
}

async function showCountry() {
  const country = await getData();

  const currencies = country[0].currencies;
  for (currency in currencies) {
    elemCurrencies.innerHTML += currencies[currency].name;
  }

  const nativeName = country[0].name.nativeName;
  for (name in nativeName) {
    elemLanguages.innerHTML = country[0].languages[name];
    elemNativeName.innerHTML = nativeName[name].official;
  }

  elemFlag.src = country[0].flags.svg;
  elemCommon.innerHTML = country[0].name.common;
  elemPopulation.innerHTML = country[0].population;
  elemRegion.innerHTML = country[0].region;
  elemSubregion.innerHTML = country[0].subregion;
  elemCapital.innerHTML = country[0].capital;
  elemTopLevelDomain.innerHTML = country[0].tld;

  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${country[0].borders}`
  );
  const countryBorder = await response.json();

  countryBorder.forEach(async (border) => {
    elemBorders.innerHTML += `<span onclick="location.href = location.origin + '/pages/country.html?country=${border.name.common}'">${border.name.common}</span>`;
  });
}

showCountry();

const back = document.querySelector(".back");

back.addEventListener("click", () => (location.href = location.origin));
