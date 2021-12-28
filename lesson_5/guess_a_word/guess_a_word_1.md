###### JS230 DOM and Asynchronous Programming with JavaScript > Putting it All Together

---

## Project: Guess a Word, Part 1: Core Functions

In this project, we're going to make a web-based version of guess a word. Guess a word is a game where you are presented with a series of blank spaces to represent the letters to the word that you need to complete. You guess a letter, and if you guessed a letter that appears in the word, the instances of that letter are revealed. If the guess does not appear in the word, an apple falls from the tree. If you guess incorrectly enough times, there are no more apples left on the tree and the game is over.  

Watch an overview of the assignment to get a better understanding of what we're working on.  

<video id="video_880e764e8b00_html5_api" class="vjs-tech" poster="https://launchschool.com/assets/tealeaf_markup/video_poster.jpg" preload="none" src="https://d3905n0khyu9wc.cloudfront.net/videos/output/guess_a_word_overview_f00382_s132/guess_a_word_overview_f00382_s132.mp4" style="box-sizing: inherit; display: inline-block; position: absolute; top: 0px; left: 0px; width: 899px; height: 505.688px;"></video>

Play

Mute

Loaded: 0%

Progress: 0%

Remaining Time-0:00

Playback Rate

1x

Captions

Fullscreen









You can also [play a game of it here](https://d3905n0khyu9wc.cloudfront.net/guess_a_word/index.html).  

To start with, you will need the HTML and CSS to display the apples, the word, and the guesses already given. Here's [the archive](https://d3905n0khyu9wc.cloudfront.net/guess_a_word/guess-a-word.zip) containing both. Alternatively, if you want to get some practice with writing HTML and CSS, you can create it from scratch following the description in [this gist](https://launchschool.com/gists/fa3cf899). The gist also includes a walkthrough video that you can reference. Take note that the succeeding walkthrough videos in the project uses the completed HTML and CSS that we provide.  

When you have the HTML and CSS, start creating the game functionality. In this part, we'll focus on two pieces of core functionality of the game:  

- A function that picks a random word from an array of words. The function has to pick a different word every time it runs, and when it's out of words, it returns `undefined`.
- How to start a new game. We'll need a Game constructor that can be used to create game objects.



### The randomWord() Function

We'll need a function `randomWord` that can pick one word out at a time randomly. A picked word can't be picked again, and when all words are taken, return `undefined`. For example:

```javascript
// the words are: 'apple', 'banana', 'orange' and 'pear'

randomWord();     // banana
randomWord();     // pear
randomWord();     // apple
randomWord();     // orange
randomWord();     // undefined
```

Our function has to have access to the words array defined outside of it. With each call of the function, it mutates the array to remove the element it used.  

#### My Solution

```javascript
let words = ['apple', 'banana', 'orange', 'pear', 'grape', 'strawberry']

function randomWord() {
  let max = words.length;
  if (max === 0) {
    return undefined;
  }
  let randomIndex = Math.floor(Math.random() * max);
  let randomWord = words.splice(randomIndex, 1)[0];
  return randomWord;
}
```

#### LS Solution 1

```javascript
var words = ['apple', 'banana', 'orange', 'pear'];

function randomWord() {
  var word = words[Math.floor(Math.random() * words.length)];
  words.splice(words.indexOf(word), 1);
  return word;
}
```

#### LS Solution 2

```javascript
var randomWord = function() {
  var words = ['apple', 'banana', 'orange', 'pear'];
  
  return function() {
    var word = words[Math.floor(Math.random() * words.length)];
    words.splice(words.indexOf(word), 1);
    return word;
  };
}();
```

#### LS Solution 3

```javascript
var randomWord = (function() {
  var words = ["abacus", "quotient", "octothorpe", "proselytize", "stipend"];

  function without() {
    var new_arr = [],
        args = Array.prototype.slice.call(arguments);

    words.forEach(function(el) {
      if (args.indexOf(el) === -1) {
        new_arr.push(el);
      }
    });

    return new_arr;
  }

  return function() {
    var word = words[Math.floor(Math.random() * words.length)];
    words = without(word);
    return word;
  };
})();
```

#### My Final Solution

```javascript
let randomWord = (function() {
  let words = ["abacus", "quotient", "octothorpe", "proselytize", "stipend"];

  return function() {
    let max = words.length;
    let randomIndex = Math.floor(Math.random() * max);
    let randomWord = words.splice(randomIndex, 1)[0];
    return randomWord;
  }
})();
```

### Start a New Game

We need a `Game` constructor that we can use to create a new game object. When we plan out the constructor, we need to examine all the states that a game needs to track.  

- The word chosen for the current game.
- Number of incorrect guesses: this controls the number of apples we show.
- All the letters guessed: the letters will show for "Guesses"
- Total allowed wrong guesses: this should be 6, since we only have 6 apples!

A game object, after it's constructed, should be able to do the following:  

- It needs to choose a word from the words array as the word of the game. If all words are chosen, show the "Sorry, I've run out of words!" message.
- Number of incorrect guesses should be initialized to 0.
- The letters guessed should be initialized as an empty array.
- Set total allowed wrong guesses to 6.
- Create blanks in the "Word:" container. The number of blanks should be the same as the length of the chosen word.

There is more than one way to implement the above requirements, and you could try to use both the pseudo-classical pattern or the OLOO pattern when it comes to the game object creation.  

#### My Solution

```javascript
let Game = function(word) {
  this.word = word;
  this.incorrectGuesses = 0;
  this.lettersGuessed = [];
  this.maxIncorrectGuesses = 6;
}

Game.prototype.createBlanksInWordContainer = function() {
  console.log(this.word);
  if (!this.word) {
    return "Sorry, I've run out of words!";
  }

  let wordLength = this.word.length;
  console.log(wordLength);
  for (let count = 1; count <= wordLength; count += 1) {
    $('#spaces h2').after($('<span></span>'));
  }
};

$( document ).ready(function() {
  let newGame = new Game(randomWord());
  newGame.createBlanksInWordContainer();  
});
```

#### LS Solution

```javascript
document.addEventListener('DOMContentLoaded', event => {
  const message = document.querySelector("#message");
  const letters = document.querySelector("#spaces");
  const guesses = document.querySelector("#guesses");
  const apples = document.querySelector("#apples");
  const replay = document.querySelector("#replay");

  var randomWord = function() {
    var words = ['apple', 'banana', 'orange', 'pear'];

    return function() {
      var word = words[Math.floor(Math.random() * words.length)];
      words.splice(words.indexOf(word), 1);
      return word;
    };
  }();

  function Game() {
    this.incorrect = 0;
    this.letters_guessed = [];
    this.correct_spaces = 0;
    this.word = randomWord();
    if (!this.word) {
      this.displayMessage("Sorry, I've run out of words!");
      return this;
    }
    this.word = this.word.split("");
    this.init();
  }

  Game.prototype = {
    createBlanks: function() {
      let spaces = (new Array(this.word.length + 1)).join("<span></span>");

      let spans = letters.querySelectorAll("span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
      letters.insertAdjacentHTML('beforeend', spaces);
      this.spaces = document.querySelectorAll("#spaces span");
    },
    displayMessage: function(text) {
      $message.text(text);
    },
    init: function() {
      this.createBlanks();
    }
  };

  new Game();
});
```

#### Modification of LS Solution

```javascript
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

  new Game();
});
```

