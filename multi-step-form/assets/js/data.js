import { index } from "./main.js";

const dataUserSafe = {
  infos: {},
  plan: {},
  addOns: [{}, {}, {}],
};

function setDataInLocal(data) {
  sessionStorage.setItem("dataUser", JSON.stringify(data));
}

function getData() {
  const data = JSON.parse(sessionStorage.getItem("dataUser"));
  return data;
}
const dataUser = getData();

if (index === 1 && !dataUser) {
  setDataInLocal(dataUserSafe);
}



export { setDataInLocal, getData };
