"use strict";

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function callback4() {
  console.log('callback4');
}

function callback5() {
  console.log('callback5');
}

// My Solution

// function randomizer(callbacks) {
//   let maxSeconds = 2 * arguments.length;

//   for (let second = 1; second <= maxSeconds; second += 1) {
//     setTimeout(() => { console.log(second)}, second * 1000);
//   }

//   Array.prototype.slice.call(arguments).forEach(callback => {
//     setTimeout(callback, Math.ceil(Math.random() * maxSeconds) * 1000);
//   });
// }

// randomizer(callback1, callback2, callback3, callback4);

// LS Solution

// function randomizer(...callbacks) {
//   if (callbacks.length < 1) {
//     return;
//   }

//   const secondsEnd = 2 * callbacks.length;
//   let secondsElapsed = 0;

//   const timeLogger = setInterval(() => {
//     secondsElapsed += 1;
//     console.log(secondsElapsed);

//     if (secondsElapsed >= secondsEnd) {
//       clearInterval(timeLogger);
//     }
//   }, 1000);

//   callbacks.forEach(callback => {
//     const executeTime = Math.floor(Math.random() * secondsEnd * 1000);
//     setTimeout(callback, executeTime);
//   });
// }

// My Refactored Solution

function randomizer(...callbacks) {
  let maxSeconds = 2 * arguments.length;

  for (let second = 1; second <= maxSeconds; second += 1) {
    setTimeout(() => { console.log(second)}, second * 1000);
  }

  callbacks.forEach(callback => {
    setTimeout(callback, Math.floor(Math.random() * maxSeconds) * 1000);
  });
}

randomizer(callback1, callback2, callback3, callback4, callback5);
