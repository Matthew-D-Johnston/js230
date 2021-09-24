"use strict";

// Without changing the behavior of the following code, remove the call to 
// event.stopPropagation and refactor the result.

// Initial Code:

document.querySelector('html').addEventListener('click', () => {
  document.querySelector('#container').style = 'display: none';
});

document.querySelector('#container').addEventListener('click', event => {
  event.stopPropagation();
});

// My Solution:

document.querySelector('html').addEventListener('click', (event) => {
  if (event.target !== document.getElementById('container')) {
    document.querySelector('#container').style = 'display: none';
  }
});

// document.querySelector('#container').addEventListener('click', event => {
//   event.stopPropagation();
// });


// Other Solution to Account for Children of the Container Element:

document.querySelector('html').addEventListener('click', () => {
  document.querySelector('#container').style = 'display: none';
}, true);

document.querySelector('#container').addEventListener('click', event => {
  document.querySelector('#container').style = 'display: true';
});


// LS Solution

document.querySelector('html').addEventListener('click', (event) => {
  const container = document.querySelector(`#container`);

  if (!container.contains(event.target)) {
    container.style = 'display: visible';
  }
});
