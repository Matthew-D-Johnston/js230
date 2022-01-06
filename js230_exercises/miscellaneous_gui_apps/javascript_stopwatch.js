"use strict";

let TimeObject = {
  centiseconds: 0,
  seconds: 0,
  minutes: 0,
  hours: 0,

  reset() {
    this.centiseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  },

  init(centiseconds, seconds, minutes, hours) {
    this.centiseconds = centiseconds;
    this.seconds = seconds;
    this.minutes = minutes;
    this.hours = hours;
    return this;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  let startStopButton = document.getElementById('start_stop');
  let resetButton = document.getElementById('reset');
  let timerElement = document.getElementById('timer');
  let timeObject = Object.create(TimeObject).init(0, 0, 0, 0);
  let intervalId;

  startStopButton.addEventListener('click', event => {
    console.log(startStopButton.innerText);

    if (startStopButton.innerText === 'Stop') {
      startStopButton.innerText = 'Start';
      clearInterval(intervalId);
      return;
    }

    if (startStopButton.innerText === 'Start') {
      startStopButton.innerText = 'Stop';

      intervalId = setInterval(() => {
        timerElement.innerText = counter();
      }, 10);

      let counter = (function() {
        let startTime = Date.now() - (timeObject.centiseconds * 10);

        return function() {
          let currentTime = Date.now();
          timeObject.centiseconds = Math.round((currentTime - startTime) / 10);

          if (timeObject.centiseconds === 100) {
            timeObject.seconds += 1;
            startTime = currentTime;
          }
      
          if (timeObject.seconds === 60) {
            timeObject.minutes += 1;
            timeObject.seconds = 0;
          }
      
          if (timeObject.minutes === 60) {
            timeObject.hours += 1;
            timeObject.minutes = 0;
          }

          return `${padWithZeros(timeObject.hours)}:${padWithZeros(timeObject.minutes)}:${padWithZeros(timeObject.seconds)}:${padWithZeros(timeObject.centiseconds)}`;
        }
      })();
    }
  });
  
  resetButton.addEventListener('click', event => {
    if (startStopButton.innerText === 'Start') {
      timeObject = Object.create(TimeObject).init(0, 0, 0, 0);
      timerElement.innerText = "00:00:00:00"
    }

    if (startStopButton.innerText === 'Stop') {
      startStopButton.innerText = 'Start';
      clearInterval(intervalId);
      timeObject = Object.create(TimeObject).init(0, 0, 0, 0);
      timerElement.innerText = "00:00:00:00"
    }
  });

  document.addEventListener('visibilitychange', () => {
    console.log(startStopButton.innerText);

    if (startStopButton.innerText === 'Stop') {
      startStopButton.innerText = 'Start';
      clearInterval(intervalId);
      return;
    }

    if (startStopButton.innerText === 'Start') {
      startStopButton.innerText = 'Stop';

      intervalId = setInterval(() => {
        timerElement.innerText = counter();
      }, 10);

      let counter = (function() {
        let startTime = Date.now() - (timeObject.centiseconds * 10);

        return function() {
          let currentTime = Date.now();
          timeObject.centiseconds = Math.round((currentTime - startTime) / 10);

          if (timeObject.centiseconds === 100) {
            timeObject.seconds += 1;
            startTime = currentTime;
          }
      
          if (timeObject.seconds === 60) {
            timeObject.minutes += 1;
            timeObject.seconds = 0;
          }
      
          if (timeObject.minutes === 60) {
            timeObject.hours += 1;
            timeObject.minutes = 0;
          }

          return `${padWithZeros(timeObject.hours)}:${padWithZeros(timeObject.minutes)}:${padWithZeros(timeObject.seconds)}:${padWithZeros(timeObject.centiseconds)}`;
        }
      })();
    }
  });
  
  function padWithZeros(num) {
    if (num < 10) {
      num = `0${num}`;
    } else {
      num = num.toString();
    }

    if (num.length > 2) {
      num = num.slice(1);
    }
  
    return num;
  }
});






