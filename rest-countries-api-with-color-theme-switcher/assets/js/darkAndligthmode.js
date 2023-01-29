const elemDarkMode = document.querySelector(".dark-mode");

const colors = {
  ligth: {
    background: "hsl(0, 0%, 98%)",
    header: "hsl(0, 0%, 100%)",
    input: "hsl(0, 0%, 52%)",
    text: "hsl(200, 15%, 8%)",
  },
  dark: {
    background: "hsl(207, 26%, 17%)",
    headerAndElements: "hsl(209, 23%, 22%)",
    text: "hsl(0, 0%, 100%)",
  },
};

const functions = {};
let state = "dark";

function changeStateCountries() {
  const countries = [...document.querySelectorAll(".country")];
  countries.forEach((elem) => elem.classList.add("country-ligth"));

  const h2 = [...document.querySelectorAll(".country h2")];
  h2.forEach((elem) => (elem.style.color = colors.ligth.text));

  const p = [...document.querySelectorAll(".country p")];
  p.forEach((elem) => (elem.style.color = colors.ligth.text));

  const span = [...document.querySelectorAll(".country span")];
  span.forEach((elem) => (elem.style.color = colors.ligth.input));
}

function changeState(e) {
  state = state === "dark" ? "ligth" : "dark";

  if (state === "ligth") {
    document.querySelector("header").style.background = colors.ligth.header;
    document.querySelector("header").style.color = colors.ligth.text;
    document.querySelector("body").style.background = colors.ligth.background;
    document.querySelector("main").style.background = colors.ligth.background;
    changeStateCountries();

    document.querySelector(".input-search").style.background =
      colors.ligth.header;
    document.querySelector(".input-search").style.color = colors.ligth.text;
    document.querySelector(".input-search input").style.color =
      colors.ligth.text;
    document.querySelector(".input-search input").classList.add("input-light");

    document.querySelector(".container-select").style.background =
      colors.ligth.header;
    document.querySelector(".container-select").style.color = colors.ligth.text;

    document.querySelector(".select").style.background = colors.ligth.header;
    document.querySelector(".select").style.color = colors.ligth.text;

    functions.changeStateCountries = changeStateCountries;
  }
  if (state === "dark") {
    document.querySelector("header").style.background =
      colors.dark.headerAndElements;
    document.querySelector("header").style.color = colors.dark.text;
    document.querySelector("body").style.background = colors.dark.background;
    document.querySelector("main").style.background = colors.dark.background;

    document.querySelector(".input-search").style.background =
      colors.dark.headerAndElements;
    document.querySelector(".input-search").style.color = colors.dark.text;
    document.querySelector(".input-search input").style.color =
      colors.dark.text;
    document.querySelector(".input-search input").classList.add("input-light");

    document.querySelector(".container-select").style.background =
      colors.dark.headerAndElements;
    document.querySelector(".container-select").style.color = colors.dark.text;

    document.querySelector(".select").style.background =
      colors.dark.headerAndElements;
    document.querySelector(".select").style.color = colors.dark.text;

    const countries = [...document.querySelectorAll(".country")];
    countries.forEach((elem) => elem.classList.remove("country-ligth"));

    const h2 = [...document.querySelectorAll(".country h2")];
    h2.forEach((elem) => (elem.style.color = colors.dark.text));

    const p = [...document.querySelectorAll(".country p")];
    p.forEach((elem) => (elem.style.color = colors.dark.text));

    const span = [...document.querySelectorAll(".country span")];
    span.forEach((elem) => (elem.style.color = colors.dark.input));
  }
}

elemDarkMode.addEventListener("click", changeState);

export { changeStateCountries };
