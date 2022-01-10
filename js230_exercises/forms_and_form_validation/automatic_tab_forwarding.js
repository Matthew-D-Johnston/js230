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

  isCreditCardValid: function() {
    let isValid = true;

    [this.creditInput1, this.creditInput2, this.creditInput3, this.creditInput4].forEach(creditInput => {
      if (creditInput.validity.tooShort) {
        isValid = false;
      }
    });

    return isValid;
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

  displayCreditCardErrorMessage: function() {
    let creditCardErrorElement = this.creditInput4.nextElementSibling;
    creditCardErrorElement.innerText = 'Please enter a valid credit card.';

    [this.creditInput1, this.creditInput2, this.creditInput3, this.creditInput4].forEach(creditInput => {
      if (creditInput.validity.tooShort) {
        creditInput.classList.add('invalid');
      }
    });
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

  removeCreditCardErrorMessage: function() {
    let creditCardErrorElement = this.creditInput4.nextElementSibling;
    creditCardErrorElement.innerText = '';
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
    [this.creditInput1, this.creditInput2, this.creditInput3, this.creditInput4].forEach(creditInput => {
      creditInput.addEventListener('keypress', event => {
        if (!event.key.match(/[0-9]/)) {
          event.preventDefault();
        }
      });
    });

    [this.creditInput1, this.creditInput2, this.creditInput3, this.creditInput4].forEach(creditInput => {
      creditInput.addEventListener('blur', () => {
        if (!this.isCreditCardValid()) {
          this.displayCreditCardErrorMessage();
        }

        if (!creditInput.validity.tooShort) {
          creditInput.classList.remove('invalid');
        }

        if (!this.creditInput1.validity.tooShort && !this.creditInput2.validity.tooShort && !this.creditInput3.validity.tooShort && !this.creditInput4.validity.tooShort) {
          this.removeCreditCardErrorMessage();
        }
      });
    });

    [this.creditInput1, this.creditInput2, this.creditInput3, this.creditInput4].forEach(creditInput => {
      creditInput.addEventListener('focus', () => {
        if (!creditInput.validity.tooShort) {
          creditInput.classList.remove('invalid');
        }

        if (!this.creditInput1.validity.tooShort && !this.creditInput2.validity.tooShort && !this.creditInput3.validity.tooShort && !this.creditInput4.validity.tooShort) {
          this.removeCreditCardErrorMessage();
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

  creditCardTabForwarding: function() {
    this.creditInput1.addEventListener('keyup', () => {
      if (this.creditInput1.value.length === 4) {
        this.creditInput2.focus();
      }
    });

    this.creditInput2.addEventListener('keyup', () => {
      if (this.creditInput2.value.length === 4) {
        this.creditInput3.focus();
      }
    });

    this.creditInput3.addEventListener('keyup', () => {
      if (this.creditInput3.value.length === 4) {
        this.creditInput4.focus();
      }
    });
  },
  
  init: function() {
    this.firstNameInput = document.getElementById('first-name');
    this.lastNameInput = document.getElementById('last-name');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.phoneInput = document.getElementById('phone');
    this.creditInput1 = document.getElementById('credit1');
    this.creditInput2 = document.getElementById('credit2');
    this.creditInput3 = document.getElementById('credit3');
    this.creditInput4 = document.getElementById('credit4');
    return this;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let app = App.init();

  app.creditCardTabForwarding();
  app.validateFirstNameInput();
  app.validateLastNameInput();
  app.validateEmailInput();
  app.validatePasswordInput();
  app.validatePhoneNumberInput();
  app.validateCreditCardInput();
  app.validateAllOnSubmission();
  app.validateAll();
});
