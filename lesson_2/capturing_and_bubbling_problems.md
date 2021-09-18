##### JS230 DOM and Asynchronous Programming with JavaScript > Event-Driven and Asynchronous Programming

---

## Capturing and Bubbling (1)

### Problems

1. Reverse the behavior of scenario 3. Have the alert box of the `div#elem1` element show up first.  

   Given code:  

   HTML

   ```html
   <div id="elem1">1
     <div id="elem2">2
       <div id="elem3">3
         <div id="elem4">4
         </div>
       </div>
     </div>
   </div>
   ```

   CSS

   ```javascript
   #elem1 {
     background-color: green;
     position: relative;
     width: 200px;
     height: 200px;
     text-align: center;
     cursor: pointer;
   }
   
   #elem2 {
     background-color: blue;
     position: absolute;
     top: 25px;
     left: 25px;
     width: 150px;
     height: 150px;
   }
   
   #elem3 {
     background-color: red;
     position: absolute;
     top: 25px;
     left: 25px;
     width: 100px;
     height: 100px;
     line-height: 25px;
   }
   
   #elem4 {
     background-color: yellow;
     position: absolute;
     top: 25px;
     left: 25px;
     width: 50px;
     height: 50px;
     line-height: 50px;
   }
   ```

   JavaScript

   ```javascript
   let elem1 = document.querySelector('#elem1');
   let elem4 = document.querySelector('#elem4');
   
   elem1.addEventListener('click', event => alert(event.currentTarget.id));
   elem4.addEventListener('click', event => alert(event.currentTarget.id));
   ```

   ###### My Solution

   My solution passes `true` as the third argument to the `addEventListener` method, which is the `useCapture` argument and causes the event listener to listen on the "capturing phase" rather than the default "bubbling phase".

   ```javascript
   let elem1 = document.querySelector('#elem1');
   let elem4 = document.querySelector('#elem4');
   
   elem1.addEventListener('click', event => alert(event.currentTarget.id), true); 
   elem4.addEventListener('click', event => alert(event.currentTarget.id));
   ```

2. Study the example below.

   * Can you predict what happens when you click on "4"?

   * If we add the following line of code, what will happen?

     ```javascript
     document.querySelector('.d3').addEventListener('click', highlightThis, false);
     ```

   HTML

   ```html
   <body>
     <div class="d1 pick">1
       <main class="d2 pick">2
         <div class="d3">3
           <section class="d4 pick">4
           </section>
         </div>  
       </main>
     </div>
   </body>
   ```

   CSS

   ```css
   .d1 {
     background-color: green;
     position: relative;
     width: 200px;
     height: 200px;
     text-align: center;
     cursor: pointer;
   }
   
   .d2 {
     background-color: blue;
     position: absolute;
     top: 25px;
     left: 25px;
     width: 150px;
     height: 150px;
   }
   
   .d3 {
     background-color: red;
     position: absolute;
     top: 25px;
     left: 25px;
     width: 100px;
     height: 100px;
     line-height: 25px;
   }
   
   .d4 {
     background-color: yellow;
     position: absolute;
     top: 25px;
     left: 25px;
     width: 50px;
     height: 50px;
     line-height: 50px;
   }
   ```

   JavaScript

   ```javascript
   let divs = document.querySelectorAll('.pick');
   
   for(let index = 0; index < divs.length; index += 1) {
     divs[index].addEventListener('click', highlightThis, true);
   }
       
   function highlightThis(e) {
     alert(`${this.className} ${e.currentTarget.tagName}`);
   }
   ```

   ###### My Solution

   Prediction: if we click on the "4", then we are going to get 3 separate alerts. The first alert will be: `d1 pick DIV`. The second alrter will be: `d2 pick MAIN`. And finally, the third alert will be: `d4 pick SECTION`.  

   Adding the line of code will then cause a final alert to pop up. That final alert will be: `d3 DIV`.

3. Check out the HTML structure and the JavaScript code. How many alert boxes do you think will fire when the yellow box is clicked? Why?  

   HTML

   ```html
   <div id="elem0">0</div>
   <div id="elem1">1
     <div id="elem2">2
       <div id="elem3">3
         <div id="elem4">4
         </div>
       </div>
     </div>
   </div>
   ```

   CSS

   ```css
   #elem0 {
     width: 250px;
     height: 250px;
     position: absolute;
     background-color: orange;
     text-align: center;
     cursor: pointer;
   }
   
   #elem1 {
     background-color: green;
     position: relative;
     top: 25px;
     left: 25px;
     width: 200px;
     height: 200px;
     text-align: center;
     cursor: pointer;
   }
   
   #elem2 {
     background-color: blue;
     position: absolute;
     top: 25px;
     left: 25px;
     width: 150px;
     height: 150px;
   }
   
   #elem3 {
     background-color: red;
     position: absolute;
     top: 25px;
     left: 25px;
     width: 100px;
     height: 100px;
     line-height: 25px;
   }
   
   #elem4 {
     background-color: yellow;
     position: absolute;
     top: 25px;
     left: 25px;
     width: 50px;
     height: 50px;
     line-height: 50px;
   }
   ```

   JavaScript

   ```javascript
   let elem0 = document.querySelector('#elem0');
   let elem1 = document.querySelector('#elem1');
   let elem4 = document.querySelector('#elem4');
   
   elem0.addEventListener('click', event => alert(event.currentTarget.id));
   elem1.addEventListener('click', event => alert(event.currentTarget.id), true);
   elem4.addEventListener('click', event => alert(event.currentTarget.id));
   ```

   ###### My Solution

   I think that only two alert box will fire, one for the green box (i.e. elem1) and one for the yellow box (i.e. elem4). There will be no alert box for the organge box (i.e. elem0) because its html code is separate from that of the other two boxes.