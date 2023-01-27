import { setDataInLocal, getData } from "./data.js";
import { index } from "./main.js";

const functions = {};

if (index === 1) {
  const dataUser = getData();

  const regexName = /[^a-zA-Z\ \ç\á\é\í\ó\ú]/g;
  const regexEmail = /([^a-zA-Z0-9\.\-\@])/g;
  const regexNumber = /[^0-9]/g;

  function msgErro({ type, msg }) {
    document.querySelector(`#error-${type}`).innerText = msg;
    document.getElementsByName(type)[0].style.borderColor =
      "hsl(354, 84%, 57%)";
  }

  function msgSuccess(type) {
    document.querySelector(`#error-${type}`).innerText = "";
    document.getElementsByName(type)[0].style.borderColor =
      "hsl(229, 24%, 87%)";
  }

  const errosInputs = [];

  function checkName(data, type) {
    const name = data.value;
    data.value = name.replace(regexName, "");

    if (name.length < 0 || name.length <= 5) {
      msgErro({ type, msg: "Invalid Name" });
      errosInputs.push(true);
    } else {
      msgSuccess(type);
      dataUser.infos[type] = name;
    }
  }

  function checkEmail(data, type) {
    data.value = data.value.replace(regexEmail, "");
    const email = data.value;
    const splitEmail = email.split("@");
    const domainEmail = splitEmail[1];

    if (
      email.length === 0 ||
      splitEmail.length != 2 ||
      domainEmail.length < 3 ||
      !domainEmail.includes(".") ||
      domainEmail.indexOf(".") === -1 ||
      domainEmail.lastIndexOf(".") === domainEmail.length - 1
    ) {
      msgErro({ type, msg: "Invalid Email" });
      errosInputs.push(true);
    } else {
      msgSuccess(type);
      dataUser.infos[type] = email;
    }
  }

  function checkPhoneNumber(data, type) {
    data.value = data.value.replace(regexNumber, "");
    const phoneNumber = data.value;

    if (phoneNumber.length != 10) {
      msgErro({ type, msg: "Invalid Phone Number" });
      errosInputs.push(true);
    } else {
      msgSuccess(type);
      dataUser.infos[type] = phoneNumber;
    }
  }

  function validationInputsYourInfo(datas) {
    errosInputs.length = 0;
    datas?.forEach((data) => {
      const type = data.name;
      switch (type) {
        case "name":
          checkName(data, type);
          break;
        case "email":
          checkEmail(data, type);
          break;
        case "phoneNumber":
          checkPhoneNumber(data, type);
      }
    });
    setDataInLocal(dataUser);
    return errosInputs.length;
  }

  function verifyErro(datas) {
    const error = validationInputsYourInfo(datas);
    return !!error;
  }

  const inputsYourInfo = [...document.querySelectorAll(".your-info input")];

  inputsYourInfo.forEach((input) =>
    input.addEventListener("keyup", () => verifyErro([input]))
  );
  functions.verifyErro = verifyErro;
}
const verifyErro = functions.verifyErro;

export { verifyErro };
