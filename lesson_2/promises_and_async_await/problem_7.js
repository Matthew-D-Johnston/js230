"use strict";

const promise = new Promise((resolve, reject) => {
  resolve("Got it!");
  reject("Oops.");
  resolve("Again!");
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// Expected output to console:
// Got it!

// Actual output to console:
// Got it!
