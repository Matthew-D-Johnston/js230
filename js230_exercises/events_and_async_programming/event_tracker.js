"use strict";

const tracker = (function() {
  let trackedEvents = [];
  
  return {
    list() {
      return trackedEvents.slice();
    },

    elements() {
      return trackedEvents.map(event => event.target);
    },

    clear() {
      trackedEvents = [];
    },

    add(event) {
      trackedEvents.push(event);
    },
  };
})();

function track(callback) {
  return function(event) {
    event.stopPropagation();
    tracker.add(event);
    callback(event);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  let divRed = document.getElementById('red');
  let divBlue = document.getElementById('blue');
  let divOrange = document.getElementById('orange');
  let divGreen = document.getElementById('green');

  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
  }));

  divBlue.addEventListener('click', track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));

  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
  }));

  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
  }));
});

// console.log(tracker.list().length);
// console.log(tracker.elements());
// console.log(tracker.elements()[0] === document.querySelector('#blue'));
// console.log(tracker.elements()[3] === document.querySelector('#green'));
// tracker.clear();
// console.log(tracker.list());
// tracker.list()[0] = 'abc';
// console.log(tracker.list().length);
