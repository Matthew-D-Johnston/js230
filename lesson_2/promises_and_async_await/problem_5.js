"use strict";

const promise = new Promise((resolve, reject) => {
  console.log("foo");
  reject();
  console.log("bar");
});

promise
  .then(() => {
    console.log("baz");
  })
  .catch(() => {
    console.log("qux");
  });

console.log("abc");

// Expected output to console:
// foo
// bar
// abc
// qux

// Actual output to console:
// foo
// bar
// abc
// qux
