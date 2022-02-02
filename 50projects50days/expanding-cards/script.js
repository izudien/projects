"use strict";
const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    // remove all active class
    removeActiveClass();
    // add class acive
    panel.classList.add("active");
  });
});

const removeActiveClass = function () {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
};
