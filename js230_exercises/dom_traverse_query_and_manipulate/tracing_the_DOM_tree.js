"use strict";

function domTreeTracer(idNumber) {
  let domTree = [];
  let element = document.getElementById(idNumber);

  while (Number(element.getAttribute('id')) >= 1) {
    domTree.push(findSiblingElements(idNumber));
    element = element.parentElement;
    idNumber = element.getAttribute('id');
  }

  return domTree;
}

function findSiblingElements(idNumber) {
  let element = document.getElementById(idNumber);
  let siblings = [element.nodeName];

  while (element.nextElementSibling) {
    element = element.nextElementSibling;
    siblings.push(element.nodeName);
  }

  element = document.getElementById(idNumber);

  while (element.previousElementSibling) {
    element = element.previousElementSibling;
    siblings.push(element.nodeName);
  }

  return siblings;
}

domTreeTracer(1);
domTreeTracer(2);
domTreeTracer(22);
