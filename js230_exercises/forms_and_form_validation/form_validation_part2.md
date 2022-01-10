###### JS230 — Front-end Development with JavaScript > Forms and Form Validation

---

## Form Validation, Part 2: Character Blocking Input

The previous exercise is a first good step at validating user input. Let's enhance it a bit:  

- The first and last names aren't validated properly: the user can use numbers in their name. With our current validation rules, the user can get away with using numbers as names. Don't let the user enter invalid characters in these fields.  
- Solicit a credit card number as four hyphen-separated 4-digit numbers.  

#### Specifications

- Use the pattern `a-zA-Z'\s` to validate user input for first and last names. Use the `keypress` event to prevent the user from entering a character that doesn't match the pattern.
- Add a credit card field to the form. The field should use 4 inputs, all with the same `name` attribute.
- Each credit card input should have a maximum length of 4 characters.
- Each credit card input should only allow numeric digits.
- The phone number input should only allow numeric digits.
- Use the `keypress` event to prevent the user from entering non-numeric characters in the credit card inputs.

You can see the demo app [here](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/forms/02_form_validation_2/index.html).  

#### My Solution

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Form Validation</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="form_validation_part2.css">
    <script src="form_validation_part2.js"></script>
  </head>
  <body>
    <div>
    <h1>Sign up Form</h1>
    <form novalidate>
      <p class="main-error">Form cannot be submitted until errors are corrected.</p>
      <fieldset>
        <dl>
          <dt>
            <label for="first-name">First Name</label>
          </dt>
          <dd>
            <input type="text" id="first-name" name="first-name" pattern="a-zA-Z'\s" required>
            <p class="error-message"></p>
          </dd>
          <dt>
            <label for="last-name">Last Name</label>
          </dt>
          <dd>
            <input type="text" id="last-name" name="last-name" pattern="a-zA-Z'\s" required>
            <p class="error-message"></p>
          </dd>
          <dt>
            <label for="email">Email</label>
          </dt>
          <dd>
            <input type="email" id="email" name="email" placeholder="someone@example.com" pattern=".+@.+" required>
            <p class="error-message"></p>
          </dd>
          <dt>
            <label for="password">Password</label>
          </dt>
          <dd>
            <input type="password" id="password" name="password" minlength="10" required>
            <p class="error-message"></p>
          </dd>
          <dt>
            <label for="phone">Phone Number</label>
          </dt>
          <dd>
            <input type="text" id="phone" name="phone" placeholder="111-222-3333" pattern="\d{3}-\d{3}-\d{4}">
            <p class="error-message"></p>
          </dd>
          <dt>
            <label for="credit1">Credit Card</label>
          </dt>
          <dd>
            <input type="text" id="credit1" name="credit" maxlength="4" pattern="\d{4}"> -
            <input type="text" id="credit2" name="credit" maxlength="4" pattern="\d{4}"> -
            <input type="text" id="credit3" name="credit" maxlength="4" pattern="\d{4}"> -
            <input type="text" id="credit4" name="credit" maxlength="4" pattern="\d{4}">
          </dd>
        </dl>
      </fieldset>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  </body>
</html>
```

###### CSS

```css
@import url("whitespace-reset.css");

body {
  background: #53BE42;
}

div {
  display: block;
  margin: auto;
  width: 800px;
}

h1 {
  margin: 60px 0 20px 0;
  font-size: 26px;
  color: #fff;
}

form {
  background: #fff;
  border-radius: 4px;
  width: 100%;
  height: 580px;
}

fieldset {
  border: none;
  margin-left: 25px;
  padding-top: 40px;
}

dt {
  font-size: 18px;
}

dd {
  margin: 5px 0 20px 0;
}

input {
  display: inline-block;
  font-size: 18px;
  height: 35px;
  width: 300px;
  border-radius: 5px;
  border: none;
  outline: 1px solid #CCCCCC;
  padding-left: 10px;
}

input.invalid {
  outline: 1px solid #B65252;
}

input:focus {
  outline: 1px solid #53BE42;
}

input:focus:valid {
  outline: 1px solid #53BE42;
}

input[name="credit"] {
  width: 60px;
}

button {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  width: 100px;
  height: 30px;
  border-radius: 4px;
  margin-left: 25px;
  background-color: #53BE42;
  border: none;
}

.error-message {
  display: inline-block;
  position: absolute;
  margin-top: 5px;
  margin-left: 30px;
  color: #B65252;
  font-size: 18px;
}

.main-error {
  visibility: hidden;
  display: inline-block;
  position: absolute;
  color: #B65252;
  font-size: 18px;
  margin: 10px 0 0 25px;
}
```

###### JavaScript

```javascript
"use strict";

let App = {
  isFirstNameValid: function() {
    return !this.firstNameInput.validity.valueMissing;
  },

  isLastNameValid: function() {
    return !this.lastNameInput.validity.valueMissing;
  },

  isEmailValid: function() {
    return !this.emailInput.validity.valueMissing && !this.emailInput.validity.patternMismatch;
  },

  isPasswordValid: function() {
    return !this.passwordInput.validity.valueMissing && !this.passwordInput.validity.tooShort;
  },

  isPhoneNumberValid: function() {
    return !this.phoneInput.validity.patternMismatch;
  },

  displayFirstNameErrorMessage: function() {
    let firstNameErrorElement = this.firstNameInput.nextElementSibling;
    firstNameErrorElement.innerText = 'First name is a required field.';
    this.firstNameInput.classList.add('invalid');
  },

  displayLastNameErrorMessage: function() {
    let lastNameErrorElement = this.lastNameInput.nextElementSibling;
    lastNameErrorElement.innerText = 'Last name is a required field.';
    this.lastNameInput.classList.add('invalid');
  },

  displayEmailErrorMessage: function() {
    this.emailInput.classList.add('invalid');
    let emailErrorElement = this.emailInput.nextElementSibling;

    if (this.emailInput.validity.valueMissing) {
      emailErrorElement.innerText = 'Email is a required field.';
    } else {
      emailErrorElement.innerText = 'Please enter a valid email.';
    }    
  },

  displayPasswordErrorMessage: function() {
    this.passwordInput.classList.add('invalid');
    let passwordErrorElement = this.passwordInput.nextElementSibling;

    if (this.passwordInput.validity.valueMissing) {
      passwordErrorElement.innerText = 'Password is a required field.';
    } else {
      passwordErrorElement.innerText = 'Password must be at least 10 characters long.';
    }    
  },

  displayPhoneNumberErrorMessage: function() {
    let phoneErrorElement = this.phoneInput.nextElementSibling;
    phoneErrorElement.innerText = 'Please enter a valid phone number.';
    this.phoneInput.classList.add('invalid');
  },

  removeFirstNameErrorMessage: function() {
    let firstNameErrorElement = this.firstNameInput.nextElementSibling;
    firstNameErrorElement.innerText = '';
    this.firstNameInput.classList.remove('invalid');
  },

  removeLastNameErrorMessage: function() {
    let lastNameErrorElement = this.lastNameInput.nextElementSibling;
    lastNameErrorElement.innerText = '';
    this.lastNameInput.classList.remove('invalid');
  },

  removeEmailErrorMessage: function() {
    let emailErrorElement = this.emailInput.nextElementSibling;
    emailErrorElement.innerText = '';
    this.emailInput.classList.remove('invalid');
  },

  removePasswordErrorMessage: function() {
    let passwordErrorElement = this.passwordInput.nextElementSibling;
    passwordErrorElement.innerText = '';
    this.passwordInput.classList.remove('invalid');
  },

  removePhoneNumberErrorMessage: function() {
    let phoneErrorElement = this.phoneInput.nextElementSibling;
    phoneErrorElement.innerText = '';
    this.phoneInput.classList.remove('invalid');
  },

  validateFirstNameInput: function() {
    this.firstNameInput.addEventListener('blur', () => {
      if (!this.isFirstNameValid()) {
        this.displayFirstNameErrorMessage();
      }
    });

    this.firstNameInput.addEventListener('focus', () => {
      this.removeFirstNameErrorMessage();
    });

    this.firstNameInput.addEventListener('keypress', event => {
      if (!event.key.match(/[a-zA-Z'\s]/)) {
        event.preventDefault();
      }
    });
  },

  validateLastNameInput: function() {
    this.lastNameInput.addEventListener('blur', () => {
      if (!this.isLastNameValid()) {
        this.displayLastNameErrorMessage();
      }
    });

    this.lastNameInput.addEventListener('focus', () => {
      this.removeLastNameErrorMessage();
    });

    this.lastNameInput.addEventListener('keypress', event => {
      if (!event.key.match(/[a-zA-Z'\s]/)) {
        event.preventDefault();
      }
    });
  },

  validateEmailInput: function() {
    this.emailInput.addEventListener('blur', () => {
      if (!this.isEmailValid()) {
        this.displayEmailErrorMessage();
      }
    });

    this.emailInput.addEventListener('focus', () => {
      this.removeEmailErrorMessage();
    });
  },

  validatePasswordInput: function() {
    this.passwordInput.addEventListener('blur', () => {
      if (!this.isPasswordValid()) {
        this.displayPasswordErrorMessage();
      }
    });

    this.passwordInput.addEventListener('focus', () => {
      this.removePasswordErrorMessage();
    });
  },

  validatePhoneNumberInput: function() {
    this.phoneInput.addEventListener('blur', () => {
      if (!this.isPhoneNumberValid()) {
        this.displayPhoneNumberErrorMessage();
      }
    });

    this.phoneInput.addEventListener('focus', () => {
      this.removePhoneNumberErrorMessage();
    });

    this.phoneInput.addEventListener('keypress', event => {
      if (!event.key.match(/[0-9\-]/)) {
        event.preventDefault();
      }
    });
  },

  validateCreditCardInput: function() {
    let credit1 = document.getElementById('credit1');
    let credit2 = document.getElementById('credit2');
    let credit3 = document.getElementById('credit3');
    let credit4 = document.getElementById('credit4');

    [credit1, credit2, credit3, credit4].forEach(creditInput => {
      creditInput.addEventListener('keypress', event => {
        if (!event.key.match(/[0-9]/)) {
          event.preventDefault();
        }
      });
    });
  },

  validateAllOnSubmission() {
    document.querySelector('button').addEventListener('click', event => {
      event.preventDefault();

      let atLeastOneError = false;

      if (!this.isFirstNameValid()) {
        this.displayFirstNameErrorMessage();
        atLeastOneError = true;
      }

      if (!this.isLastNameValid()) {
        this.displayLastNameErrorMessage();
        atLeastOneError = true;
      }

      if (!this.isEmailValid()) {
        this.displayEmailErrorMessage();
        atLeastOneError = true;
      }

      if (!this.isPasswordValid()) {
        this.displayPasswordErrorMessage();
        atLeastOneError = true;
      }

      if (!this.isPhoneNumberValid()) {
        this.displayPhoneNumberErrorMessage();
        atLeastOneError = true;
      }

      if (atLeastOneError) {
        document.querySelector('.main-error').style.visibility = 'visible';
      }
    });
  },

  validateAll: function() {    
    this.firstNameInput.addEventListener('blur', () => {
      let atLeastOneError = false;

      if (!this.isFirstNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isLastNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isEmailValid()) {
        atLeastOneError = true;
      }

      if (!this.isPasswordValid()) {
        atLeastOneError = true;
      }

      if (!this.isPhoneNumberValid()) {
        atLeastOneError = true;
      }

      if (!atLeastOneError) {
        document.querySelector('.main-error').style.visibility = 'hidden';
      }
    });

    this.lastNameInput.addEventListener('blur', () => {
      let atLeastOneError = false;

      if (!this.isFirstNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isLastNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isEmailValid()) {
        atLeastOneError = true;
      }

      if (!this.isPasswordValid()) {
        atLeastOneError = true;
      }

      if (!this.isPhoneNumberValid()) {
        atLeastOneError = true;
      }

      if (!atLeastOneError) {
        document.querySelector('.main-error').style.visibility = 'hidden';
      }
    });

    this.emailInput.addEventListener('blur', () => {
      let atLeastOneError = false;

      if (!this.isFirstNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isLastNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isEmailValid()) {
        atLeastOneError = true;
      }

      if (!this.isPasswordValid()) {
        atLeastOneError = true;
      }

      if (!this.isPhoneNumberValid()) {
        atLeastOneError = true;
      }

      if (!atLeastOneError) {
        document.querySelector('.main-error').style.visibility = 'hidden';
      }
    });

    this.passwordInput.addEventListener('blur', () => {
      let atLeastOneError = false;

      if (!this.isFirstNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isLastNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isEmailValid()) {
        atLeastOneError = true;
      }

      if (!this.isPasswordValid()) {
        atLeastOneError = true;
      }

      if (!this.isPhoneNumberValid()) {
        atLeastOneError = true;
      }

      if (!atLeastOneError) {
        document.querySelector('.main-error').style.visibility = 'hidden';
      }
    });

    this.phoneInput.addEventListener('blur', () => {
      let atLeastOneError = false;

      if (!this.isFirstNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isLastNameValid()) {
        atLeastOneError = true;
      }

      if (!this.isEmailValid()) {
        atLeastOneError = true;
      }

      if (!this.isPasswordValid()) {
        atLeastOneError = true;
      }

      if (!this.isPhoneNumberValid()) {
        atLeastOneError = true;
      }

      if (!atLeastOneError) {
        document.querySelector('.main-error').style.visibility = 'hidden';
      }
    });
  },
  
  init: function() {
    this.firstNameInput = document.getElementById('first-name');
    this.lastNameInput = document.getElementById('last-name');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.phoneInput = document.getElementById('phone');
    return this;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let app = App.init();

  app.validateFirstNameInput();
  app.validateLastNameInput();
  app.validateEmailInput();
  app.validatePasswordInput();
  app.validatePhoneNumberInput();
  app.validateCreditCardInput();
  app.validateAllOnSubmission();
  app.validateAll();
});
```

