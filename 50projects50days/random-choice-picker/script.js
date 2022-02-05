"use strict";

const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");

textarea.focus();

textarea.addEventListener("keyup", (e) => {
  // get input value and pass to function
  createTag(e.target.value);
  //check key enter ditekan atau belum
  //jika ditekan, run randomchoice()
  if (e.key === "Enter" && tagsEl.childElementCount > 1) {
    // clear textarea input
    // textaread disabled
    setTimeout(() => {
      e.target.value = "";
      textarea.disabled = true;
    }, 10);

    // run random select
    randomSelect();
  }
});

function createTag(input) {
  //split(',')->filter->trim() * sini remove whitespace ->map(trim)
  // create elemetn span->add class 'tag'

  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());
  tagsEl.innerHTML = "";

  tags.forEach((tag) => {
    // create span utk setiap tag
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

function randomSelect() {
  const times = 30;

  // We need the first timeOut so that the random highlighted tag become unhighlighted.
  // We are setting an interval, during which the tags are randomly highlighted. Each highlighted tag gets unhighlighted after 100msec
  // run utk highlight all tags
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    setTimeout(() => {
      unhighlightTag(randomTag);
    }, 100);
    // remove highlight setiap 100
  }, 100);

  // This keeps on going until the second timeOut body code gets executed, so after times*100 msecs (3000 msecs, 3 secs)
  // selepas 3 saat..random tag akan dipilih
  setTimeout(() => {
    // clear interval
    clearInterval(interval);
    /**
     * is required because if we do not apply it, we sometimes get the interval stopped before a final tag gets highlighted, and all the tags are unhiglighted in this scenario, you can try removing this last timeOut like below,  and see the issue randomly occurring (you may have to repeat the test a few times until it happens).
     */
    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
      textarea.disabled = false;
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unhighlightTag(tag) {
  tag.classList.remove("highlight");
}
