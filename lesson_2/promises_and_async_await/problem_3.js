"use strict";

const promise = new Promise(function(resolve, reject) {
  resolve("I am a Promise");
});

promise.then(value => console.log(value));
console.log("I am NOT a Promise");
