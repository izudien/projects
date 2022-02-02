"use strict";

const loadingText = document.querySelector(".loading-text");
const bg = document.querySelector(".bg");

//* SET LOADING
let load = 0;
//* SET FILTERBLUR
let filterBlur = 30;

let interval = setInterval(blurring, 30);

//* https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
// const scale = (number, inMin, inMax, outMin, outMax) => {
//   return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
// };

// BLURRING
function blurring() {
  load++;

  if (load > 99) {
    clearInterval(interval);
  }

  loadingText.innerText = `${load}%`;
  //   loadingText.style.opacity = scale(load, 0, 100, 1, 0);bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
  loadingText.style.opacity = (100 - load) / 100;
  filterBlur = filterBlur - 0.3;
  console.log(filterBlur);
  bg.style.filter = `blur(${filterBlur}px)`;
}
