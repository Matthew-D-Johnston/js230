###### JS230 DOM and Asynchronous Programming with JavaScript > Putting it All Together

---

## Assignment: Arithmetic Calculator

Let's build a simple arithmetic calculator. It will have two inputs for numbers, a selection list that controls which arithmetic operation the calculator performs, and a button that performs the calculation. It will display the result above the inputs. This assignment combines your ability to interact with the DOM with your understanding of event listeners.  

You can watch an overview of the completed project below:

<video id="video_e7db2acf3066_html5_api" class="vjs-tech" poster="https://launchschool.com/assets/tealeaf_markup/video_poster.jpg" preload="none" src="https://d3905n0khyu9wc.cloudfront.net/videos/output/arithmetic_calculator_overview_a5f364_s91/arithmetic_calculator_overview_a5f364_s91.mp4" style="box-sizing: inherit; display: inline-block; position: absolute; top: 0px; left: 0px; width: 864px; height: 486px;"></video>

Play

Mute

Loaded: 0%

Progress: 0%

Remaining Time-0:00

Playback Rate

1x

Captions

Fullscreen







Since this project isn't too concerned about the HTML and CSS components, you can use the starter code from [this archive](https://d3905n0khyu9wc.cloudfront.net/arithmetic_calculator/arithmetic_calculator_20200829.zip). You will need to edit the HTML to load your JavaScript code.  

If you prefer, you can write your own HTML and CSS. Feel free to spend time making it look professional or just slap something together. The focus of this project is JavaScript, so everything else is optional.  

You may use jQuery or any other library you want. However, you can easily build this project with vanilla JavaScript and the DOM API. Our version doesn't use any libraries.  

---

### Problem

Let's build a simple arithmetic calculator. It will have two inputs for numbers, a selection list that controls which arithmetic operation the calculator performs, and a button that performs the calculation. It will display the result above the inputs. This assignment combines your ability to interact with the DOM with your understanding of event listeners.  

**Inputs**

* two numbers
* an arithmetic symbol corresponding to an arithmetic operation

**Outputs**

* the result of the arithmetic operation

---

### Examples / Test Cases



---

### Data Structure





---

### Algorithm

**Steps:**

* User must input a number in each of the input fields and select an arithmetic operation from the select field.
* They then hit the "=" submit button.
  * We thus need an event listener on this submit button.



---

### Code

###### HTML (given)

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Calculator</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="stylesheets/style.css" />
    <script src="javascripts/calculator.js"></script>
  </head>

  <body>
    <main>
      <h1 id="result">0</h1>

      <form action="" method="post">
        <fieldset>
          <input
            type="number"
            name="first-number"
            id="first-number"
            value="0"
          />
          <select name="operator" id="operator">
            <option>+</option>
            <option>-</option>
            <option>*</option>
            <option>/</option>
          </select>
          <input
            type="number"
            name="second-number"
            id="second-number"
            value="0"
          />
          <input type="submit" value="=" />
        </fieldset>
      </form>
    </main>
  </body>
</html>
```

###### JavaScript

```javascript
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
```

