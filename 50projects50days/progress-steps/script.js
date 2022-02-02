"use strict";

/**
 * Apabila button ditekan, circle dan progress bar akan aktif
 * prev disable di cirle 1 dan akan aktif pada circle 2/3/4
 * next disable di circle 4 dan aktif pada 1,2,3
 * progress bar akan aktif 1->2->3-4
 */

//* ELEMENTS
const circles = document.querySelectorAll(".circle");
const progress = document.querySelector(".progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

//* VARIABLE
let currentActive = 1;

//* NEXT
next.addEventListener("click", () => {
  currentActive++;
  //* CHECK CURRENTACTIVE NOT MORE THAN CIRLE LENGTH
  if (currentActive > circles.length) {
    currentActive = circles.length;
  }

  //* UPDATE CIRCLE, PROGRESS BAR, BUTTON
  update();
});

//* PREV
prev.addEventListener("click", () => {
  currentActive--;
  if (currentActive < 1) {
    currentActive = 1;
  }

  //* UPDATE CIRCLE, PROGRESS BAR, BUTTON
  update();
});

//* UPDATE
function update() {
  //* CIRCLE ACTIVE
  //* GO THROUGH EACH CIRCLE
  circles.forEach((circle, idx) => {
    //* IF THIS CIRCLE'S INDEX IS SMALLER THAN THE CURRENTACTIVE VALUE
    if (idx < currentActive) {
      //* ADD THE ACTIVE CLASS
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  //* PROGRESS BAR
  const actives = document.querySelectorAll(".active");
  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

  //* BUTTON
  if (currentActive === 1) {
    prev.disabled = true;
  } else if (currentActive === circles.length) {
    next.disabled = true;
  } else {
    next.disabled = false;
    prev.disabled = false;
  }
}
