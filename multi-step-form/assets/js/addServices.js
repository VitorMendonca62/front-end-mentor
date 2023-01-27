import { setDataInLocal, getData } from "./data.js";
import { index } from "./main.js";
import { setPrice } from "./plan.js";

if (index === 3) {
  const dataUser = getData();

  const typePlan = dataUser.plan.type;

  const setFunctionSetPrice = () => {
    if (!!dataUser.addOns) {
      dataUser.addOns.forEach((service) => {
        if (service) service.setPrice = setPrice;
      });
    }
  };

  const infosServices = [
    {
      title: "online-service",
      price: 1,
      defaultPrice: 1,
      type: "monthly",
    },
    {
      title: "larger-storage",
      price: 2,
      defaultPrice: 2,
      type: "monthly",
    },
    {
      title: "customizable-profile",
      price: 3,
      defaultPrice: 3,
      type: "monthly",
    },
  ];

  const services = [...document.querySelectorAll(".services section")];
  const servicesCheckboxs = [
    ...document.querySelectorAll(".services section input"),
  ];
  const elemServices = [...document.querySelectorAll(".services section div")];
  const elemsTitle = [...document.querySelectorAll(".service h2")];
  const elemsPricesCustom = [
    ...document.querySelectorAll(".service .add-price"),
  ];

  let timeStamp;

  elemsPricesCustom.forEach((elem, index) => {
    elem.innerHTML =
      typePlan === "yearly"
        ? `+$${infosServices[index].defaultPrice * 10}/yr`
        : `+$${infosServices[index].defaultPrice}/mo`;
  });

  function activeService(e) {
    const id = e.target.getAttribute("position");
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

      const textTitle = elemsTitle[id].innerHTML
        .toLowerCase()
        .replace(" ", "-");
      dataUser.addOns[id] = infosServices.filter(
        (service) => service.title == textTitle
      )[0];

      setFunctionSetPrice();
      dataUser.addOns[id].type = typePlan;
      dataUser.addOns[id].setPrice();
      console.log(dataUser.addOns[id]);
    }

    elem.classList.toggle("service-active");
    timeStamp = e.timeStamp;
    setDataInLocal(dataUser);
  }

  elemServices.forEach((service) =>
    service.addEventListener("click", activeService)
  );
  services.forEach((service) =>
    service.addEventListener("click", activeService)
  );
}
