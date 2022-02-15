"use strict";

const percentage = document.getElementById("percentage");
const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const remained = document.getElementById("remained");

updateBigCup();
smallCups.forEach((cup, idx) => {
  cup.addEventListener("click", () => highlightCup(idx));
});

/**
 * contoh
 * active cup = 3;
 * click cup = 3
 * check active cup ada sama dgn click cup dan next element cup tidak ada class full
 * jika true = cilck cup idx - 1
 * maka jadi click cup idx 2
 *
 */
function highlightCup(idx) {
  if (
    // check if selected contains 'full' class and the next element doesnt contain 'full'.
    // use the optional chaining operator (?.)
    smallCups[idx].classList.contains("full") &&
    !smallCups[idx].nextElementSibling?.classList.contains("full")
  ) {
    idx--;
  }

  /**
   * cup click,add class full
   * cth: cup 4 klik,cup 1,2,3, terisi jgk
   * cth : idx 3/ idx2 0
   *if : idx2:0 , idx:3
   *if : idx2:1 , idx:3
   *if : idx2:2 , idx:3
   *if : idx2:3 , idx:3
   *else : idx2:4 , idx:3
   *else : idx2:5 , idx:3
   *else : idx2:6 , idx:3
   *else : idx2:7 , idx:3
   */
  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;

  // percentage
  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  // litter
  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    //* tolak  2 =  2 litter/ full litter
    // contoh
    // 250 * 7
    // 1750
    // 1750 / 1000
    // 1.75
    // 2 - 1.75
    // 0.25
    liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
  }
}

// kira percent dan px height litter
// console.log((1 / 8) * 100); 12.5 // inner text
// console.log((fullCups / totalCups) * 330); // heigth

/**========================================================================================================================
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
 let customer = {
   name: "Carl",
   details: {
     age: 82,
     location: "Paradise Falls", // detailed address is unknown
   },
 };
 let customerCity = customer.details?.age?.city ?? "not found";
 
 console.log(customerCity); not found
 * 
 * https://stackoverflow.com/questions/31097016/whats-the-difference-between-nextelementsibling-vs-nextsibling
 * 'nextSibling' returns the next Node object whereas 'nextElementSibling' returns the next Element object, 
 * 
 <div id="start"></div>
 Me
 <p>Hi</p>
 * 
 console.log(document.getElementById("start").nextSibling); // " Me "
 console.log(document.getElementById("start").nextSibling.nextSibling); // "<p>
 console.log(document.getElementById("start").nextElementSibling); // "<p>
 * 
 ==========================================================================================================================*/
