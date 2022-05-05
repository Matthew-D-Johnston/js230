"use strict";

const promise1 = new Promise((resolve, reject) => {
  console.log("foo");
  resolve();
  console.log("bar");
});

promise1.then(() => {
  console.log("baz");
});

console.log("qux");

// Expected output to console:
// => qux
// => foo
// => baz
// => bar

// Actual output
// foo
// bar
// qux
// baz