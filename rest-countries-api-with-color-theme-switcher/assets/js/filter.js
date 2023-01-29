import { changeStateCountries } from "./darkAndligthmode.js";
import { getData, travelCountries } from "./main.js";

const spanFilter = document.querySelector(".filter");
const listFilter = [...document.querySelectorAll(".select li")];
const elemFilter = document.querySelector(".select");
const elemSearch = document.querySelector("#search");

const containerCountries = document.querySelector(".countries");

spanFilter.addEventListener("click", () => {
  elemFilter.classList.toggle("select-active");
});

async function showCountriesWithFilter(e, filter) {
  const elem = e.target;
  filter = filter ? filter : elem.getAttribute("value");
  containerCountries.innerHTML = "";

  const response = await fetch(
    `https://restcountries.com/v3.1/region/${filter}`
  );
  const countriesInRegion = await response.json();

  spanFilter.innerHTML = filter.replace(filter[0], filter[0].toUpperCase());

  if (elemSearch.value.length > 0) {
    const nameFilteredCountry = elemSearch.value;

    const filteredCountries = countriesInRegion.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(nameFilteredCountry.toLowerCase())
    );
    travelCountries(filteredCountries, 0, filteredCountries.length - 1);
  } else {
    travelCountries(countriesInRegion, 0, countriesInRegion.length - 1);
  }

  return countriesInRegion;
}

listFilter.forEach((filter) => {
  filter.addEventListener("click", showCountriesWithFilter);
});

async function searchCountry() {
  const countries = await getData();
  const nameFilteredCountry = elemSearch.value;
  const filter = spanFilter.innerHTML;
  containerCountries.innerHTML = "";

  const filterCountries = (cou) =>
    cou.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(nameFilteredCountry.toLowerCase())
    );

  if (filter !== "Filter by Region") {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${filter}`
    );
    const countriesInRegion = await response.json();
    const filteredCountries = filterCountries(countriesInRegion);
    travelCountries(filteredCountries, 0, filteredCountries.length - 1);
  } else {
    const filteredCountries = filterCountries(countries);
    travelCountries(filteredCountries, 0, filteredCountries.length - 1);
  }
}

elemSearch.addEventListener("keyup", searchCountry);
