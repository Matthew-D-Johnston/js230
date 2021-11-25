##### JS230 – Front-end Development with JavaScript > Making HTTP Requests

---

### Viewing Bookings

---

#### Problem

Implement the markup and JavaScript to view bookings made by students. The view for bookings should have two levels of detail. The first level shows only a list of dates that have bookings. the second level becomes visible only when a date is clicked and shows a nested list of booking details for the data. Details include the staff name, student email address, and the time booked.

---

#### Examples / Test Cases

The page should look something like:

---

### Bookings

* 07-03-18
* 08-02-18
* 09-02-18

---

When any of the dates are clicked on, then the page should dynamically change and show the specific booking details for that specific date, including the staff name, student email address, and the time booked. See below for example:

### Bookings

* 07-03-18
  * Fae Kassulke V | asda@asdasda | 06:30
* 08-02-18
  * Aaron Nitzsche | keaton@morar.io | 07:20
  * Gia Rice | aniya@dachkuphal.biz | 08:20
* 09-02-18

---

#### Data Structure





---

#### Algorithm

Major Steps:

* Build the HTML

  * This will just have a "Bookings" header

* Retrieve all the dates that have bookings:

  * This can be done with the `/api/bookings` path

  * The data should come in the following form:

    ```
    ['07-03-18', '08-02-18']
    ```

  * 

* Retrieve specific details for each booking date:

  * This can only occur after the booking dates have been retrieved.

  * To retrieve the details, we will need to iterate over the array of dates.

  * Each date will be used in the path `/api/bookings/:date` to retrieve the specific details for each date.

  * An example of the data retrieved:

    ```
    [["Vincent Ortiz","garth@king.org","06:00"],["Laurine Feil","garth@king.org","06:00"]]
    ```

  * Take this data and create an object with the date as the key and the value as the specific details in the following format: `Vincent Ortiz | garth@king.org | 06:00`

* Create a function that will build an unordered HTML list with the dates that were retrieved:

  * Each list element should display the given date
  * Each list element should have an HTML `id` corresponding to the date
  * Each list element should have an event listener attached to it that listens for a 'click' event, which when that event occurs, a dropdown list of the specific details of the bookings on that date appear.
  * This function should only be implemented once the booking dates have successfully been retrieved, and after the specific details for each date have been retrieved.

---

#### Code

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <title>Viewing Bookings</title>
    <style>
    </style>
    <script src="viewing_bookings.js"></script>
  </head>
  <body>
    <h1>Bookings</h1>
  </body>
</html>
```

###### JavaScript

```javascript
"use strict";

let datesPromise = new Promise((resolve, reject) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/bookings');
  xhr.responseType = 'json';
  xhr.send();
  let data;
  xhr.addEventListener('load', event => {
    data = xhr.response;

    if (xhr.status === 200) {
      resolve(data);
    } else {
      reject("Data load failed.");
    }
  });
});

async function createDateList() {
  let body = document.querySelector('body');
  let ul = document.createElement('ul');
  
  let dates = await datesPromise;

  for (let index = 0; index < dates.length; index += 1) {
    let date = dates[index];
    let li = document.createElement('li');
    li.setAttribute('id', date);
    li.innerText = date;
    ul.appendChild(li);
  }

  body.appendChild(ul);
}

async function bookingDates() {
  let dates = await datesPromise;

  for (let index = 0; index < dates.length; index += 1) {
    let date = dates[index];

    let bookingDetailsPromise = new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `/api/bookings/${date}`);
      xhr.responseType = 'json';
      xhr.send();
      let data;
      xhr.addEventListener('load', event => {
        data = xhr.response;

        if (xhr.status === 200) {
          resolve(data);
        } else {
          reject("Data load failed.");
        }
      });
    });

    async function logBookingDetails() {
      bookings[dates[index]] = await bookingDetailsPromise;
    }

    logBookingDetails();
  }
}

let bookings = {};
bookingDates();

async function setHTMLDateDetails() {
  await datesPromise;
  let datesList = document.querySelectorAll('li');
  // console.log(datesList);

  for (let index = 0; index < datesList.length; index += 1) {
    let li = datesList[index];
    li.addEventListener('click', event => {
      let targetLi = event.target;

      if (targetLi.children.length === 0) {
        let date = event.target.id;
        let ul = document.createElement('ul');
        let data = bookings[date];

        for (let detail = 0; detail < data.length; detail += 1) {
          let name = data[detail][0];
          let email = data[detail][1];
          let time = data[detail][2];

          let liInner = document.createElement('li');
          liInner.innerText = `${name} | ${email} | ${time}`;
          ul.appendChild(liInner);
        }

        li.appendChild(ul);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createDateList();
  setHTMLDateDetails();
});
```

