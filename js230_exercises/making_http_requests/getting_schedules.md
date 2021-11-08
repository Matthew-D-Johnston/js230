##### JS230 - Front-end Development with JavaScript > Making HTTP Requests

---

### Getting Schedules

---

#### Problem

Implement a function that retrieves all the schedules that are available. If one or more schedules are available, tally the count of schedules for each staff and alert the user of result as "key: value" pairs with the staff id as key (in the format of `'staff {id}'`; e.g, `'staff 1'`) and the count of schedules as the value. If there are no schedules, alert the user that there are currently no schedules available for booking.  

When implementing the function, keep in mind that server has been known to slow down when there are more than 7 schedules to retrieve. It doesn't always happen, but be sure to handle it accordingly. Once 5 seconds have passed, cancel the retrieval and inform the user to try again.  

Finally, inform the user about the completion of the request regardless of the success or failure (timeout) of the request.  

Note: Server slow down for when there are more than 7 schedules to retrieve is manufactured only. For reference, the manufactured time is 7 seconds.  

When running the JavaScript code, be sure that you're not doing [cross origin requests](https://launchschool.com/lessons/3728e24b/assignments/b86f1e8e); the app is not set to handle it. The easiest way to avoid it is to create an HTML file in the public directory of the app, access that file (page) via the proper path, and run the JS code from the web page.

For example, if you've created a `public/exercise1.html` file you'll access it via: `http://localhost:3000/exercise1.html`.

#### My Solution

```html
<!DOCTYPE html>
<html lang="en">
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      let request = new XMLHttpRequest();
      request.open('GET', '/api/schedules');
      request.responseType = 'json';
      request.timeout = 5000;

      request.addEventListener('timeout', () => {
        alert('Server timeout. Please try again.');
        alert('The request was not completed because the server timed out.');
      });
      
      request.addEventListener('load', event => {
        let schedules = request.response;
        let scheduleCount = {};

        if (schedules.length > 0) {
          schedules.forEach(schedule => {
            let id = schedule.staff_id;
            scheduleCount[`staff ${id}`] = scheduleCount[`staff ${id}`] ? scheduleCount[`staff ${id}`] : 0;
            scheduleCount[`staff ${id}`] += 1;
          });

          Object.keys(scheduleCount).forEach(count => {
            let message = `${count}: ${scheduleCount[count]}`;
            alert(message);
          });
        } else {
          alert('There are currently no schedules available for booking.')
        }
        alert('The request was completed successfully.');
      });

      request.send();
    });
  </script>
  <head>
    <meta charset='utf-8'>
    <title>Schedules!</title>
  </head>
  <body>
  </body>
</html>
```

#### LS Solution

```javascript
function retrieveSchedules() {
  const request = new XMLHttpRequest();
  
  // Be sure to change your host and port number accordingly
  request.open('GET', 'http://localhost:3000/api/schedules')
  request.timeout = 5000;
  request.responseType = 'json';
  
  request.addEventListener('load', event => {
    const schedules = request.response;
    const staffs = [];
    const tally = [];
    
    if (schedules.length > 0) {
      schedules.forEach(({staff_id}) => {
        const key = `staff ${String(staff_id)}`;
        if (!staffs.includes(key)) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      });
      
      alert(tally.map((_, index) => `${staffs[index]}: ${tally[index]}`).join("\n"));
    } else {
      alert('There are currently no schedules available for booking');
    }
  });
  
  request.addEventListener('timeout', event => {
    alert('It is taking longer than usual, please try again later.');
  });
  
  request.addEventListener('loadend', event => {
    alert('The request has completed.');
  });
  
  request.send();
}
```



