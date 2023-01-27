import { setDataInLocal, getData } from "./data.js";
import { index } from "./main.js";

function setPrice() {
  this.price =
    this.type === "yearly" ? this.defaultPrice * 10 : this.defaultPrice;
}

if (index == 2) {
  const dataUser = getData();

  dataUser.plan.setPrice = setPrice;
  if (!!dataUser.addOns) {
    dataUser.addOns.forEach((service) => {
      if (service) service.setPrice = setPrice;
    });
  }

  const infosPlans = [
    {
      title: "arcade",
      price: 9,
      defaultPrice: 9,
      type: "monthly",
    },
    {
      title: "advanced",
      price: 12,
      defaultPrice: 12,
      type: "monthly",
    },
    {
      title: "pro",
      price: 15,
      type: "monthly",
      defaultPrice: 15,
    },
  ];

  if (!dataUser.plan.title) {
    dataUser.plan = infosPlans[0];
    setDataInLocal(dataUser);
  }

  const plans = [...document.querySelectorAll(".plans section")];
  const elemsPlans = [...document.querySelectorAll(".plans section *")];
  const elemsTitlesPlan = [...document.querySelectorAll("p.title-plan")];
  const elemsPricePlan = [...document.querySelectorAll(".price-plan")];

  function activePlan(e) {
    const id = e.target.getAttribute("position");
    const elem = plans[id];

    if (elem.classList[0]) {
      return "";
    } else {
      plans.forEach((plan) => plan.classList.remove("plan-active"));
      elem.classList.add("plan-active");

      const textTitlePlan = elemsTitlesPlan[id].innerHTML.toLowerCase();
      dataUser.plan = infosPlans.filter(
        (plan) => plan.title == textTitlePlan
      )[0];
      dataUser.plan.type = changePlan();
    }
    setDataInLocal(dataUser);
  }

  elemsPlans.forEach((plan) => plan.addEventListener("click", activePlan));
  plans.forEach((plan) => plan.addEventListener("click", activePlan));

  const switchButtonPlan = document.querySelector("#type-plan");
  const alertsPlans = [...document.querySelectorAll(".alert-plan")];

  function changePlan(e) {
    const stateCheckbox = switchButtonPlan.checked;
    const typePlan = stateCheckbox ? "yearly" : "monthly";

    dataUser.plan.type = typePlan;
    dataUser.plan.setPrice();

    if (dataUser.addOns) {
      dataUser.addOns.forEach((service) => {
        if (service?.title) {
          service.type = typePlan;
          service.setPrice();
        }
      });
    }

    alertsPlans.forEach((alertPLan, index) => {
      alertPLan.style.display = stateCheckbox ? "block" : "none";

      elemsPricePlan[index].innerHTML = stateCheckbox
        ? `$${infosPlans[index].defaultPrice * 10}/yr`
        : `$${infosPlans[index].defaultPrice}/mo`;

      if (document.querySelector("body").clientWidth > 880) {
        plans[index].style.minHeight = stateCheckbox ? "11rem" : "10rem";
      } else {
        plans[index].style.minHeight = stateCheckbox ? "6.5rem" : "6rem";
      }
    });
    setDataInLocal(dataUser);
  }
  switchButtonPlan.checked = dataUser.plan.type === "yearly";
  changePlan();

  switchButtonPlan.addEventListener("change", changePlan);
  plans[0].classList.add("plan-active");
}

export { setPrice };
