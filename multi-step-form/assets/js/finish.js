import { getData } from "./data.js";
import { index } from "./main.js";

if (index === 4) {
  const dataUser = getData();

  const elemPlan = document.querySelector("#finish-plan");
  const elemTypePlan = document.querySelector("#finish-type-plan");
  const elemValuePlan = document.querySelector("#valuePlan");

  const elemConfirmationServices = document.querySelector(
    ".container-confimartion-services"
  );

  const elemMinorTypePlan = document.querySelector("#minor-type-plan");
  const elemTotalPrice = document.querySelector("#total-price");

  function confimationPlane() {
    function toUpperFirstCase(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }

    const allPrices = [];

    const plan = dataUser.plan;
    const titlePlan = plan.title;
    const typePlan = plan.type;
    const pricePlan = plan.price;

    allPrices.push(pricePlan);

    const typePlanIsYearly = typePlan === "yearly";
    elemPlan.innerHTML = toUpperFirstCase(titlePlan);
    elemTypePlan.innerHTML = toUpperFirstCase(typePlan);
    elemValuePlan.innerHTML = pricePlan;

    const services = dataUser.addOns;

    services.forEach((service) => {
      if (service) {
        if (!!service.price) {
          const titleService = service.title;
          allPrices.push(service.price);

          elemConfirmationServices.innerHTML += `
        <div class="service align-center">
        <p class="title-service">${toUpperFirstCase(titleService).replace(
          "-",
          " "
        )}</p>
        <p class="price-service">+$<span>${
          service.price
        }</span>/<span class="abreviation-type-plan"></span></p>

      </div>
        `;
        }
      }
    });

    const isEmpty = services.filter((service) => !!service?.title);
    if (isEmpty.length === 0) {
      document
        .querySelector(".sumarry .confirmation .container-type-plan")
        .classList.add("not-service");
      document.querySelector(".container-confimartion-services").style.display =
        "none";
    }

    const elemsTypeAbreviation = [
      ...document.querySelectorAll(".abreviation-type-plan"),
    ];

    elemsTypeAbreviation.forEach(
      (elem) => (elem.innerHTML = typePlanIsYearly ? "yr" : "mo")
    );

    elemMinorTypePlan.innerHTML = typePlanIsYearly ? "month" : "year";

    const total = allPrices.reduce((acul, ant) => acul + ant);
    elemTotalPrice.innerHTML = total;
  }

  if (index === 4) {
    confimationPlane();
  }

  const change = document.querySelector(".change")

  change.addEventListener("click", () => {
    location.href = location.origin + `?step=`;
  })
}
