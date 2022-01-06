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
