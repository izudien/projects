const billInputEL = document.getElementById("input__bill");
const tipBtnEl = document.querySelectorAll(".btn--tip");
const TipInputEL = document.getElementById("input__tip");
const peopleInputEL = document.getElementById("input__people");
const resultTipEl = document.getElementById("result__tip");
const resultPeopleEl = document.getElementById("result__people");
const resetBtnEl = document.querySelector(".btn--reset");
const errorMsgEl = document.querySelector(".error__msg");

let billValue = 0;
let selectedTip = 0;
let personValue = 0;

function calcResult() {
  if (billValue && selectedTip && personValue) {
    const billPerPerson = billValue / personValue;
    const tipAmountPerPerson = billPerPerson * (selectedTip / 100);
    const totalAmount = billPerPerson + tipAmountPerPerson;

    resultTipEl.textContent = "$" + parseFloat(tipAmountPerPerson).toFixed(2);
    resultPeopleEl.textContent = "$" + parseFloat(totalAmount).toFixed(2);
  } else {
    resultTipEl.textContent = "$" + parseFloat(0).toFixed(2);
    resultPeopleEl.textContent = "$" + parseFloat(0).toFixed(2);
  }
}

const removeActiveBtn = function () {
  tipBtnEl.forEach((e) => {
    e.classList.remove("btn--active");
  });
};

// set bill value
billInputEL.addEventListener("input", function (e) {
  if (billValue < 0) {
  }
  billValue = parseFloat(e.target.value);
  calcResult();
});

// set select tip amount
tipBtnEl.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    selectedTip = parseInt(e.target.value);
    // method 1
    // Check if the classList already exists on the element clicked
    // If so, remove it
    // Else, add it

    // method 2
    // Loop through all the buttons, inside the event handler function first remove the class from all the buttons then add the class only to the clicked button:
    removeActiveBtn();
    btn.classList.add("btn--active");
    TipInputEL.value = "";
    calcResult();
  });
});

// select set using input
TipInputEL.addEventListener("input", function (e) {
  selectedTip = parseInt(e.target.value);
  removeActiveBtn();
  calcResult();
});

// set people
peopleInputEL.addEventListener("input", function (e) {
  personValue = parseInt(e.target.value);
  // check people input  below < 0
  if (personValue <= 0) {
    errorMsgEl.classList.add("error__msg--show");
    peopleInputEL.style.boxShadow = "0 0 0 1px red";
    setTimeout(() => {
      errorMsgEl.classList.remove("error__msg--show");
      peopleInputEL.style.boxShadow = "none";
    }, 2000);
  }

  // and warning
  calcResult();
});

resetBtnEl.addEventListener("click", () => {
  billInputEL.value = "";
  TipInputEL.value = "";
  billValue = 0;
  selectedTip = 0;
  personValue = 0;
  removeActiveBtn();
  peopleInputEL.value = "";
  resultTipEl.textContent = "$" + parseFloat(0).toFixed(2);
  resultPeopleEl.textContent = "$" + parseFloat(0).toFixed(2);
});

// todo
// reset btn // siap
// add warning for people // siap
// check utk text dan number sahaja
