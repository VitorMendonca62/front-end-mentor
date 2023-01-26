import { getData } from "./data.js";

const dataUser = getData();

const inputsYourInfo = [...document.querySelectorAll(".your-info input")];

const elemsTitlesPlan = [...document.querySelectorAll("p.title-plan")];
const plans = [...document.querySelectorAll(".plans section")];

const servicesCheckboxs = [...document.querySelectorAll(".services input")];
const services = [...document.querySelectorAll(".services section")];

function loadDataScreens(id) {
  if (!!dataUser) {
    if (id === 1) {
      inputsYourInfo.forEach((input) => {
        const type = input.name;
        document.getElementsByName(type)[0].value = dataUser.infos[type]
          ? dataUser.infos[type]
          : "";
      });
    }

    if (id === 2) {
      const titlePlan = dataUser.plan.title;
      elemsTitlesPlan.forEach((title, index) => {
        if (titlePlan === title.innerHTML.toLowerCase()) {
          plans.forEach((plan) => plan.classList.remove("plan-active"));
          plans[index].classList.add("plan-active");
        }
      });
    }

    if (id === 3) {
      dataUser.addOns.forEach((service, index) => {
        if (service?.title) {
          servicesCheckboxs[index].checked = true;
          services[index].classList.toggle("service-active");
        }
      });
    }
  }
}

export { loadDataScreens };
