##### JS230 DOM and Asynchronous Programming with JavaScript > Event-Driven and Asynchronous Programming

---

## Assignment: Build an Input Box

In this assignment, we'll use HTML, CSS, and JavaScript to build an approximation of an `input` element. You'll never do this in a real project, but doing so here gives us an opportunity to create an interface that must handle more than one event type.  

We'll use the following HTML and CSS for this problem:  

HTML

```html
<div class="text-field">
  <div class="content"></div>
</div>
```

CSS

```css
.text-field {
  border: solid 1px #ccc;
  padding: 1em;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 18px;
  overflow: hidden;
  width: 300px; 
}

.text-field .content {
  display: inline-block;
  height: 21px;
  float: left;
  white-space: pre;
}

.text-field.focused {
  border-color: black;
}

.text-field.cursor .content {
  border-right: solid 2px black;
}
```

We'll build the functionality in increments. When we refer to the *text-field element*, we mean the element that has a class of `text-field`. Likewise, the *content element* has a class of `content`.

1. Write JavaScript to add the `focused` class to the text-field element when the user clicks the element.

   ###### My Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
     
     textField.addEventListener('click', event => {
       textField.classList.add('focused');
     });
   });
   ```

   ###### LS Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
     
     textField.addEventListener('click', event => textField.classList.add('focused'));
   })
   ```

2. Write JavaScript that removes the `focused` class from the text-field element when the user clicks the *document*.

   ###### My Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', event => {
       textField.classList.add('focused');
     });
   
     document.addEventListener('click', event => {
       textField.classList.remove('focused');
     }, true);
   });
   ```

   ###### LS Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', event => {
       event.stopPropagation();
       textField.classList.add('focused');
     });
   });
   
   document.addEventListener('click', event => {
     let textField = document.querySelector('.text-field');
     textField.classList.remove('focused');
   });
   ```

3. Write JavaScript to create an interval that adds or removes the class `cursor` from the text-field element every 500 milliseconds after the user clicks the text-field element. The code should toggle the `cursor` class every 500ms: on with one cycle, off with the next.

   ###### My Solution

   I'm stumped on this one.

   ###### LS Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', event => {
       event.stopPropagation();
       textField.classList.add('focused');
   
       setInterval(() => textField.classList.toggle('cursor'), 500);
     });
   });
   
   document.addEventListener('click', event => {
     let textField = document.querySelector('.text-field');
     textField.classList.remove('focused');
   });
   ```

4. When the user clicks anywhere in the document, clear the interval that adds and removes the `cursor` class.

   ###### My Solution

   ```javascript
   ```

   ###### LS Solution

   ```javascript
   let cursorInterval;
   
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', event => {
       event.stopPropagation();
       textField.classList.add('focused');
   
       cursorInterval = setInterval(() => textField.classList.toggle('cursor'), 500);
     });
   });
   
   document.addEventListener('click', event => {
     clearInterval(cursorInterval);
     let textField = document.querySelector('.text-field');
     textField.classList.remove('focused');
     textField.classList.remove('cursor');
   });
   ```

5. When the user presses a keyboard key while the text-field element has the `focused` class, append the String value of the key to the content element. Ignore keyboard entries when the text-field element does not have the `focused` class.

   ###### My Solution

   ```javascript
   let cursorIntervalId;
   
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', event => {
       event.stopPropagation();
       textField.classList.add('focused');
   
       cursorIntervalId = setInterval(() => textField.classList.toggle('cursor'), 500);
     });
   });
   
   document.addEventListener('click', event => {
     clearInterval(cursorIntervalId);
     let textField = document.querySelector('.text-field');
     textField.classList.remove('focused');
     textField.classList.remove('cursor');
   });
   
   document.addEventListener('keypress', event => {
     if (document.querySelector('div.focused')) {
       document.querySelector('div.content').textContent += event.key;
     }
   });
   ```

   ###### LS Solution

   ```javascript
   let cursorInterval;
   let focusedTextField;
   
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', function(event) {
       event.stopPropagation();
   
       focusedTextField = textField;
       textField.classList.add('focused');
   
       cursorInterval = setInterval(() => textField.classList.toggle('cursor'), 500);
     });
   });
   
   document.addEventListener('keydown', event => {
     if (focusedTextField) {
       let contentDiv = focusedTextField.querySelector('.content');
       contentDiv.textContent += event.key;
     }
   });
   
   document.addEventListener('click', event => {
     clearInterval(cursorInterval);
     if (focusedTextField) {
       focusedTextField.classList.remove('focused');
       focusedTextField.classList.remove('cursor');
       focusedTextField = null;
     }
   });
   ```

6. When the user presses the Backspace key while the text-field element has the `focused` class, delete the last character from the text within the content element.

   ###### My Solution

   ```javascript
   let cursorInterval;
   let focusedTextField;
   
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', function(event) {
       event.stopPropagation();
   
       focusedTextField = textField;
       textField.classList.add('focused');
   
       cursorInterval = setInterval(() => textField.classList.toggle('cursor'), 500);
     });
   });
   
   document.addEventListener('keydown', event => {
     if (focusedTextField) {
       let contentDiv = focusedTextField.querySelector('.content');
       if (event.key === 'Backspace') {
         let length = contentDiv.textContent.length;
         contentDiv.textContent = contentDiv.textContent.slice(0, length - 1);
       } else {
         contentDiv.textContent += event.key;
       }
     }
   });
   
   document.addEventListener('click', event => {
     clearInterval(cursorInterval);
     if (focusedTextField) {
       focusedTextField.classList.remove('focused');
       focusedTextField.classList.remove('cursor');
       focusedTextField = null;
     }
   });
   ```

   ###### LS Solution

   ```javascript
   let cursorInterval;
   let focusedTextField;
   
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', event => {
       event.stopPropagation();
   
       focusedTextField = textField;
       textField.classList.add('focused');
   
       cursorInterval = setInterval(() => textField.classList.toggle('cursor'), 500);
     });
   });
   
   document.addEventListener('keydown', event => {
     if (focusedTextField) {
       let contentDiv = focusedTextField.querySelector('.content');
       if (event.key === 'Backspace') {
         contentDiv.textContent = contentDiv.textContent.slice(0, contentDiv.textContent.length - 1);
       } else if (event.key.length === 1) {
         contentDiv.textContent = contentDiv.textContent + event.key;
       }
     }
   });
   
   document.addEventListener('click', event => {
     clearInterval(cursorInterval);
     if (focusedTextField) {
       focusedTextField.classList.remove('focused');
       focusedTextField.classList.remove('cursor');
       focusedTextField = null;
     }
   });
   ```

7. The current solution has a subtle bug. If you click consecutively on the text-field element the cursor will blink chaotically. This happens because there are as many "intervals" added as there are clicks. Write JavaScript that only sets the interval if it hasn't been set yet.

   ###### My Solution

   ```javascript
   let cursorInterval;
   let focusedTextField;
   
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', function(event) {
       event.stopPropagation();
   
       focusedTextField = textField;
       textField.classList.add('focused');
   
       if (!cursorInterval) {
         cursorInterval = setInterval(() => textField.classList.toggle('cursor'), 500);
       }
     });
   });
   
   document.addEventListener('keydown', event => {
     if (focusedTextField) {
       let contentDiv = focusedTextField.querySelector('.content');
       if (event.key === 'Backspace') {
         let length = contentDiv.textContent.length;
         contentDiv.textContent = contentDiv.textContent.slice(0, length - 1);
       } else if (event.key.length === 1) {
         contentDiv.textContent += event.key;
       }
     }
   });
   
   document.addEventListener('click', event => {
     clearInterval(cursorInterval);
     cursorInterval = undefined;
     if (focusedTextField) {
       focusedTextField.classList.remove('focused');
       focusedTextField.classList.remove('cursor');
       focusedTextField = null;
     }
   });
   ```

   ###### LS Solution

   ```javascript
   let cursorInterval;
   let focusedTextField;
   
   document.addEventListener('DOMContentLoaded', () => {
     let textField = document.querySelector('.text-field');
   
     textField.addEventListener('click', event => {
       event.stopPropagation();
   
       focusedTextField = textField;
       textField.classList.add('focused');
   
       cursorInterval = cursorInterval || setInterval(() => textField.classList.toggle('cursor'), 500);
     });
   });
   
   document.addEventListener('keydown', event => {
     if (focusedTextField) {
       let contentDiv = focusedTextField.querySelector('.content');
       if (event.key === 'Backspace') {
         contentDiv.textContent = contentDiv.textContent.slice(0, contentDiv.textContent.length - 1);
       } else if (event.key.length === 1) {
         contentDiv.textContent = contentDiv.textContent + event.key;
       }
     }
   });
   
   document.addEventListener('click', event => {
     clearInterval(cursorInterval);
     cursorInterval = null;
     if (focusedTextField) {
       focusedTextField.classList.remove('focused');
       focusedTextField.classList.remove('cursor');
       focusedTextField = null;
     }
   });
   ```

   

