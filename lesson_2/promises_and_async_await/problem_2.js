"use strict";

const promise = new Promise((resolve, reject) => {
  setTimeout(function() {
    reject("Error: Not Launch School");
  }, 2000);
});

promise.catch(function(error) {
  console.log(error);
});
