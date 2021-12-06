"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let submit = document.querySelector('input[type=submit]');
  let form = document.querySelector('form');
  let result = document.getElementById('result');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let firstNumber = Number(formData.get('first-number'));
    let secondNumber = Number(formData.get('second-number'));
    let operator = formData.get('operator');

    switch (operator) {
      case '+':
        result.innerText = firstNumber + secondNumber;
        break;
      case '-':
        result.innerText = firstNumber - secondNumber;
        break;
      case '*':
        result.innerText = firstNumber * secondNumber;
        break;
      case '/':
        result.innerText = firstNumber / secondNumber;
        break;
    }
  });
});
