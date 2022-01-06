###### JS230 — Front-end Development with JavaScript > Miscellaneous GUI Apps

---

## A JavaScript Calculator

Build A GUI standard calculator with the following specifications:  

#### Specifications

**Calculator screen**

The calculator should have a screen like a standard calculator. The screen should have two parts:

1. A lower part—the entry window—that shows the current entry: the number you are entering or the most recent result.
2. An upper part—the operation window—that shows the operation in progress, e.g., `1 + 5 / 2 +`.

**Calculator buttons**

The calculator should have functioning buttons for the following:

- All digits: 0-9
- `+`, `-`, `/`, `*`, `%`, `=`, `NEG`, `C`, `CE`
- The `NEG` button negates the value in the entry window.
- The `CE` button clears the entry window and replaces it with 0.
- The `C` button clears both the entry and operation windows and leaves a value of `0` in the entry window.

**Operations**

- When the user clicks a digit button, append the digit to the number in the entry window. If the value in the entry window is `0`, replace the `0` with the entered digit.
- When the user clicks an operator button, copy the current entry and the operator into the operation window. You can leave the current entry in the entry window or set it to `0`, but, either way, the next digit entered should begin a new number.
- When the user clicks the `=` button, use the current operation and the current entry to calculate the final result. Clear the current operation window and display the result in the entry window.

You can see our demo app [here](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/08_calculator/index.html).  

Note: The `%` is the modulo operator.  

#### My Solution

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Calculator</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="javascript_calculator.css">
    <script src="javascript_calculator.js"></script>
  </head>
  <body>
    <div id="calculator">
      <div class="display">
        <p class="stack"></p>
        <p class="register">0</p>
      </div>
      <div class="buttons">
        <button id="ce" type="button">CE</button>
        <button id ="c" type="button">C</button>
        <button id="neg" type="button">NEG</button>
        <button id="divide" type="button">/</button>
        <button id="7" type="button">7</button>
        <button id="8" type="button">8</button>
        <button id="9" type="button">9</button>
        <button id="multiply" type="button">x</button>
        <button id="4" type="button">4</button>
        <button id="5" type="button">5</button>
        <button id="6" type="button">6</button>
        <button id="subtract" type="button">-</button>
        <button id="1" type="button">1</button>
        <button id="2" type="button">2</button>
        <button id="3" type="button">3</button>
        <button id="add" type="button">+</button>
        <button id="0" type="button">0</button>
        <button id="decimal" type="button">.</button>
        <button id="modulo" type="button">%</button>
        <button id="equal" type="button">=</button>
      </div>
    </div>
  </body>
</html>
```

###### CSS

```css
@import url("whitespace-reset.css");

body {
  background: #22596E;
  padding-top: 50px;
}

div#calculator {
  margin: auto;
  width: 350px;
  height: 420px;
  background: #fff;
  border-radius: 4px;
}

div.display {
  height: 125px;
  border-bottom: 1px solid #CCCCCC;
  margin-right: 5px;
  margin-left: 5px;
  justify-items: right;
}

p.stack {
  display: block;
  position: relative;
  box-sizing: border-box;
  top: 35px;
  right: 12px;
  padding-left: 20px;
  text-align: right;
  height: 70px;
  width: 100%;
}

p.register {
  display: block;
  text-align: right;
  font-size: 38px;
  padding-right: 10px;
}

div.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px 5px;
  box-sizing: border-box;
  margin-top: 15px;
  justify-content: center;
}

button {
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
  width: 23%;
  height: 50px;
  background: #CCCCCC;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
```

###### JavaScript

```javascript
"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let stack = document.querySelector('p.stack');
  let register = document.querySelector('p.register');
  let oldOperator = '';
  let newOperator = '';
  let stackTally = null;

  document.querySelector('div.buttons').addEventListener('click', event => {
    let target = event.target;
    
    if (target.tagName === 'BUTTON') {
      let buttonId = target.id;

      if (buttonId === 'ce') {
        clearRegister();
      }

      if (buttonId === 'c') {
        clearRegister();
        clearStack();
        stackTally = null;
        oldOperator = '';
        newOperator = '';
      }

      if (buttonId === 'neg' && register.innerText !== '0') {
        register.innerText = '-' + register.innerText;
      }

      if (['add', 'subtract', 'multiply', 'divide', 'modulo'].includes(buttonId)) {
        setOperator(buttonId);
        stack.innerText = stack.innerText + ' ' + register.innerText + ' ' + newOperator;

        if (stackTally === null) {
          stackTally = Number(register.innerText);
        } else {
          updateRegister(oldOperator, Number(register.innerText));
        }

        oldOperator = newOperator;
      }

      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(buttonId)) {
        if (register.innerText === '0' || newOperator !== '') {
          register.innerText = buttonId;
          setOperator('');
        } else {
          register.innerText = register.innerText + buttonId;
        }
      }

      if (buttonId === 'equal') {
        updateRegister(oldOperator, Number(register.innerText));
        clearStack();
        stackTally = null;
        oldOperator = '';
        newOperator = '';
      }

      if (buttonId === 'decimal') {
        if (!register.innerText.match(/\./g)) {
          register.innerText = register.innerText + '.';
        }
      }
    }
  });

  function updateRegister(operation, value) {
    switch (operation) {
      case '+':
        stackTally += value;
        break;
      case '-':
        stackTally -= value;
        break;
      case 'x':
        stackTally *= value;
        break;
      case '/':
        stackTally /= value;
        break;
      case '%':
        stackTally %= value;
        break;
    }

    register.innerText = stackTally;
  }


  function setOperator(id) {
    switch (id) {
      case 'add':
        newOperator = '+';
        break;
      case 'subtract':
        newOperator = '-';
        break;
      case 'multiply':
        newOperator = 'x';
        break;
      case 'divide':
        newOperator = '/';
        break;
      case 'modulo':
        newOperator = '%';
        break;
      default:
        newOperator = '';
    }

    return newOperator;
  }

  function clearStack() {
    stack.innerText = '';
  }

  function clearRegister() {
    register.innerText = '0';
  }
});
```

