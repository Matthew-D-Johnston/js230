"use strict";

function sliceTree(startId, endId) {
  const slice = [];
  let currentElement = document.getElementById(endId);

  if (feasibleSlice(startId, endId) && hasBodyAsAncestor(document.getElementById(startId))) {
    while (Number(currentElement.getAttribute('id') >= startId) && currentElement.tagName !== 'BODY') {
      slice.unshift(currentElement.tagName);
      currentElement = currentElement.parentElement;
    }

    return slice;
  } else {
    return undefined;
  }
}

function feasibleSlice(startId, endId) {
  const children = [];

  function walk(node) {
    for (let index = 0; index < node.children.length; index +=1 ) {
      children.push(node.children[index].getAttribute('id'));
      walk(node.children[index]);
    }

    return children;
  }

  return walk(document.getElementById(startId)).includes(String(endId));
}

function hasBodyAsAncestor(node) {
  while (node.parentElement) {
    if (node.parentElement.tagName === 'BODY') {
      return true;
    }

    node = node.parentElement;
  }

  return false;
}

sliceTree(1, 4);
// = ["ARTICLE", "HEADER", "SPAN", "A"]
sliceTree(1, 76);
// = undefined
sliceTree(2, 5);
// = undefined
sliceTree(5, 4);
// = undefined
sliceTree(1, 23);
// = ["ARTICLE", "FOOTER"]
sliceTree(1, 22);
// = ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
sliceTree(11, 19);
// = ["SECTION", "P", "SPAN", "STRONG", "A"]
