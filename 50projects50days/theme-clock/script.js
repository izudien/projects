"use strict";

const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 const scale = (number, inMin, inMax, outMin, outMax) => {
   return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
 };
   hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`
  secEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`
 */

/**
 * [== DARK THEME ==]
 * change bakcground to dark dan sebaliknya
 * tukar perkataan dark mode to light mode
 */

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark Mode";
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light Mode";
  }
});

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hoursForClock = hours % 12;
  const ampm = hours >= 12 ? "PM" : "AM";

  // clock

  hourEl.style.transform = `translate(-50%,-100%) rotate(${
    hoursForClock * 30
  }deg)`;
  minuteEl.style.transform = `translate(-50%,-100%) rotate(${minutes * 6}deg)`;
  secondEl.style.transform = `translate(-50%,-100%) rotate(${seconds * 6}deg)`;

  hourEl.style.transition = `${
    hoursForClock === 0 ? "none" : "all 0.5s ease-in"
  }`;
  minuteEl.style.transition = `${minutes === 0 ? "none" : "all 0.5s ease-in"}`;
  secondEl.style.transition = `${seconds === 0 ? "none" : "all 0.5s ease-in"}`;

  // time
  timeEl.innerHTML = `${hoursForClock}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`;

  // date to day
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}
setTime();
setInterval(setTime, 1000);
