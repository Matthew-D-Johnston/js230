"use strict";

// My Version

// document.addEventListener('DOMContentLoaded', () => {
//   let answer = Math.ceil(Math.random() * 100);
//   let input = document.querySelector('#guess');
//   let form = document.querySelector('form');
//   let paragraph = document.querySelector('p');

//   form.addEventListener('submit', event => {
//     event.preventDefault();
//     let guess = parseInt(input.value, 10);
//     let message;

//     if (guess === answer) {
//       message = 'You guessed it!';
//     } else if (guess > answer) {
//       message = `My number is lower than ${String(guess)}`;
//     } else {
//       message = `My number is higher than ${String(guess)}`;
//     }

//     paragraph.textContent = message;
//   });

//   let link = document.querySelector('a');
//   link.addEventListener('click', event => {
//     answer = Math.ceil(Math.random() * 100);
//     paragraph.textContent = "Guess a number from 1 to 100";
//   });
// });


// LS Version

HTML CSS JSResult Skip Results Iframe
EDIT ON
document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let paragraph = document.querySelector('p');
  let link = document.querySelector('a');  
  let answer;
  let guesses;

  function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    guesses = 0;
    paragraph.textContent = 'Guess a number from 1 to 100';

    if (input.getAttribute('disabled') === '') {
      input.toggleAttribute('disabled');
    }
  }
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    let message;
    let guess = parseInt(input.value, 10);

    if (typeof guess === 'number' && Math.floor(guess) === Math.ceil(guess) && guess <= 100 && guess > 0) {
      guesses += 1;

      if (guess === answer) {
        input.toggleAttribute('disabled');
        message = `You guessed it! It took you ${guesses} guesses.`;
      } else if (guess > answer) {
        message = `My number is lower than ${guess}`;
      } else {
        message = `My number is higher than ${guess}`;
      }
    } else {
      message = 'Invalid input. Please enter a valid integer between 1 and 100';
    }

    paragraph.textContent = message;
  });

  link.addEventListener('click', event => {
    event.preventDefault();
    newGame();
  });
  
  newGame();
});


// Bonus Questions

document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let button = document.querySelector('input[type="submit"]');
  let paragraph = document.querySelector('p');
  let link = document.querySelector('a');  
  let answer;
  let guesses;

  function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    guesses = 0;
    paragraph.textContent = 'Guess a number from 1 to 100';
    input.style.boxShadow = '10px 5px 5px grey';

    input.removeAttribute('disabled');
    button.removeAttribute('disabled');
  }
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    let message;
    let guess = parseInt(input.value, 10);

    if (typeof guess === 'number' && Math.floor(guess) === Math.ceil(guess) && guess <= 100 && guess > 0) {
      guesses += 1;

      if (guess === answer) {
        input.toggleAttribute('disabled');
        button.toggleAttribute('disabled');
        input.style.boxShadow = 'unset';
        message = `You guessed it! It took you ${guesses} guesses.`;
      } else if (guess > answer) {
        message = `My number is lower than ${guess}`;
      } else {
        message = `My number is higher than ${guess}`;
      }
    } else {
      message = 'Invalid input. Please enter a valid integer between 1 and 100';
    }

    paragraph.textContent = message;
  });

  link.addEventListener('click', event => {
    event.preventDefault();
    newGame();
  });
  
  newGame();
});
