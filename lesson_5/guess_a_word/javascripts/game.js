"use strict";

// My Solution

// let randomWord = (function() {
//   let words = ["abacus", "quotient", "octothorpe", "proselytize", "stipend"];

//   return function() {
//     let max = words.length;
//     let randomIndex = Math.floor(Math.random() * max);
//     let randomWord = words.splice(randomIndex, 1)[0];
//     return randomWord;
//   }
// })();


// let Game = function(word) {
//   this.word = word;
//   this.incorrectGuesses = 0;
//   this.lettersGuessed = [];
//   this.maxIncorrectGuesses = 6;
// }

// Game.prototype.createBlanksInWordContainer = function() {
//   console.log(this.word);
//   if (!this.word) {
//     return "Sorry, I've run out of words!";
//   }

//   let wordLength = this.word.length;
//   console.log(wordLength);
//   for (let count = 1; count <= wordLength; count += 1) {
//     $('#spaces h2').after($('<span></span>'));
//   }
// };

// $( document ).ready(function() {
//   let newGame = new Game(randomWord());
//   newGame.createBlanksInWordContainer();  
// });

document.addEventListener('DOMContentLoaded', event => {
  const message = document.querySelector("#message");
  const letters = document.querySelector("#spaces");
  const guesses = document.querySelector("#guesses");
  const apples = document.querySelector("#apples");
  const replay = document.querySelector("#replay");

  let randomWord = (function() {
    let words = ["abacus", "quotient", "octothorpe", "proselytize", "stipend"];

    return function() {
      let word = words[Math.floor(Math.random() * words.length)];
      words.splice(words.indexOf(word), 1);
      return word;
    };
  })();

  function Game() {
    this.incorrect = 0;
    this.letters_guessed = [];
    this.correct_spaces = 0;
    this.word = randomWord();
    if (!this.word) {
      this.displayMessage("Sorry, I've run out of words!");
    } else {
      this.word = this.word.split("");
    }
    this.init();
  }

  Game.prototype = {
    createBlanks: function() {
      if (this.word) {
        let spaces = (new Array(this.word.length + 1)).join("<span></span>");

        let spans = letters.querySelectorAll("span");
        spans.forEach(span => {
          span.parentNode.removeChild(span);
        });
        letters.insertAdjacentHTML('beforeend', spaces);
        this.spaces = document.querySelectorAll("#spaces span");
      }
    },
    displayMessage: function(text) {
      message.innerText = text;
    },
    init: function() {
      this.createBlanks();
    }
  };

  let newGame = new Game();

  document.addEventListener('keydown', letterGuess);

  function letterGuess(event) {
    let guessedLetter = event.key;
  
    if (validLetter(guessedLetter) && letterNotYetGuessed(guessedLetter, newGame.letters_guessed)) {
      newGame.letters_guessed.push(guessedLetter);
      updateGuesses(guessedLetter);

      let matchedIndices = findLetterMatchIndices(guessedLetter, newGame.word);

      if (matchedIndices.length > 0) {
        updateWordSpaces(guessedLetter, matchedIndices);
        newGame.correct_spaces += matchedIndices.length;

        if (newGame.correct_spaces === newGame.word.length) {
          newGame.displayMessage("You win!");
          document.querySelector('body').setAttribute('class', 'win');
          document.querySelector('p #replay').style.display = "inline-block";
          document.removeEventListener('keydown', letterGuess);
          document.getElementById('replay').addEventListener('click', resetGame);
        }
      } else {
        newGame.incorrect += 1;

        updateApples(newGame.incorrect);

        if (newGame.incorrect === 6) {
          newGame.displayMessage("Sorry! You're out of guesses");
          document.querySelector('body').setAttribute('class', 'lose');
          document.querySelector('p #replay').style.display = "inline-block";
          document.removeEventListener('keydown', letterGuess);
          document.getElementById('replay').addEventListener('click', resetGame);
        }
      }
  
    } 
  }
  
  function validLetter(char) {
    return !!char.match(/[a-z]/g);
  }
  
  function letterNotYetGuessed(char, letters) {
    return !letters.includes(char);
  }
  
  function findLetterMatchIndices(letter, word) {
    let matchedIndices = [];
  
    for (let index = 0; index < word.length; index += 1) {
      if (letter === word[index]) {
        matchedIndices.push(index);
      }
    }
  
    return matchedIndices;
  }

  function updateWordSpaces(letter, indices) {
    let spaces = document.querySelectorAll('#spaces span');

    for (let index = 0; index < spaces.length; index += 1) {
      if (indices.includes(index)) {
        spaces[index].innerText = letter;
      }
    }
  }

  function updateGuesses(letter) {
    guesses.insertAdjacentHTML('beforeend', `<span>${letter}</span>`);
  }

  function updateApples(guessNumber) {
    document.getElementById('apples').setAttribute('class', `guess_${guessNumber}`);
  }

  function removeGuesses() {
    let guessSpaces = guesses.querySelectorAll('span');

    for (let index = 0; index < guessSpaces.length; index += 1) {
      guessSpaces[index].parentNode.removeChild(guessSpaces[index]);
    }
  }

  function resetGame(event) {
    event.preventDefault();
    document.querySelector('body').removeAttribute('class');
    document.querySelector('p #replay').style.display = 'none';
    apples.removeAttribute('class');
    message.innerText = '';
    removeGuesses();
    newGame = new Game();
    document.addEventListener('keydown', letterGuess);
  }
});
