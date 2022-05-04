"use strict";

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Launch School");
  }, 2000);
});

promise.then((resolvedValue) => {
  console.log(resolvedValue);
});
