"use strict";

function childrenNodes(idNumber) {
  let node = document.getElementById(String(idNumber));
  let numberOfDirectChildren = node.childNodes.length;

  let numberOfChildren = 0;
  function walk(node) {
    numberOfChildren += node.childNodes.length;

    for (let index = 0; index < node.childNodes.length; index += 1) {
      walk(node.childNodes[index]);
    }

    return numberOfChildren;
  }

  let numberOfIndirectChildren = walk(node) - numberOfDirectChildren;

  return [numberOfDirectChildren, numberOfIndirectChildren];
}


console.log(childNodes(1));
console.log(childNodes(2));
console.log(childNodes(3));
console.log(childNodes(4));
console.log(childNodes(5));
console.log(childNodes(6));
console.log(childNodes(7));
console.log(childNodes(8));
console.log(childNodes(9));
console.log(childNodes(10));
