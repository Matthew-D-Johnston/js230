"use strict";

const test = Promise.reject("A");

(async () => {
  try {
    console.log(await test);
  } catch {
    console.log("E");
  } finally {
    console.log("B");
  }
})();

// Expected output to console:
// E
// B

// Actual output to console:
// E
// B
