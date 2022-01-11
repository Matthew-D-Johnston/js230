###### JS230 — Front-end Development with JavaScript > Forms and Form Validation

---

## Multiple Choice Quiz

For this project, build a multiple choice quiz application that uses an answer key to mark questions right or wrong.  

#### Specifications

- You can use the question collection shown below or a collection of your choice.
- Render the question collection to the page. Each question should let the user select a radio button to choose one of four possible answers.
- Add a Submit and Reset button.
- When the user clicks the submit button, mark each question as correct, wrong, or unanswered.
- When the user supplies a correct answer, display a "Correct Answer" message beneath the radio buttons for that question.
- When the user supplies an incorrect answer or fails to answer the question, display an appropriate error message and the correct answer beneath the radio buttons for that question.
- Disable the Submit button after the user submits the quiz.
- When the user clicks the Reset button, clear all selected radio buttons and messages and enable the Submit button.

#### Data

You can choose questions that interest you personally. We use the following question collection in the demo app. Don't worry if you don't follow the references in these questions. The questions refer to the book *The Hitchhiker's Guide to the Galaxy* by Douglas Adams. Highly recommended if you have the time for recreational reading!  

```javascript
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
```

You can see our demo app [here](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/forms/05_multiple_choice_quiz/index.html).  

#### My Solution

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Multiple Choice Quiz</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="multiple_choice_quiz.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js" integrity="sha512-RNLkV3d+aLtfcpEyFG8jRbnWHxUqVZozacROI4J2F1sTaDqo1dPQYs01OMi1t1w9Y2FdbSCDSQ2ZVdAC8bzgAg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="multiple_choice_quiz.js"></script>
  </head>
  <body>
    <div id="quiz">
      <h1>Multiple Choice Quiz</h1>
      <form>
        <fieldset>
          <dl id="question-list">
          </dl>
        </fieldset>
        <button id="submit" type="submit">Submit Quiz</button>
        <button id="reset" type="reset">Reset</button>
      </form>
    </div>
    <script id="quiz-template" type="text/x-handlebars">
      {{#each questions}}
      <dt>Q{{id}}. {{{description}}}</dt>
      <dd>
        <ul>
          {{#each options as |option|}}
          <li>
            <input type="radio" id="option1" name="question" value="{{option}}">
            <label for="option1">{{option}}</label>
          </li>
          {{/each}}
        </ul>
        <p id="answer{{id}}" class="answer"></p>
      </dd>
      {{/each}}
    </script>
  </body>
</html>
```

###### CSS

```css
@import url("whitespace-reset.css");

body {
  background: #EEE9CE;
}

div#quiz {
  display: block;
  margin: auto;
  width: 600px;
}

h1 {
  font-size: 24px;
  margin: 20px 0 30px 0;
}

dl {
  font-size: 18px;
}

dt {
  margin-bottom: 10px;
}

dd {
  margin-bottom: 50px;
}

li {
  margin-bottom: 8px;
}

p.answer {
  visibility: hidden;
  position: absolute;
  box-sizing: border-box;
  width: 600px;
  height: 35px;
  padding: 5px 0 0 5px;
  border: 1px solid;
}

p.correct {
  visibility: visible;
  border-color: #017F02;
}

p.incorrect {
  visibility: visible;
  border-color: #FF0000;
}

button {
  border: none;
  height: 30px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
  border-radius: 4px;
  height: 35px;
  cursor: pointer;
}

button#submit {
  background: #55EC39;
  width: 120px;
}

button#submit:disabled {
  color: black;
  background: #CCCCCC;
}

button#reset {
  color: black;
  background: #CCCCCC;
  width: 70px;
}

button#reset.enabled {
  background: #55EC39;
  width: 70px;
}
```

###### JavaScript

```javascript
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
```

