###### JS230 DOM and Asynchronous Programming with JavaScript > Putting it All Together

---

## Project: Guess a Word, Part 2: Event Handling and Game Play

Now let's look at how we handle the game play and interact with the user after a new game is started.

These are the general requirements for the gameplay:

- Bind a keypress event to the document that will check the guessed letter against the word
  - Only process key presses that are letters. IN other words, from `a` to `z`. You can potentially use the equivalent keycodes for these letters, which run from `97` (`a`) through `122` (`z`)
  - Add the letter to the array of guessed letters
  - If the guess matches at least one letter in the word, output each instance of the guessed letter in the respective blank spaces
  - If the guess is not a match, increment the incorrect guess count and change the class name on the apples container to change the count of apples
  - If the letter has already been guessed, ignore it
- When a letter is guessed, write it to the guesses container
- If the number of incorrect guesses matches the number of guesses available for a game (6 in this case), the game is over. Display a message and a link to start a new game. Unbind the keypress event
- If all of the letters of the word have been revealed, display a win message and a link to start a new game. Unbind the keypress event
- When the "Play another" button is clicked, a new game is constructed. The class on the apples container gets reset to show 6 apples again

#### My Solution

###### HTML

```html
<!doctype html>
<html lang="en-US">
  <head>
    <title>Guess-a-word</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="stylesheets/game.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="javascripts/game.js"></script>
  </head>
  <body>
    <main>
      <div id="tree">
        <div id="apples"></div>
      </div>
      <p id="message"></p>
      <p><a id="replay" href="#">Play another</a></p>

      <div id="spaces">
        <h2>Word:</h2>
      </div>

      <div id="guesses">
        <h2>Guesses:</h2>
      </div>
    </main>
  </body>
</html>
```

###### CSS

```css
body {
  /*background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjZTVlNWU1Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2I1YjViNSIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==");*/
  background-color: #f0f0f0;background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nNDkxLjk5OTk5OTk5OTk5OTk0JyBoZWlnaHQ9JzI1Mi4wMDAwMDAwMDAwMDAwMycgdmlld0JveD0nMCAwIDk4LjM5OTk5OTk5OTk5OTk5IDUwLjQwMDAwMDAwMDAwMDAwNic+Cgk8ZGVmcz4KCQk8cGF0aCBpZD0ncycgZmlsbD0nI2ZmZmZmZicgZD0nTTAsMGw4IDRsLTgsNHonLz4KCTwvZGVmcz4KCTxnIGlkPSdiJz4KCTx1c2UgeD0nLTgnIHk9Jy00JyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuMycgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9JzAnIHk9JzAuMicgZmlsbC1vcGFjaXR5PScwLjQ0OTk5OTk5OTk5OTk5OTk2JyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nLTgnIHk9JzQuNCcgdHJhbnNmb3JtPSdtYXRyaXgoLTEgMCAwIDEgMCAwKScgZmlsbC1vcGFjaXR5PScwLjQ0OTk5OTk5OTk5OTk5OTk2JyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nMCcgeT0nOC42JyBmaWxsLW9wYWNpdHk9JzAuNDQ5OTk5OTk5OTk5OTk5OTYnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSctOCcgeT0nMTIuOCcgdHJhbnNmb3JtPSdtYXRyaXgoLTEgMCAwIDEgMCAwKScgZmlsbC1vcGFjaXR5PScwLjYnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PScwJyB5PScxNycgZmlsbC1vcGFjaXR5PScwLjMnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSctOCcgeT0nMjEuMicgdHJhbnNmb3JtPSdtYXRyaXgoLTEgMCAwIDEgMCAwKScgZmlsbC1vcGFjaXR5PScwLjMnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSc4LjInIHk9Jy00JyBmaWxsLW9wYWNpdHk9JzAuNDQ5OTk5OTk5OTk5OTk5OTYnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSctMTYuMicgeT0nMC4yJyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuNicgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9JzguMicgeT0nNC40JyBmaWxsLW9wYWNpdHk9JzAuNDQ5OTk5OTk5OTk5OTk5OTYnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSctMTYuMicgeT0nOC42JyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuMycgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9JzguMicgeT0nMTIuOCcgZmlsbC1vcGFjaXR5PScwLjE1JyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nLTE2LjInIHk9JzE3JyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuMycgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9JzguMicgeT0nMjEuMicgZmlsbC1vcGFjaXR5PScwLjQ0OTk5OTk5OTk5OTk5OTk2JyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nLTI0LjQnIHk9Jy00JyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuMycgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9JzE2LjQnIHk9JzAuMicgZmlsbC1vcGFjaXR5PScwLjMnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSctMjQuNCcgeT0nNC40JyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuNDQ5OTk5OTk5OTk5OTk5OTYnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PScxNi40JyB5PSc4LjYnIGZpbGwtb3BhY2l0eT0nMC4zJyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nLTI0LjQnIHk9JzEyLjgnIHRyYW5zZm9ybT0nbWF0cml4KC0xIDAgMCAxIDAgMCknIGZpbGwtb3BhY2l0eT0nMC4xNScgeGxpbms6aHJlZj0nI3MnIC8+CQoJPHVzZSB4PScxNi40JyB5PScxNycgZmlsbC1vcGFjaXR5PScwLjMnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSctMjQuNCcgeT0nMjEuMicgdHJhbnNmb3JtPSdtYXRyaXgoLTEgMCAwIDEgMCAwKScgZmlsbC1vcGFjaXR5PScwLjMnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PScyNC41OTk5OTk5OTk5OTk5OTgnIHk9Jy00JyBmaWxsLW9wYWNpdHk9JzAuMycgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9Jy0zMi41OTk5OTk5OTk5OTk5OTQnIHk9JzAuMicgdHJhbnNmb3JtPSdtYXRyaXgoLTEgMCAwIDEgMCAwKScgZmlsbC1vcGFjaXR5PScwLjMnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PScyNC41OTk5OTk5OTk5OTk5OTgnIHk9JzQuNCcgZmlsbC1vcGFjaXR5PScwLjE1JyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nLTMyLjU5OTk5OTk5OTk5OTk5NCcgeT0nOC42JyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuNDQ5OTk5OTk5OTk5OTk5OTYnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PScyNC41OTk5OTk5OTk5OTk5OTgnIHk9JzEyLjgnIGZpbGwtb3BhY2l0eT0nMC40NDk5OTk5OTk5OTk5OTk5NicgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9Jy0zMi41OTk5OTk5OTk5OTk5OTQnIHk9JzE3JyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuMTUnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PScyNC41OTk5OTk5OTk5OTk5OTgnIHk9JzIxLjInIGZpbGwtb3BhY2l0eT0nMC4zJyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nLTQwLjgnIHk9Jy00JyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuNDQ5OTk5OTk5OTk5OTk5OTYnIHhsaW5rOmhyZWY9JyNzJyAvPgkKCTx1c2UgeD0nMzIuOCcgeT0nMC4yJyBmaWxsLW9wYWNpdHk9JzAuNicgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9Jy00MC44JyB5PSc0LjQnIHRyYW5zZm9ybT0nbWF0cml4KC0xIDAgMCAxIDAgMCknIGZpbGwtb3BhY2l0eT0nMC4xNScgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9JzMyLjgnIHk9JzguNicgZmlsbC1vcGFjaXR5PScwLjMnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSctNDAuOCcgeT0nMTIuOCcgdHJhbnNmb3JtPSdtYXRyaXgoLTEgMCAwIDEgMCAwKScgZmlsbC1vcGFjaXR5PScwLjQ0OTk5OTk5OTk5OTk5OTk2JyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nMzIuOCcgeT0nMTcnIGZpbGwtb3BhY2l0eT0nMC4xNScgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9Jy00MC44JyB5PScyMS4yJyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuNDQ5OTk5OTk5OTk5OTk5OTYnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSc0MScgeT0nLTQnIGZpbGwtb3BhY2l0eT0nMC4zJyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nLTQ4Ljk5OTk5OTk5OTk5OTk5JyB5PScwLjInIHRyYW5zZm9ybT0nbWF0cml4KC0xIDAgMCAxIDAgMCknIGZpbGwtb3BhY2l0eT0nMC4zJyB4bGluazpocmVmPScjcycgLz4JCgk8dXNlIHg9JzQxJyB5PSc0LjQnIGZpbGwtb3BhY2l0eT0nMC42JyB4bGluazpocmVmPScjcycgLz4KCTx1c2UgeD0nLTQ4Ljk5OTk5OTk5OTk5OTk5JyB5PSc4LjYnIHRyYW5zZm9ybT0nbWF0cml4KC0xIDAgMCAxIDAgMCknIGZpbGwtb3BhY2l0eT0nMC4zJyB4bGluazpocmVmPScjcycgLz4JCgk8dXNlIHg9JzQxJyB5PScxMi44JyBmaWxsLW9wYWNpdHk9JzAuNDQ5OTk5OTk5OTk5OTk5OTYnIHhsaW5rOmhyZWY9JyNzJyAvPgoJPHVzZSB4PSctNDguOTk5OTk5OTk5OTk5OTknIHk9JzE3JyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyBmaWxsLW9wYWNpdHk9JzAuMycgeGxpbms6aHJlZj0nI3MnIC8+Cgk8dXNlIHg9JzQxJyB5PScyMS4yJyBmaWxsLW9wYWNpdHk9JzAuMycgeGxpbms6aHJlZj0nI3MnIC8+Cgk8L2c+Cgk8dXNlIHg9Jy00OC45OTk5OTk5OTk5OTk5OScgeT0nMjUuMjAwMDAwMDAwMDAwMDAzJyB0cmFuc2Zvcm09J21hdHJpeCgtMSAwIDAgMSAwIDApJyB4bGluazpocmVmPScjYicgLz4KCTx1c2UgeD0nLTk4LjE5OTk5OTk5OTk5OTk5JyB5PSctMTYuOCcgdHJhbnNmb3JtPSdtYXRyaXgoLTEgMCAwIC0xIDAgMCknIHhsaW5rOmhyZWY9JyNiJyAvPgoJPHVzZSB4PSc0OS4xOTk5OTk5OTk5OTk5OTYnIHk9Jy0zMy42JyB0cmFuc2Zvcm09J21hdHJpeCgxIDAgMCAtMSAwIDApJyB4bGluazpocmVmPScjYicgLz4KCTx1c2UgeD0nNDkuMTk5OTk5OTk5OTk5OTk2JyB5PSctNTguODAwMDAwMDAwMDAwMDA0JyB0cmFuc2Zvcm09J21hdHJpeCgxIDAgMCAtMSAwIDApJyB4bGluazpocmVmPScjYicgLz4KPC9zdmc+Cg==');
  background-repeat: repeat;
}

body.win {
  background-color: #0066cc;
  animation: win 3s;
}
body.lose {
  background-color: #b00b00;
  animation: lose 3s;
}

@keyframes win {
  0% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #0066cc;
  }
}

@keyframes lose {
  0% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #b00b00;
  }
}

main {
  width: 800px;
  padding: 20px;
  margin: 0 auto;
  background: #ffffff;
}
#tree {
  position: relative;
  width: 678px;
  height: 517px;
  background: url("../images/tree.png") 0 0 no-repeat;
}

#apples {
  position: absolute;
  left: 170px;
  top: 20px;
  z-index: 1;
  width: 374px;
  height: 322px;
  background: url("../images/apples.png") 0 0 no-repeat;
}

#apples.guess_1 { background-position: 0 -322px; }
#apples.guess_2 { background-position: 0 -644px; }
#apples.guess_3 { background-position: 0 -966px; }
#apples.guess_4 { background-position: 0 -1288px; }
#apples.guess_5 { background-position: 0 -1610px; }
#apples.guess_6 { display: none; }

#spaces,
#guesses,
p {
  padding: 0 0 40px 0;

}

p {
  padding-bottom: 25px;
  font-size: 20px;
}

p:empty {
  display: none;
}

p #replay {
  display: none;
}

span {
  display: inline-block;
  width: 30px;
  height: 35px;
  margin: 0 10px 0 0;
  font-size: 28px;
  text-transform: uppercase;
  text-align: center;
  vertical-align: top;
  border-bottom: 3px solid #333333;
}

h2 {
  display: inline-block;
  width: 100px;
  margin: 0;
  vertical-align: middle;
}
```

###### JavaScript

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
```

#### LS Solution

###### JavaScript

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
    this.lettersGuessed = [];
    this.correctSpaces = 0;
    this.word = randomWord();
    if (!this.word) {
      this.displayMessage("Sorry, I've run out of words!");
      this.hideReplayLink();
      return this;
    }
    this.word = this.word.split("");
    this.init();
  }
  
  Game.prototype = {
    guesses: 6,
    createBlanks: function() {
      let spaces = (new Array(this.word.length + 1)).join("<span></span>");
      
      let spans = letters.querySelectorAll("span");
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
      letters.insertAdjacentHTML('beforeend', spaces);
      this.spaces = document.querySelectorAll("#spaces span");
    },
    fillBlanksFor: function(letter) {
      var self = this;
      
      this.word.forEach(function(l, i) {
        if (letter === l) {
          self.spaces[i].textContent = letter;
          self.correctSpaces++;
        }
      });
    },
    emptyGuesses: function() {
      let spans = guesses.querySelectorAll('span');
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
    },
    renderGuess: function(letter) {
      let span = document.createElement("span");
      span.textContent = letter;
      guesses.appendChild(span);
    },
    renderIncorrectGuess: function(letter) {
      this.incorrect++;
      this.renderGuess(letter);
      this.setClass();
    },
    duplicateGuess: function(letter) {
      let duplicate = this.lettersGuessed.indexOf(letter) !== -1;
      
      if (!duplicate) { this.lettersGuessed.push(letter); }
      
      return duplicate;
    },
    setClass: function() {
      apples.classList.remove(...apples.classList);
      apples.classList.add("guess_" + this.incorrect);
    },
    displayMessage: function(text) {
      message.textContent = text;
    },
    showReplayLink: function() {
      replay.classList.add("visible");
    },
    hideReplayLink: function() {
      replay.classList.remove("visible");
    },
    processGuess: function(e) {
      let letter = e.key;
      if (notALetter(letter)) { return; }
      if (this.duplicateGuess(letter)) { return; }
      
      if (this.word.includes(letter)) {
        this.fillBlanksFor(letter);
        this.renderGuess(letter);
        
        if (this.correctSpaces === this.spaces.length) {
          this.win();
        }
      } else {
        this.renderIncorrectGuess(letter);
      }
      if (this.incorrect === this.guesses) {
        this.lose();
      }
    },
    win: function() {
      this.unbind();
      this.displayMessage("You win!");
      this.showReplayLink();
      this.setGameStatus("win");
    },
    lose: function() {
      this.unbind();
      this.displayMessage("Sorry! You're out of guesses");
      this.showReplayLink();
      this.setGameStatus("lose");
    },
    setGameStatus: function(status) {
      document.body.classList.remove('win', 'lose');
      if (status) {
        document.body.classList.add(status);
      }
    },
    bind: function() {
      this.processGuessHandler = (e) => this.processGuess(e);
      document.addEventListener("keyup", this.processGuessHandler);
    },
    unbind: function() {
      document.removeEventListener("keyup", this.processGuessHandler);
    },
    init: function() {
      this.bind();
      this.setClass();
      this.hideReplayLink();
      this.emptyGuesses();
      this.createBlanks();
      this.setGameStatus();
      this.displayMessage("");
    }
  };
  
  function notALetter(letter) {
    return letter < 'a' || letter > 'z';
  }
  
  new Game();
  
  replay.addEventListener("click", function(e) {
    e.preventDefault();
    new Game();
  });
});
```

###### CSS Modifications

```css
#replay {
  display: none;
}

#replay.visible {
  display: inline;
}
```

