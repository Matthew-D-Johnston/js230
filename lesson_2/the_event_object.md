##### JS230 DOM and Asynchronous Programming with JavaScript > Event-Driven and Asynchronous Programming

---

## The Event Obect

### Problems

1. Starting with the template below, write some JavaScript code to move the red X to the last position in the document that the user clicked. Click the "EDIT ON CODEPEN" button on the upper-right to edit the template.

   ```html
   <div class="x">
     <div class="horizontal"></div>
     <div class="vertical"></div>
   </div> 
   ```

   ```css
   .x {
     position: absolute;
     transform: rotate(45deg);
     top: 20px;
     left: 20px;
   }
   
   .x .horizontal {
     width: 45px;
     height: 5px;
     position: absolute;
     left: -20px;
     background: red;
   }
   
   .x .vertical {
     height: 45px;
     width: 5px;
     background: red;
     position: absolute;
     left: 0px;
     top: -20px;
   }
   ```

   ###### My Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     let div = document.querySelector('.x');
     document.addEventListener('click', event => {
       let horizontal = event.clientX;
       let vertical = event.clientY;
       div.style.left = String(horizontal) + 'px';
       div.style.top = String(vertical) + 'px'; 
     });
   });
   ```

   Integrated with HTML and CSS:

   ```html
   <style>
     .x {
       position: absolute;
       transform: rotate(45deg);
       top: 20px;
       left: 20px;
     }
   
     .x .horizontal {
       width: 45px;
       height: 5px;
       position: absolute;
       left: -20px;
       background: red;
     }
   
     .x .vertical {
       height: 45px;
       width: 5px;
       background: red;
       position: absolute;
       left: 0px;
       top: -20px;
     }
   </style>
   <script>
     document.addEventListener('DOMContentLoaded', () => {
       let div = document.querySelector('.x');
       document.addEventListener('click', event => {
         let horizontal = event.clientX;
         let vertical = event.clientY;
         div.style.left = String(horizontal) + 'px';
         div.style.top = String(vertical) + 'px'; 
       });
     });
   </script>
   <div class="x">
     <div class="horizontal"></div>
     <div class="vertical"></div>
   </div> 
   ```

   ###### LS Solution

   ```javascript
   document.addEventListener('click', event => {
     let x = document.querySelector('.x');
     x.style.left = String(event.clientX) + 'px';
     x.style.top = String(event.clientY) + 'px';
   });
   ```

2. Update your solution to the previous problem to make the red X move as you move the mouse around the document instead of depending on clicks.

   ###### My Solution

   ```javascript
   document.addEventListener('mousemove', event => {
     let div = document.querySelector('.x');
     let horizontal = event.clientX;
     let vertical = event.clientY;
     div.style.left = String(horizontal) + 'px';
     div.style.top = String(vertical) + 'px'; 
   });
   ```

   Integrated with HTML and CSS

   ```html
   <style>
     .x {
       position: absolute;
       transform: rotate(45deg);
       top: 20px;
       left: 20px;
     }
   
     .x .horizontal {
       width: 45px;
       height: 5px;
       position: absolute;
       left: -20px;
       background: red;
     }
   
     .x .vertical {
       height: 45px;
       width: 5px;
       background: red;
       position: absolute;
       left: 0px;
       top: -20px;
     }
   </style>
   <script>
     document.addEventListener('mousemove', event => {
       let div = document.querySelector('.x');
       let horizontal = event.clientX;
       let vertical = event.clientY;
       div.style.left = String(horizontal) + 'px';
       div.style.top = String(vertical) + 'px'; 
     });
   </script>
   <div class="x">
     <div class="horizontal"></div>
     <div class="vertical"></div>
   </div>
   ```

3. Update your solution to the previous problem to change the color of the red X to blue when the user presses the `b` key, green in response to the `g` key, and red in response to `r`. The X should continue to follow the mouse around.

   ###### My Solution

   ```javascript
   document.addEventListener('keydown', event => {
     let horizontal = document.querySelector('.horizontal');
     let vertical = document.querySelector('.vertical');
     let char = event.key;
   
     switch (char) {
       case 'r':
         horizontal.style.background = 'red';
         vertical.style.background = 'red';
         break;
       case 'b':
         horizontal.style.background = 'blue';
         vertical.style.background = 'blue';
         break;
       case 'g':
         horizontal.style.background = 'green';
         vertical.style.background = 'green';
         break;
     }
   });
   ```

   Integrated with HTML and CSS:

   ```html
   <style>
     .x {
       position: absolute;
       transform: rotate(45deg);
       top: 20px;
       left: 20px;
     }
   
     .x .horizontal {
       width: 45px;
       height: 5px;
       position: absolute;
       left: -20px;
       background: red;
     }
   
     .x .vertical {
       height: 45px;
       width: 5px;
       background: red;
       position: absolute;
       left: 0px;
       top: -20px;
     }
   </style>
   <script>
     document.addEventListener('mousemove', event => {
       let div = document.querySelector('.x');
       let horizontal = event.clientX;
       let vertical = event.clientY;
       div.style.left = String(horizontal) + 'px';
       div.style.top = String(vertical) + 'px'; 
     });
   
     document.addEventListener('keydown', event => {
       let horizontal = document.querySelector('.horizontal');
       let vertical = document.querySelector('.vertical');
       let char = event.key;
   
       switch (char) {
         case 'r':
           horizontal.style.background = 'red';
           vertical.style.background = 'red';
           break;
         case 'b':
           horizontal.style.background = 'blue';
           vertical.style.background = 'blue';
           break;
         case 'g':
           horizontal.style.background = 'green';
           vertical.style.background = 'green';
           break;
       }
     });
   </script>
   <div class="x">
     <div class="horizontal"></div>
     <div class="vertical"></div>
   </div>
   ```

4. Using the following code, write some JavaScript to add a character counter that updates as the user types.

   HTML:

   ```html
   <div class="composer">
     <textarea placeholder="Enter your message"></textarea>
     <p class="counter"></p>
     <button type="submit">Post Message</button>
   </div>
   ```

   CSS:

   ```css
   HTML CSSResult Skip Results Iframe
   EDIT ON
   .composer {
     background: #f5f5f5;
     padding:  1em;
     width:  30em;
   }
   
   .composer textarea {
     width: 100%;
     height: 4em;
   }
   
   .composer textarea.invalid {
     color: red;
   }
   ```

   ###### My Solution

   ```javascript
   document.addEventListener('keyup', event => {
     let text = document.querySelector('textarea');
     let charsRemaining = 140 - text.value.length;
     let counter = document.querySelector('.counter');
     counter.textContent = `${charsRemaining} characters remaining`;
   
     if (charsRemaining < 0) {
       text.classList.add('invalid');
     } else {
       text.classList.remove('invalid');
     }
   });
   ```

   Integrated with HTML and CSS

   ```html
   <style>
   .composer {
     background: #f5f5f5;
     padding:  1em;
     width:  30em;
   }
   
   .composer textarea {
     width: 100%;
     height: 4em;
   }
   
   .composer textarea.invalid {
     color: red;
   }
   </style>
   <script>
     document.addEventListener('keyup', event => {
       let text = document.querySelector('textarea');
       let charsRemaining = 140 - text.value.length;
       let counter = document.querySelector('.counter');
       counter.textContent = `${charsRemaining} characters remaining`;
   
       if (charsRemaining < 0) {
         text.classList.add('invalid');
       } else {
         text.classList.remove('invalid');
       }
     });
   </script>
   <div class="composer">
     <textarea placeholder="Enter your message"></textarea>
     <p class="counter"></p>
     <button type="submit">Post Message</button>
   </div>
   ```

   ###### LS Solution

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     let composer = document.querySelector('.composer');
     let textarea = composer.querySelector('textarea');
     let counter = composer.querySelector('.counter');
     let button = composer.querySelector('button');
     
     function updateCounter() {
       let length = textarea.value.length;
       let remaining = 140 - length;
       let message = `${remaining.toString()} characters remaining`;
       let invalid = remaining < 0;
       
       textarea.classList.toggle('invalid', invalid);
       button.disabled = invalid;
       
       counter.textContent = message;
     }
     
     textarea.addEventListener('keyup', updateCounter);
     
     updateCounter();
   });
   ```

   

