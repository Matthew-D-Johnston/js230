##### JS230 DOM and Asynchronous Programming with JavaScript > Event-Driven and Asynchronous Prgoramming

---

## Repeating Execution with setInterval

### Problems

1. Write a function named `startCounting` that logs a number to the console every second, starting with `1`. Each number should be one greater than the previous number.

   ###### My Solution

   ```javascript
   function startCounting() {
     let count = 1;
     
     function counter() {
       console.log(count);
       count += 1;
     }
     
     setInterval(counter, 1000);
   }
   ```

   ###### LS Solution

   ```javascript
   function startCounting() {
     let count = 0;
     setInterval(() => {
       count += 1;
       console.log(count);
     }, 1000);
   }
   ```

2. Extend the code from the previous problem wiht a `stopCounting` function that stops the logger when called.

   ###### My Solution

   ```Javascript
   function stopCounting(intervalId) {
     clearInterval(intervalId);
   }
   ```

   I was a bit stumped on this one.

   ###### LS Solution

   ```javascript
   let counterId;
   
   function startCounting() {
     let count = 0;
     counterId = setInterval(() => {
       count += 1;
       console.log(count);
     }, 1000);
   }
   
   function stopCounting() {
     clearInterval(counterId);
   }
   ```

   

