import { loadDataScreens } from "./loadDatas.js";
import { verifyErro } from "./validation.js";

const buttonNextStep = [...document.querySelectorAll(".nextScreen")];
const buttonGoBack = [...document.querySelectorAll(".go-back")];

const stringIndex = location.href.split("step=")[1];
const index = Number(stringIndex) || 1;
let step = index || 1;

const inputsYourInfo = [...document.querySelectorAll(".your-info input")];

function previusScreen(e) {
  step = --step;
  location.href = location.origin + `?step=${step}`;
  loadScreen(step);
}

function nextScreen(e) {
  const changeUrl = () => {
    step = ++step;
    console.log(step);
    step = step > 5 ? 5 : step;
    location.href = location.origin + `?step=${step}`;
    loadScreen(step);
  };
  if (index === 1) {
    const isErro = verifyErro(inputsYourInfo);
    if (!!isErro) {
      changeUrl();
      return "";
    }
  }
  if (index === 2 || index === 3 || index === 4) {
    changeUrl();
  }
}

const cards = [...document.querySelectorAll(".card")];
const numberStep = [...document.querySelectorAll(".number-step")];

function loadScreen(screen) {
  cards.forEach((card) => (card.style.display = "none"));
  cards[index - 1].style.display = "flex";

  numberStep.forEach((number) => number.classList.remove("number-step-active"));
  numberStep[index === 5 ? 3 : index - 1].classList.add("number-step-active");

  loadDataScreens(index);
}

buttonGoBack.forEach((button) =>
  button.addEventListener("click", previusScreen)
);
buttonNextStep.forEach((button) =>
  button.addEventListener("click", nextScreen)
);

window.addEventListener("load", loadScreen);

const numbersSteps = [...document.querySelectorAll(".step")];

numbersSteps.forEach((elem) => {
  const number = elem.querySelector(".number-step");
  elem.addEventListener(
    "click",
    (e) => (location.href = location.origin + `?step=${number.innerText}`)
  );
});

export { index };
