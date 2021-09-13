"use strict";

function nodeSwap(id1, id2) {
  let firstElement = document.getElementById(id1);
  let secondElement = document.getElementById(id2);
  let firstParent;
  let secondParent;

  if ((firstElement && secondElement) && (firstElement.parentElement === secondElement.parentElement)) {
    let firstPosition = firstElement.nextSibling;
    let secondPosition = secondElement.nextSibling;
    firstElement.parentElement.insertBefore(firstElement, secondPosition);
    secondElement.parentElement.insertBefore(secondElement, firstPosition);
  } else {
    return undefined;
  }
}