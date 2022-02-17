"use strict";
/**
 * get in all toggle buttons
 * loop foreach
 * add click event
 * toggle the active class on the parent node
 */

const toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.parentNode.classList.toggle("active");
  });
});

/**===============================================================================
 * https://stackoverflow.com/questions/8685739/difference-between-dom-parentnode-and-parentelement
 * https://www.geeksforgeeks.org/difference-between-dom-parentnode-and-parentelement-in-javascript/
 * https://www.youtube.com/watch?v=rhvec8cXLlo = #NodeVsElement #WDS #JavaScript Do You Know The Difference?
 =================================================================================*/
