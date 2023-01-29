const containerCountries = document.querySelector(".countries");
let start = 0;
let end = 50;

async function getData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  return data;
}

function travelCountries(data, min, max) {
  for (let i = min; i <= max; i++) {
    const country = data[i];
    const flag = country.flags.png;
    const name = country.name.common;
    const population = country.population;
    const region = country.region;
    const capital = country.capital;
    const htmlCountry = `
            <div class="country" name="${name}">
                <img src="${flag}" alt="Flag ${name}" />
                <div class="infos">
                    <h2 class="title">${name}</h2>
                    <p>Population: <span>${population}</span></p>
                    <p>Region: <span>${region}</span></p>
                    <p>Capital: <span>${capital}</span></p>
                </div>
            </div>
            `;
    containerCountries.innerHTML += htmlCountry;
  }

  const elemCountries = [...document.querySelectorAll(".country")];
  elemCountries.forEach((elemCountry) => {
    elemCountry.addEventListener("click", direcShowCountry);
  });
}

async function showCountries() {
  const countries = await getData();

  travelCountries(countries, start, end);
}
window.addEventListener("load", showCountries);

function direcShowCountry(e) {
  const elem = e.target ? e.target : e;
  const father = elem.parentElement;
  
  if (!father.classList.contains("country") ) {
    direcShowCountry(father);
    return "";
  }
  const country = father.getAttribute("name");

  location.href = location.origin + `/pages/country.html?country=${country}`;
}

const elemSearch = document.querySelector("#search");
const spanFilter = document.querySelector(".filter");

window.addEventListener("scroll", async (e) => {
  const countries = await getData();

  if (
    elemSearch.value.length === 0 &&
    spanFilter.innerHTML == "Filter by Region"
  ) {
    const heightDocument = document.body.scrollHeight;
    const valueScrollY = window.scrollY;
    const percentage = (valueScrollY * 100) / heightDocument;

    if (percentage > 43 && start <= 150 && end <= 200) {
      start += 50;
      end += 50;
      travelCountries(countries, start, end);
    }
  }
});

export { getData, travelCountries };
