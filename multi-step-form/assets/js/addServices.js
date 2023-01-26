import { setDataInLocal, getData } from "./data.js";
import { index } from "./main.js";

if(index === 3) {

const dataUser = getData();

const typePlan = dataUser.plan.type;

const infosServices = [
  {
    title: "online-service",
    price: 1,
    defaultPrice: 1,
    type: "monthly",
    setPriceService() {
      this.price =
        this.type === "yearly" ? this.defaultPrice * 10 : this.defaultPrice;
    },
  },
  {
    title: "larger-storage",
    price: 2,
    defaultPrice: 2,
    type: "monthly",
    setPriceService() {
      this.price =
        this.type === "yearly" ? this.defaultPrice * 10 : this.defaultPrice;
    },
  },
  {
    title: "customizable-profile",
    price: 3,
    defaultPrice: 3,
    type: "monthly",
    setPriceService() {
      this.price =
        this.type === "yearly" ? this.defaultPrice * 10 : this.defaultPrice;
    },
  },
];

const services = [...document.querySelectorAll(".services section")];
const servicesCheckboxs = [
  ...document.querySelectorAll(".services section input"),
];
const elemServices = [...document.querySelectorAll(".services section div")];
const elemsTitle = [...document.querySelectorAll(".service h2")];
const elemsPricesCustom = [...document.querySelectorAll(".service .add-price")];

let timeStamp;

elemsPricesCustom.forEach((elem, index) => {
  elem.innerHTML =
    typePlan === "yearly"
      ? `+$${infosServices[index].defaultPrice * 10}/yr`
      : `+$${infosServices[index].defaultPrice}/mo`;
});

function activeService(e) {
  const id = e.target.id;
  const elem = services[id];

  if (timeStamp === e.timeStamp) {
    return "";
  }

  if (elem.classList.length === 3) {
    servicesCheckboxs[id].checked = false;
    dataUser.addOns[id] = null;
    dataUser.addOns[id] = null;
  } else {
    servicesCheckboxs[id].checked = true;

    const textTitle = elemsTitle[id].innerHTML.toLowerCase().replace(" ", "-");
    dataUser.addOns[id] = infosServices.filter(
      (service) => service.title == textTitle
    )[0];

    dataUser.addOns[id].type = typePlan;
    dataUser.addOns[id].setPriceService();
  }

  elem.classList.toggle("service-active");
  timeStamp = e.timeStamp;
  setDataInLocal(dataUser);
}

elemServices.forEach((service) =>
  service.addEventListener("click", activeService)
);
services.forEach((service) => service.addEventListener("click", activeService));
}
