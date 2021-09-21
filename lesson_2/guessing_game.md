##### JS230 DOM and Asynchronous Programming with JavaScript > Event-Driven and Asynchronous Programming

---

## Assignment: Guessing Game

The goal of this assignment is to create a guessing game that asks the player to guess an integer between 1 and 100 chosen by the computer. The program first picks a random value using a random number generator. The player then enters her guess and submits it, and the program checks whether the guess is higher, lower, or equal to the computer's chosen number, and reports the result. The player may continue to play until she guesses the number.  

Since our focus for this assignment is JavaScript, we'll provide the HTML and CSS necessary to build this program. You can copy and paste it from the CodePen below:  

HTML

```html
<main>
  <h1>Number Guessing Game</h1>
  <p>Loading...</p>
  <form action="" method="get">
    <fieldset>
      <input type="text" id="guess" maxlength="3" />
      <input type="submit" value="Guess" />
    </fieldset>
  </form>
  <a href="#">New game</a>
</main>
```

CSS

```css
html, body {
  padding: 25px 0;
  margin: 0;
  font: normal 16px Helvetica, Arial, sans-serif;
  text-align: center;
  color: #16997c;
  background: #5bccb3;
}

main {
  display: block;
  max-width: 450px;
  padding: 20px;
  margin: 0 auto;
  background: #ffffff;
  box-sizing: border-box;
}

h1 {
  color: #CC183E;
}

fieldset {
  padding: 0 0 25px 0;
  margin: 0;
  border: none;
}

input[type="text"] {
  width: 80px;
  height: 50px;
  padding: 5px;
  margin: 0 0 20px 0;
  font: normal 24px Georgia, Palatino, serif;
  text-align: center;
  border: 1px solid #cecece;
  box-sizing: border-box;
}

input[type="submit"] {
  display: block;
  width: 100%;
  padding: 15px 0;
  font: normal 20px Helvetica, Arial, sans-serif;
  color: #ffffff;
  text-shadow: 1px 1px 5px rgba(80, 80, 80, .8);
  border: 1px solid #91112C;
  box-shadow: 0 0 1px 1px #780e24;
  border-radius: 11px;
  background: linear-gradient(to bottom, #CC183E 0%, #780E24 100%);
}

a { color: #cc183e; }
```

Here's a breakdown of the steps to take:  

1. Create an event listener that will run when the document's `DOMContentLoaded` event fires. In the subsequent steps, you'll add code to this event listener so that it will run when the page finishes loading.

   ###### My Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', (event) => {
     // add code that will run when the page finishes loading
   });
   ```

   ###### LS Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     // All of your code goes here
   });
   ```

2. Create a local variable named `answer` in the `DOMContentLoaded` listener. Its value should be a randomly generated integer between `1` and `100`, inclusive.

   ###### My Solution

   ```javascript
   let answer = Math.ceil(Math.random() * 100);
   ```

   ###### LS Solution

   ```javascript
   let answer = Math.floor(Math.random() * 100) + 1;
   ```

3. Add an event listener that will run when the user submits the form. It should retrieve the value from the `input` text field and convert it to a number with `parseInt`. Store the number in a local variable named `guess`.  

   The browser shouldn't send the form content to the server; you can prevent it from doing that with `preventDefault`. If you do send the data, the page will refresh after each submission and you'll lose everything!

   ###### My Solution

   ```javascript
   document.querySelector('input[type="submit"]').addEventListener('click', (event) => {
     event.preventDefault();
     let guess = parseInt(document.querySelector('input[type="text"]').value, 10);
   });
   ```

   ###### LS Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     let answer = Math.floor(Math.random() * 100) + 1;
     let input = document.querySelector('#guess');
     let form = document.querySelector('form');
     
     form.addEventListener('submit', event => {
       event.preventDefault();
       let guess = parseInt(input.value, 10);
     });
   });
   ```

4. Create a local variable named `message`. We will use `message` in subsequent problems to store a message that we will show to the user.

   ###### My Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     let answer = Math.ceil(Math.random() * 100);
     let input = document.querySelector('#guess');
     let form = document.querySelector('form');
     let message;
     
     form.addEventListener('submit', event => {
       event.preventDefault();
       let guess = parseInt(input.value, 10);
     });
   });
   ```

   ###### LS Solution

   ```javascript
   form.addEventListener('submit', event => {
     event.preventDefault();
     let guess = parseInt(input.value, 10);
     let message;
   })
   ```

5. Check whether the guess is higher than the answer. If it is, set the `message` variable to a message that says the answer is lower than the guess.

   ###### My Solution

   ```javascript
   form.addEventListener('submit', event => {
     event.preventDefault();
     let guess = parseInt(input.value, 10);
     let message;
   
     if (guess > answer) {
       message = `My number is lower than ${guess}`;
     }
   });
   ```

   ###### LS Solution

   ```javascript
   ...
   
   form.addEventListener('submit', event => {
     event.preventDefault();
     let guess = parseInt(input.value, 10);
     let message;
     
     if (guess > answer) {
       message = `My number is lower than ${String(guess)}`;
     }
   });
   ```

6. Update the code so that it sets `message` to an appropriate value when the answer is higher than the guess, and another message when it is correct.

   ###### My Solution

   ```javascript
   ...
   
   form.addEventListener('submit', event => {
     event.preventDefault();
     let guess = parseInt(input.value, 10);
     let message;
     
     if (guess > answer) {
       message = `My number is lower than ${String(guess)}`;
     } else if (guess < answer) {
       message = `My number is higher than ${String(guess)}`;
     } else {
       message = `You guessed it!`;
     }
   });
   ```

   ###### LS Solution

   ```javascript
   form.addEventListener('submit', event => {
     event.preventDefault();
     let guess = parseInt(input.value, 10);
     let message;
     
     if (guess === answer) {
       message = 'You guessed it!';
     } else if (guess > answer) {
       message = `My number is lower than ${String(guess)}`;
     } else {
       message = `My number is higher than ${String(guess)}`;
     }
   });
   ```

7. Display the message determined by problems 5 and 6 to the page. Find the message element on the page with `querySelector` and set its `textContent` property to the value of `message`.

   ###### My Solution

   ```javascript
   form.addEventListener('submit', event => {
     event.preventDefault();
     let guess = parseInt(input.value, 10);
     let message;
   
     if (guess === answer) {
       message = 'You guessed it!';
     } else if (guess > answer) {
       message = `My number is lower than ${String(guess)}`;
     } else {
       message = `My number is higher than ${String(guess)}`;
     }
   
     document.querySelector('p').textContent = message;
   });
   ```

   ###### LS Solution

   ```javascript
   form.addEventListener('submit', event => {
     event.preventDefault();
     
     let guess = parseInt(input.value, 10);
     let message;
   
     if (guess === answer) {
       message = 'You guessed it!';
     } else if (guess > answer) {
       message = `My number is lower than ${String(guess)}`;
     } else {
       message = `My number is higher than ${String(guess)}`;
     }
   
     let paragraph = document.querySelector('p');
     paragraph.textContent = message;
   });
   ```

8. Add an event listener that fires when the user clicks the "New game" link.

   ###### My Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     ...
     let newGameLink = document.querySelector('a');
     
     ...
     
     newGameLink.addEventListener('click', event => {
       event.preventDefault;
       
     });
   });
   ```

   ###### LS Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     ...
     let link = document.querySelector('a');
     link.addEventListener('click', event => { 
     });
   });
   ```

9. In the event listener for a new game, change the answer to a new random number from 1 to 100, and set the message shown to the user to one that asks the player to guess a number.

   ###### My Solution

   ```javascript
   link.addEventListener('click', event => {
     answer = Math.ceil(Math.random() * 100);
     let message = "Guess a number from 1 to 100";
   
     let paragraph = document.querySelector('p');
     paragraph.textContent = message;
   });
   ```

   ###### LS Solution

   ```javascript
   link.addEventListener('click', event => {
     answer = Math.floor(Math.random() * 100) + 1;
     paragraph.textContent = 'Guess a number from 1 to 100';
   });
   ```

10. In question 9, we assigned the `paragraph` variable's `textContent` property to the message. Will this code work? Why or why not?  

    ###### My Solution

    No, it will not work. It won't work because the `paragraph` variable was declared within a local variable scope that current event listener does not access to. We have to move the declaration of the `paragraph` variable to outside that scope and into the outerscope of the main `DOMContentLoaded` event listener.

    ###### LS Solution

    It won't work. In problem 7, we declared the `paragraph` variable inside the `submit` event handler. Thus, the variable is local to that function, and not available inside the `click` listener.

    Here is a completed version of the problem, slightly refactored to add a `newGame` function and a counter for the number of guesses:

    HTML

    ```html
    <main>
      <h1>Number Guessing Game</h1>
      <p>Loading...</p>
      <form action="" method="get">
        <fieldset>
          <input type="text" id="guess" maxlength="3">
          <input type="submit" value="Guess">
        </fieldset>
      </form>
      <a href="#">New game</a>
    </main>
    ```

    CSS

    ```javascript
    HTML CSS JSResult Skip Results Iframe
    EDIT ON
    html, body {
      padding: 25px 0;
      margin: 0;
      font: normal 16px Helvetica, Arial, sans-serif;
      text-align: center;
      color: #16997c;
      background: #5bccb3;
    }
    
    main {
      display: block;
      max-width: 450px;
      padding: 20px;
      margin: 0 auto;
      background: #ffffff;
      box-sizing: border-box;
    }
    
    h1 {
      color: #CC183E;
    }
    
    fieldset {
      padding: 0 0 25px 0;
      margin: 0;
      border: none;
    }
    
    input[type="text"] {
      width: 80px;
      height: 50px;
      padding: 5px;
      margin: 0 0 20px 0;
      font: normal 24px Georgia, Palatino, serif;
      text-align: center;
      border: 1px solid #cecece;
      box-sizing: border-box;
    }
    
    input[type="submit"] {
      display: block;
      width: 100%;
      padding: 15px 0;
      font: normal 20px Helvetica, Arial, sans-serif;
      color: #ffffff;
      text-shadow: 1px 1px 5px rgba(80, 80, 80, .8);
      border: 1px solid #91112C;
      box-shadow: 0 0 1px 1px #780e24;
      border-radius: 11px;
      background: linear-gradient(to bottom, #CC183E 0%, #780E24 100%);
    }
    
    a { color: #cc183e; }
    ```

    JavaScript

    ```javascript
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
      }
      
      form.addEventListener('submit', event => {
        event.preventDefault();
    
        let guess = parseInt(input.value, 10);
        let message;
    
        guesses += 1;
        
        if (guess === answer) {
          message = `You guessed it! It took you ${guesses} guesses.`;
        } else if (guess > answer) {
          message = `My number is lower than ${guess}`;
        } else {
          message = `My number is higher than ${guess}`;
        }
        
        paragraph.textContent = message;
      });
    
      link.addEventListener('click', event => {
        event.preventDefault();
        newGame();
      });
      
      newGame();
    });
    ```

    You can use this version as the starting point for the bonus question.

11. **Bonus Question** If you want an extra challenge, add the following features:

    1. Check whether the input value is a valid integer; display an appropriate message if it is not.

       ###### My Solution

       We can implement this feature by modifying the `submit` event listener:

       ```javascript
       form.addEventListener('submit', event => {
         event.preventDefault();
         let message;
         let guess = parseInt(input.value, 10);
       
         if (typeof guess === 'number' && Math.floor(guess) === Math.ceil(guess) && guess <= 100 && guess > 0) {
           guesses += 1;
       
           if (guess === answer) {
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
       ```

    2. Disable the `Guess` button once the user guesses the number. (You may need to use MDN to find out how to do this.) When you disable the box, it should also change to a dimmer color (your choice) and take on a flatter appearance (use the `box-shadow` property).

       ```javascript
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
       ```

       ###### LS Solution

       HTML

       ```html
       <main>
         <h1>Number Guessing Game</h1>
         <p>Loading...</p>
         <form action="" method="get">
           <fieldset>
             <input type="text" id="guess" maxlength="3">
             <input type="submit" value="Guess">
           </fieldset>
         </form>
         <a href="#">New game</a>
       </main>
       ```

       CSS

       ```css
       html, body {
         padding: 25px 0;
         margin: 0;
         font: normal 16px Helvetica, Arial, sans-serif;
         text-align: center;
         color: #16997c;
         background: #5bccb3;
       }
       
       main {
         display: block;
         max-width: 450px;
         padding: 20px;
         margin: 0 auto;
         background: #ffffff;
         box-sizing: border-box;
       }
       
       h1 {
         color: #CC183E;
       }
       
       fieldset {
         padding: 0 0 25px 0;
         margin: 0;
         border: none;
       }
       
       input[type="text"] {
         width: 80px;
         height: 50px;
         padding: 5px;
         margin: 0 0 20px 0;
         font: normal 24px Georgia, Palatino, serif;
         text-align: center;
         border: 1px solid #cecece;
         box-sizing: border-box;
       }
       
       input[type="submit"] {
         display: block;
         width: 100%;
         padding: 15px 0;
         font: normal 20px Helvetica, Arial, sans-serif;
         color: #ffffff;
         text-shadow: 1px 1px 5px rgba(80, 80, 80, .8);
         border: 1px solid #91112C;
         box-shadow: 0 0 1px 1px #780e24;
         border-radius: 11px;
         background: linear-gradient(to bottom, #CC183E 0%, #780E24 100%);
       }
       
       a { color: #cc183e; }
       ```

       JavaScript

       ```javascript
       document.addEventListener('DOMContentLoaded', function() {
         let form = document.querySelector('form');
         let input = document.querySelector('#guess');
         let paragraph = document.querySelector('p');
         let guessBtn = document.querySelector('[type="submit"]');
         let link = document.querySelector('a');
         let answer;
         let guesses;
         
         function newGame() {
           guessBtn.disabled = false;
           form.reset();
           answer = Math.floor(Math.random() * 100) + 1;
           guesses = 0;
           paragraph.textContent = 'Guess a number from 1 to 100';
         }
         
         form.addEventListener('submit', event => {
           event.preventDefault();
       
           let guess = parseInt(input.value, 10);
           let message;
       
           guesses += 1;
           
            if (Number.isNaN(guess)) {
              message = 'Please enter a number';
            } else {
              if (guess === answer) {
              message = `You guessed it! It took you ${guesses} guesses.`;
              guessBtn.disabled = true;
            } else if (guess > answer) {
              message = `My number is lower than ${guess}`;
            } else {
              message = `My number is higher than ${guess}`;
            }  
          }
           
          paragraph.textContent = message;
         });
       
         link.addEventListener('click', event => {
           event.preventDefault();
           newGame();
         });
         
         newGame();
       });
       ```

       

     