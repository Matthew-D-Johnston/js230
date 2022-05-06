"use strict";

const testPromise = () => Promise.resolve("1");

function test1() {
  testPromise().then((result) => console.log(result));
  console.log("2");
}

async function test2() {
  console.log(await testPromise());
  console.log("2");
}

test1();
test2();

// Expected output to console:
// 2
// 1
// 1
// 2

// Actual output to console:
// 2
// 1
// 1
// 2