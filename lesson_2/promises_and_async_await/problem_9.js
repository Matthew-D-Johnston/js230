"use strict";

function after1s(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 1000);
  });
}

async function test(input) {
  const a = await after1s(2);
  const b = await after1s(3);
  return input * (await a) * (await b);
}

test(3).then((value) => console.log(value));

// Expected output to console:
// 18
// The output should log after approximately 2 seconds after running the code.

// Actual output to console:
// 18
// it took about 2 seconds.