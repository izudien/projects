// cara pertama
// offsetHeight
// The offsetHeight is an HTML DOM property, which is used by JavaScript programming language. It returns the visible height of an element in pixels that includes the height of visible content, border, padding, and scrollbar if present. The offsetHeight is often used with offsetWidth property.
// const nav = document.querySelector(".nav");
// window.addEventListener("scroll", fixNav);

// function fixNav() {
//   if (window.scrollY > nav.offsetHeight + 150) {
//     nav.classList.add("active");
//   } else {
//     nav.classList.remove("active");
//   }
// }

// cara kedua : Intersection Observer API
const nav = document.querySelector(".nav");
const hero = document.querySelector(".hero");
const fixNav = function (entries) {
  const [entry] = entries;

  console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
};

const options = {
  root: null,
  threshold: 0.9,
};

const sectionObserver = new IntersectionObserver(fixNav, options);
sectionObserver.observe(hero);

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 const nav = document.querySelector(".nav");
 const content = document.querySelector(".content");
 
 const obsCallback = function (entries,observer) {
   const [entry] = entries;
 
   if (entry.isIntersecting) {
     nav.classList.add("active");
   } else {
     nav.classList.remove("active");
   }
 };

 const obsOptions = {
   root: null,
   threshold: 0.5,
 };
 const observer = new IntersectionObserver(obsCallback, obsOptions);
 observer.observe(content);
 */
