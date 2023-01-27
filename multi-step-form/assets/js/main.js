import { loadDataScreens } from "./loadDatas.js";
import { verifyErro } from "./validation.js";

const stringIndex = location.href.split("step=")[1];
const index = Number(stringIndex) || 1;
let step = index || 1;

const buttonNextStep = [...document.querySelectorAll(".nextScreen")];
const buttonGoBack = [...document.querySelectorAll(".go-back")];
const inputsYourInfo = [...document.querySelectorAll(".your-info input")];

const directToStep = (number) => {
  location.href = location.origin + `?step=${number}`;
};

function previusScreen(e) {
  step = --step;
  directToStep(step);
  loadScreen(step);
}

function nextScreen(e) {
  const changeUrl = () => {
    step = ++step;
    directToStep(step);
    loadScreen(step);
  };

  if (index === 1 && verifyErro(inputsYourInfo)) {
    return "";
  }

  changeUrl();
}

buttonGoBack.forEach((button) =>
  button.addEventListener("click", previusScreen)
);
buttonNextStep.forEach((button) =>
  button.addEventListener("click", nextScreen)
);

const cards = [...document.querySelectorAll(".card")];
const numberStep = [...document.querySelectorAll(".number-step")];

function loadScreen(screen) {
  const hiddenCards = () => {
    cards.forEach((card) => (card.style.display = "none"));
  };

  if (index > 5) {
    directToStep(1);
  } else {
    hiddenCards();
    cards[index - 1].style.display = "flex";
  }

  numberStep.forEach((number) => number.classList.remove("number-step-active"));
  numberStep[index === 5 ? 3 : index - 1].classList.add("number-step-active");

  loadDataScreens(index);
}

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
