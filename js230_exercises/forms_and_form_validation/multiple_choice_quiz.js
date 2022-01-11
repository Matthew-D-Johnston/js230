"use strict";

const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

let Quiz = {
  questions: null,
  answerKey: null,
  responses: {},
  responseMessages: {},

  renderQuizQuestions: function() {
    let quizTemplate = Handlebars.compile(document.getElementById('quiz-template').innerHTML);
    let questionList = document.getElementById('question-list');
    questionList.innerHTML = quizTemplate({ questions: this.questions });

    let questionULs = document.querySelectorAll('ul');

    for (let index = 0; index < questionULs.length; index += 1) {
      let questionOptionLIs = questionULs[index].querySelectorAll('li');

      for (let innerIndex = 0; innerIndex < questionOptionLIs.length; innerIndex += 1) {
        let input = questionOptionLIs[innerIndex].querySelector('input');
        let label = questionOptionLIs[innerIndex].querySelector('label');
        input.id = `question${index + 1}option${innerIndex + 1}`;
        input.name =`question${index + 1}`;
        label.setAttribute('for', `question${index + 1}option${innerIndex + 1}`);
      }
    }
  },

  renderQuizResponses: function() {
    let form = document.querySelector('form');

    form.addEventListener('submit', event => {
      event.preventDefault();

      let formData = new FormData(form);

      for (let pair of formData.entries()) {
        this.responses[pair[0].replace('question', '')] = pair[1];
      }

      this.collectResponseMessages();
      
      let numberOfMessages = Object.keys(this.responseMessages).length;

      for (let index = 1; index <= numberOfMessages; index += 1) {
        let messageElement = document.getElementById(`answer${index}`);
        messageElement.innerText = this.responseMessages[index];
        messageElement.style.visibility = 'visible';
        if (this.responseMessages[index] === 'Correct Answer') {
          messageElement.classList.add('correct');
        } else {
          messageElement.classList.add('incorrect');
        }
      }

      document.getElementById('submit').setAttribute('disabled', 'disabled');
      document.getElementById('reset').classList.add('enabled');
    });
  },

  collectResponseMessages: function() {
    let numberOfAnswers = Object.keys(this.answerKey).length;

    for (let index = 1; index <= numberOfAnswers; index += 1) {
      if (this.responses[index] === undefined) {
        this.responseMessages[index] = `You did not answer this question. Correct answer is: "${this.answerKey[index]}".`
      } else if (this.responses[index] === this.answerKey[index]) {
        this.responseMessages[index] = "Correct Answer";
      } else {
        this.responseMessages[index] = `Wrong Answer. The correct answer is: "${this.answerKey[index]}".`
      }
    }
  },

  resetQuiz: function() {
    document.querySelector('form').addEventListener('reset', () => {
      this.responses = {};
      this.responseMessages = {};
  
      let responseMessagePs = document.querySelectorAll('p.answer');
  
      for (let index = 0; index < responseMessagePs.length; index += 1) {
        let pElement = responseMessagePs[index];
        pElement.innerText = '';
        pElement.classList.remove('correct');
        pElement.classList.remove('incorrect');
        pElement.style.visibility = "hidden";
      }
  
      document.getElementById('submit').removeAttribute('disabled');
      document.getElementById('reset').classList.remove('enabled');
    });
  },

  init: function(questions, answerKey) {
    this.questions = questions;
    this.answerKey = answerKey;
    return this;
  },
}

document.addEventListener('DOMContentLoaded', () => {
  let newQuiz = Object.create(Quiz).init(questions, answerKey);
  
  newQuiz.renderQuizQuestions();
  newQuiz.renderQuizResponses();
  newQuiz.resetQuiz();
});
