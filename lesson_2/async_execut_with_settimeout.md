##### JS230 DOM and Asynchronous Programming with JavaScript > Event-Driven and Asynchronous Programming

---

## Asynchronous Execution with setTimeout

### Problems

1. Write a JavaScript function named `delayLog` that loops through the numbers from 1 to 10, and logs each number after that number of seconds. It should log `1` after 1 second, `2` after 2 seconds, etc. Note that the computation of the time is not dependent on when a previous number was logged. This means that for 10 numbers a total of 10 seconds would have passed.

   ```javascript
   > delayLog();
   1  // 1 second later
   2  // 2 seconds later
   3  // 3 seconds later
   4  // etc...
   5
   6
   7
   8
   9
   10
   ```

   ###### My Solution

   ```javascript
   function delayLog() {
     for (let number = 1; number <= 10; number += 1) {
       let delay = number * 1000;
       setTimeout(() => {
         console.log(number);
       }, delay);
     }
   }
   
   delayLog();
   ```

   ###### LS Solution

   ```javascript
   function makeLogger(number) {
     return function() {
       console.log(number);
     }
   }
   
   function delayLog() {
     for (let index = 1; index <= 10; index += 1) {
       let logger = makeLogger(index);
       setTimeout(logger, index * 1000);
     }
   }
   ```

2. In what sequence will the JavaScript runtime run the following lines of code? Number them from 1-8 to show the order of execution.

   ```javascript
   setTimeout(() => {
     console.log('Once');
   }, 1000);
   
   setTimeout(() => {
     console.log('upon');
   }, 3000);
   
   setTimeout(() => {
     console.log('a');
   }, 2000);
   
   setTimeout(() => {
     console.log('time');
   }, 4000);
   ```

   ###### My Solution

   ```javascript
   setTimeout(() => {					// 1
     console.log('Once');			// 5
   }, 1000);
   
   setTimeout(() => {					// 2
     console.log('upon');			// 7
   }, 3000);
   
   setTimeout(() => {					// 3
     console.log('a');					// 6
   }, 2000);
   
   setTimeout(() => {					// 4
     console.log('time');			// 8
   }, 4000);
   ```

   ###### LS Solution

   ```javascript
   setTimeout(() => {        // 1
     console.log('Once');    // 5
   }, 1000);
   
   setTimeout(() => {        // 2
     console.log('upon');    // 7
   }, 3000);
   
   setTimeout(() => {        // 3
     console.log('a');       // 6
   }, 2000);
   
   setTimeout(() => {        // 4
     console.log('time');    // 8
   }, 4000);
   ```

3. In what sequence does the JavaScript runtime run the functions `q`, `d`, `n`, `z`, `s`, `f`, and `g` in the following code?

   ```javascript
   setTimeout(() => {
     setTimeout(() => {
       q();
     }, 15);
   
     d();
   
     setTimeout(() => {
       n();
     }, 5);
   
     z();
   }, 10);
   
   setTimeout(() => {
     s();
   }, 20);
   
   setTimeout(() => {
     f();
   });
   
   g();
   ```

   ###### My Solution

   ```javascript
   setTimeout(() => {
     setTimeout(() => {
       q();								// 7
     }, 15);
   
     d();									// 3
   
     setTimeout(() => {
       n();                // 5
     }, 5);
   
     z();									// 4
   }, 10);
   
   setTimeout(() => {
     s();									// 6						
   }, 20);
   
   setTimeout(() => {
     f();									// 1
   });
   
   g();										// 2
   ```

   Thus, `f`, `g`, `d`, `z`, `n`, `s`, and `q`.  

   ###### LS Solution

   `g`, `f`, `d`, `z`, `n`, `s`, and `q`.  

   Notice that `g` still comes before `f` even though the timeout duration defaults to `0`. The reason for this behavior is that while the function can execute immediately already, it isn't until the next event cycle that it will execute.  

   Another thing of note is that `setTimeout`'s behavior can be unpredictable when the differences in duration are tiny. Consequently, the sequence you get may be different than the solutions.  

4. Write a function named `afterNSeconds` that takes two arguments: a callback and a time duration in seconds. The function should wait for the indicated period, then invoke the callback function.

   ###### My Solution

   ```javascript
   function afterNSeconds(callback, duration = 0) {
     setTimeout(callback, duration * 1000);
   }
   ```

   ###### LS Solution

   ```javascript
   function afterNSeconds(callback, seconds) {
     setTimeout(callback, seconds * 1000);
   }
   ```

   