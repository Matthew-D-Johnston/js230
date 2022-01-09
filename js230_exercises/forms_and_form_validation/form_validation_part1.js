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
  app.validateAllOnSubmission();
  app.validateAll();
});
