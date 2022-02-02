//! Scheduling: setTimeout and setInterval
/**
 *
 *
 *
 *
 */
// setTimeout
// akan run sekali jah pada masa yang ditetapkan
// function sayHi() {
//   alert("hello");
// }

// this code call sayHi() after one second
// setTimeout(sayHi, 1000);

// canceling setTimeout
// setTimeout return a 'timer identifier' that we can use to cancel the execution
// let timerId = setTimeout(() => alert("never happens"), 1000);
// console.log(timerId); // timer identifier

// clearTimeout(timerId);
// console.log(timerId);

// setInterval
// membolehkan kita run funtion secara berulang-ulang, bermula pada masa yang ditetapkan dan akan diulang-ulang

// repeat with the interval of 2 seconds
// let timerId2 = setInterval(() => alert("tick"), 2000);

// after 5 second stop
// setTimeout(() => {
//   clearInterval(timerId2);
//   alert("stop");
// }, 5000);

// NESTED TIMEOUT
// two ways of running something regularly
// using setInerval or nested setTimeout

/**
 * instead of :
 * let timerId = setInterval(()=> alert('tick'),2000)
 */
// let timerId = setTimeout(tick, 10000);

// function tick() {
//   alert("tick");
//   timerId = setTimeout(tick, 2000);
// }

// let delay = 2000;
// const requestq = true;

// let timerId = setTimeout(function request() {
//   /**
//    * ....send request....
//    * ....send request....
//    * ....send request....
//    * ....send request....
//    */

//   alert("send request");
//   if (requestq === false) {
//     // if(request failed due to server overload){
//     // increase the interval to the next run
//     delay = delay * 2;
//     alert("failed");
//   }

//   timerId = setTimeout(request, delay);
// }, delay);

// let i = 1;
// setInterval(function () {
//   func(i++);
// }, 1000);

// let i = 1;
// setTimeout(function run() {
//   func(i++);
//   setTimeout(run, 5000);
// }, 1000);

// const func = () => {
//   alert("ok");
// };

// ZERO DELAY SETTIMEOUT
// setTimeout(func, 0) or setTimeout(func)
//There’s a special use case: setTimeout(func, 0), or just setTimeout(func).

// This schedules the execution of func as soon as possible. But the scheduler will invoke it only after the currently executing script is complete.

// So the function is scheduled to run “right after” the current script.

// For instance, this outputs “Hello”, then immediately “World”:

// setTimeout(() => alert("World"));

// alert("Hello");
// The first line “puts the call into calendar after 0ms”. But the scheduler will only “check the calendar” after the current script is complete, so "Hello" is first, and "World" – after it.
