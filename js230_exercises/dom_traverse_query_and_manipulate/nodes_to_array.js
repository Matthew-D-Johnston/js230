"use strict"

// function nodesToArr() {
//   return nestedDOMArrays(document.body);
// }

// function nestedDOMArrays(node) {
//   let parentName = node.tagName;
//   let children = Array.prototype.slice.call(node.children) || [];
//   return [parentName, children.map(nestedDOMArrays)];
// }


// Refactored

function nodesToArr(node = document.body) {
  let parentName = node.tagName;
  let children = Array.prototype.slice.call(node.children) || [];
  return [parentName, children.map(nodesToArr)];
}

console.log(nodesToArr());
