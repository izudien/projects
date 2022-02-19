"use strict";

const textEl = document.getElementById("text");
const speedEl = document.getElementById("speed");
const text = "WELCOME TO MALAYSIA"; // 26

// index huruf di text
let idx = 1;
let speed = 300 / speedEl.value;

writeText();

function writeText() {
  // slice text
  /**
   * cth :
   * idx = 1 = first string = S
   * idx = 2 = Se
   * idx + 1 = 2
   * check end of string not lebih dari index / if true set to idx = 1
   * 
   * 
       idx= 1
       textEl= <h1 id=​"text">​i​</h1>​
       idx= 2
       textEl= <h1 id=​"text">​iz​</h1>​
       idx= 3
       textEl= <h1 id=​"text">​izu​</h1>​
       idx= 4
       textEl= <h1 id=​"text">​izud​</h1>​
       idx= 5
       textEl= <h1 id=​"text">​izudi​</h1>​
       idx= 6
       textEl= <h1 id=​"text">​izudin​</h1>​
       // repeat to idx 1 because idx bigger than text.length
   */
  textEl.innerText = text.slice(0, idx);
  idx++;

  // check end of string text // reset
  if (idx > text.length) {
    idx = 1;
  }

  // the timeout in order to set a delay between the typing of each letter of the provided text.
  setTimeout(writeText, speed);
}

speedEl.addEventListener("input", (e) => (speed = 300 / e.target.value));

/**======================================================================
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
 * slice(beginIndex)
 * slice(beginIndex, endIndex)
 * 
 * const str = 'The quick brown fox jumps over the lazy dog.';
 * console.log(str.slice(31));
 * // expected output: "the lazy dog."
 * 
 * console.log(str.slice(4, 19))
 * // expected output: "quick brown fox"
 * console.log(str.slice(-4));
 * // expected output: "dog."
 * console.log(str.slice(-9, -5));
 * // expected output: "lazy"
============================================================================*/

/**
 * We are using intervals in order to achieve a repetitive result. In this implementation the 'repetition'-like effect is achieved by resetting the index to 1:

if (idx > text.length) {
    idx = 1;
  }
We do not really have a repetition, this code snippet is executed without a stop:

 textEl.innerText = text.slice(0, idx);
 
//...
and we use the timeout in order to set a delay between the typing of each letter of the provided text.

This way we do not need to call a setInterval(). Of course the same result can be achieved with different ways, with intervals too I guess.
 */
