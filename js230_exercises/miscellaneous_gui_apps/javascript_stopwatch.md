###### JS230 — Front-end Development with JavaScript > Miscellaneous GUI Apps

---

## A JavaScript Stopwatch

Create a stopwatch application.

#### Specifications

**The Timer**

The stopwatch timer should have four 2-digit counters:

- hours (00-99)
- minutes (00-59)
- seconds (00-59)
- centiseconds (00-99)

All counters should use a leading zero when the corresponding time value is less than 10.

Note that 1 centisecond is 1/100th of a second or 10 milliseconds.

**The Controls**

The stopwatch should have the following controls:

- a Start/Stop button
- a Reset button

**Functionality**

When the user clicks the Start button:

- The text on the button changes to `Stop`.
- The timer starts running the centiseconds counter.
- When the centiseconds counter reaches 100, it resets to zero and the seconds counter starts incrementing.
- When the seconds counter reaches 60, it resets to zero and the minutes counter starts incrementing.
- When the minutes counter reaches 60, it resets to zero and the hour counter starts incrementing.

When the user clicks the Stop button:

- The timer stops.
- The button text changes to `Start`.

When the user clicks the Reset button:

- The timer stops running if it is already running.
- The timer resets all counters to `00`.

You can see our demo app [here](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/07_stopwatch/index.html).

### My Solution

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>JavaScript Stopwatch</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="javascript_stopwatch.css">
    <script src="javascript_stopwatch.js"></script>
  </head>
  <body>
    <div>
      <p id="timer">00:00:00:00</p>
      <button id="start_stop" type="button">Start</button>
      <button id="reset" type="button">Reset</button>
    </div>
  </body>
</html>
```

###### CSS

```css
@import url("whitespace-reset.css");

body {
  background: #A19124;
}

div {
  text-align: center;
  margin-top: 200px;
}

div p {
  font-size: 80px;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
}

button {
  color: #fff;
  background: #A19124;
  border-radius: 3px;
  border: 1px solid #fff;
  width: 90px;
  height: 35px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}

button:hover {
  background: #918220;
}
```

###### JavaScript

```javascript
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
```

