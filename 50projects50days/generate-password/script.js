"use strict";

/**
 * Generate password secara random berdasarkan pilihan user untuk setting, huruf besar(uppercase), huruf kecil(lowercase),number,symbol.
 * Panjang password berdasarkan nilai/number yg user masukkan
 *
 * 1) UNDERSTANDING THE PROBLEMS
 *  - How to generate random dan panjang password
 *    -uppercase,lowercase,number,symbol
 *
 * 2) BREAKING UP INTO SUB-PROBLEMS
 *  //- How to generate random uppercase
 *  //- How to generate random lowercase
 *  //- How to generate random number
 *  //- How to generate random symbol
 *  //- How to handle user not  selected certain setting
 *  //- How to generate panjang password based on user set ? -loop
 *  //- How to auto copied password when user click clipboard icon
 *
 * 3) RESEARCH
 * https://stackoverflow.com/questions/1497481/javascript-password-generator
 *  - Using base36
 * Binary consists of values 0 and 1
 * Decimal : 0 to 9
 * Octal : 0 to 7
 * Hex : 0 to 9 and A to F
 * Base 36 : (hexatridecimal) 0 to 9 and A to Z
 * console.log(Math.random().toString(36).slice(2)); // 5p51bqw9x64 * ini random generate
 *
 *  -using ASCII character
 * https://bournetocode.com/projects/GCSE_Computing_Fundamentals/pages/3-3-5-ascii.html
 * contoh : the upppercase ASCII A has a value of 65
 console.log(String.fromCharCode(94));
 *fromCharCode. This method returns a string corresponding to the decimal value that we pass.
 *
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * Array filter method
 * filter() calls a provided callbackFn function once for each element in an array, and constructs a new array of all the values for which callbackFn RETURNS A VALUE THAT COERCES TO TRUE. callbackFn is invoked only for indexes of the array which have assigned values; it is not invoked for indexes which have been deleted or which have never been assigned values. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
 * https://www.delftstack.com/howto/javascript/javascript-copy-to-clipboard/
 */

// DOM
const resultEl = document.querySelector(".result");
const clipboardEl = document.getElementById("clipboard");
const lengthEl = document.getElementById("length");
const upercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");

const randomFunc = {
  lower: getRandomLowerCase,
  upper: getRandomUpperCase,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value; // convert string to number
  const hasUppercase = upercaseEl.checked;
  const hasLowercase = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = "";
  // GENERATE PASSWORD ?
  // - problem
  //  - generate password based on setting
  // - subproblem
  // // -jika typechecked = 0 = jgn generate password
  // // -kena check setting yang dicheck oleh user
  // //  -hanya yg dicheck sahaja akan digenerate
  // // -kena generate panjang password yg diset oleh user
  const typeCount = lower + upper + number + symbol;
  // filter typecheck
  // we are filter out the items that have the value set to false
  const typeArr = [{ lower }, { upper }, { number }, { symbol }] // sama mcm [{ lower:lower }, { upper:upper }, { number:number }, { symbol:symbol }]
    .filter((item) => Object.values(item)[0]); // returns a value that coerces to true.; cth: tiga setting yang di checked = [{"lower": true},{"number": true},{"symbol": true}]

  // check type count
  if (typeCount === 0) {
    return "";
  }

  // generate password
  for (let i = 0; i < length; i += typeCount) {
    // console.log(i);
    typeArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword = generatedPassword + randomFunc[funcName]();
      // console.log(type, generatedPassword);
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;

  // const originalArr = [
  //   { lower: true },
  //   { upper: true },
  //   { number: true },
  //   { symbol: true },
  // ];

  // console.log("originalArr", originalArr); // [{"lower": true},{"upper": true},{"number": true},{"symbol": true}]
  // console.log("originalArr Object.values", Object.values(originalArr)); // [{"lower": true},{"upper": true},{"number": true},{"symbol": true}]
  // console.log("the value of number", Object.values(originalArr[2])); // [true]
  // console.log("include numbers?", Object.values(originalArr)[2]); // {number: true}
  // console.log("include numbers?", Object.values(originalArr[2])[0]); // true
}

// 65 hingga 90
function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
// 97 hingga 122
function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}
// 0 hingga 9
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}

// 33-47 58-64 91-96 123-126
function getRandomSymbol() {
  const symbol1 = [];
  const symbol2 = [];
  const symbol3 = [];
  const symbol4 = [];

  for (let i = 33; i <= 47; i++) {
    symbol1.push(i);
  }
  for (let i = 58; i <= 64; i++) {
    symbol2.push(i);
  }
  for (let i = 91; i <= 96; i++) {
    symbol3.push(i);
  }
  for (let i = 123; i <= 126; i++) {
    symbol4.push(i);
  }

  const symbols = symbol1.concat(symbol2, symbol3, symbol4);
  return String.fromCharCode(
    symbols[Math.floor(Math.random() * symbols.length)]
  );
}

// filter typecheck
// we are filter out the items that have the value set to false
// const typeArr = [
//   { lower: true },
//   { upper: true },
//   { number: false },
//   { symbol: false },
// ] // sama mcm [{ lower:lower }, { upper:upper }, { number:number }, { symbol:symbol }]
//   .filter((item) => Object.values(item)[0]);

// console.log(typeArr); // [{lower: true} 1: {upper: true}]
