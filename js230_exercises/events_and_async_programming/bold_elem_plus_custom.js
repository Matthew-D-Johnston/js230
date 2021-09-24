"use strict";

// My Solution

function makeBold(element, func) {
  element.style.fontWeight = 'bold';
  func(element);
}


// LS Solution

function makeBold(element, callback) {
  element.style.fontWeight = 'bold';
  if (callback && typeof callback === 'function') {
    callback(element);
  }
}

// Tests ...

let sectionElement = document.querySelector('section');
makeBold(sectionElement, function(elem) {
  elem.classList.add('highlight');
});

sectionElement.classList.contains('highlight');
sectionElement.style.fontWeight;


// My Further Exploration Solution

function makeBold(element) {
  element.style.fontWeight = 'bold';
}

let sectionElement = document.querySelector('section');

let event = new CustomEvent("bolded");

sectionElement.addEventListener('bolded', event => {
  makeBold(event.currentTarget);
});

sectionElement.dispatchEvent(event);


// LS Further Exploration Solution

const sectionElement = document.querySelector('section');

function makeBold(element) {
  element.style.fontWeight = 'bold';
  const event = new CustomEvent('bolded');

  element.dispatchEvent(event);
}

sectionElement.addEventListener('bolded', (event) => {
  alert(event.target.tagName);
  event.target.classList.add('highlight');
});

makeBold(sectionElement);
