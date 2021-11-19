##### JS230 – Front-end Development with JavaScript > Making HTTP Requests

---

### Booking Time Slots

---

#### Problem

Implement the markup and JavaScript for booking a schedule. Be sure to check out the documentation on the requirements for a booking.

In the event that the student who's booking the appointment isn't in the database, you must provide a way for the user to create the student, and then automatically proceed with the booking once the student is successfully created.

Assume that only one schedule at a time can be booked.

##### Problem Steps:

* Create a "Schedules" form:
  * Use `<select>` element for the schedules that need to be retrieved and displayed in the following example format for each `<option>` element: `Far Kassulke | 07-03-18 | 06:30`; The `<label>` should be `'Please select one schedule'`.
  * an email `<input>` field of `type="text"` with "Email" as the `<label>`.
  * an `<input>` element of `type="submit"` for submitting the form.
* If there is no student associated with the email that is input, then `alert` the user that `Student does not exist; booking_sequence: 515266`; a new form field should then appear with a heading of `Please provide new student details`:
  - This form will contain an `"Email"` field with `<input>` of `type="text"`; the input field should already contain the email provided in the previous form.
  - A `"Name"` field and `<label>` with `<input>` of `type="text"`.
  - And a `"Booking Sequence:"` field and `<label>` ; this input field should already be filled out with the booking sequence number that was provided in the alert message.
  - Once the name field is filled with a student's name, the student should be added to the database and appopriate alert message should be displayed; also the schedule should be booked with the newly created student.
* If the student does exist, the schedule should be booked.

---

#### Algorithm

---

#### Code

###### JS for retrieving open schedules

```javascript
let schedules = [];

(() => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/schedules');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', event => {
  	schedules = xhr.response;
  });
})();

function retrieveOpenSchedules(schedules) {
  let openSchedules = [];
  for (let index = 0; index < schedules.length; index += 1) {
    let schedule = schedules[index];
    if (schedule.student_email === null) {
      openSchedules.push(schedule);
    }
  }
  
  return openSchedules;
}
```

###### JS for retrieving staff members

```javascript
let staff = [];

(() => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/staff_members');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', event => {
    staff = xhr.response;
  });
})();
```

###### JS for formatting schedules

```javascript
function formatOpenSchedules(schedules, staff) {
  let formattedSchedules = [];
  
  for (let index = 0; index < schedules.length; index += 1) {
    let schedule = schedules[index];
    let id = schedule.staff_id;
    let name;
    for (let member = 0; member < staff.length; member += 1) {
      if (id === staff[member].id) {
        name = staff[member].name;
      }
    }
    let date = schedule.date;
    let time = schedule.time;
    
    let formatted = `${name} | ${date} | ${time}`;
    formattedSchedules.push(formatted);
  }
  
  return formattedSchedules;
}
```

###### JS for populating `<select>` html element with schedule `<option>` elements

```javascript
function populateSelectElementWithScheduleData(formatted) {
  let select = document.getElementById('schedules');
  
  for (let index = 0; index < formatted.length; index += 1) {
    let option = document.createElement('option');
    option.text = formatted[index];
    option.value = formatted[index];
    select.append(option);
  }
}
```

###### JS for implementing the populating of the `<select>` element with schedule data

```javascript
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    let openSchedules = retrieveOpenSchedules(schedules);
    let formattedSchedules = formatOpenSchedules(openSchedules, staff);

    populateSelectElementWithScheduleData(formattedSchedules);
  }, 600);  
});
```

###### JS for generating form to submit new student to database

```javascript
function generateAddStudentForm(email, sequence) {
  let body = document.querySelector('body');

  let h2 = document.createElement('h2');
  h2.innerText = 'Please provide new student details';
  body.append(h2);

  let form = document.createElement('form');
  let ul = document.createElement('ul');
  ul.setAttribute('type', 'none');

  let liEmail = document.createElement('li');
  let labelEmail = document.createElement('label');
  labelEmail.htmlFor = 'student_email';
  labelEmail.innerText = 'Email:';
  let inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'text');
  inputEmail.setAttribute('name', 'student_email');
  inputEmail.setAttribute('id', 'student_email');
  inputEmail.value = email;
  liEmail.append(labelEmail);
  liEmail.append(inputEmail);
  ul.append(liEmail);

  let liName = document.createElement('li');
  let labelName = document.createElement('label');
  labelName.htmlFor = 'student_name';
  labelName.innerText = 'Name:';
  let inputName = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('name', 'student_name');
  inputName.setAttribute('id', 'student_name');
  liName.append(labelName);
  liName.append(inputName);
  ul.append(liName);

  let liSequence = document.createElement('li');
  let labelSequence = document.createElement('label');
  labelSequence.htmlFor = 'booking_sequence';
  labelSequence.innerText = 'Booking Sequence:';
  let inputSequence = document.createElement('input');
  inputSequence.setAttribute('type', 'text');
  inputSequence.setAttribute('name', 'booking_sequence');
  inputSequence.setAttribute('id', 'booking_sequence');
  inputSequence.value = sequence;
  liSequence.append(labelSequence);
  liSequence.append(inputSequence);
  ul.append(liSequence);

  let liSubmit = document.createElement('li');
  let inputSubmit = document.createElement('input');
  inputSubmit.setAttribute('type', 'button');
  inputSubmit.setAttribute('value', 'Submit');
  inputSubmit.setAttribute('id', 'new_student_submission');
  liSubmit.append(inputSubmit);
  ul.append(liSubmit);

  form.append(ul);
  body.append(form);
}
```

#### Finished Code

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8"/>
    <title>Book Time Slot</title>
    <style>

    </style>
    <script src="book_time_slot.js"></script>
  </head>
  <body>
    <h2>Schedules</h2>
    <form>
      <ul type="none">
        <li>
          <label for="schedules">Please select one schedule</label>
          <select name="schedules" id="schedules">
          </select>
        </li>
        <li>
          <label for="email">Email:</label>
          <input type="text" name="email" id="email">
          <input type="button" value="Submit" id="submit_schedule"/>
        </li>
      </ul>
    </form>
  </body>
</html>
```

###### JavaScript

```javascript
"use strict";


// Retrieve Open Schedules

let schedules = [];

(() => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/schedules');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', event => {
  	schedules = xhr.response;
  });
})();

function retrieveOpenSchedules(schedules) {
  let openSchedules = [];
  for (let index = 0; index < schedules.length; index += 1) {
    let schedule = schedules[index];
    if (schedule.student_email === null) {
      openSchedules.push(schedule);
    }
  }
  
  return openSchedules;
}

// Add Student to Database

function generateAddStudentForm(email, sequence) {
  let body = document.querySelector('body');

  let h2 = document.createElement('h2');
  h2.innerText = 'Please provide new student details';
  body.append(h2);

  let form = document.createElement('form');
  let ul = document.createElement('ul');
  ul.setAttribute('type', 'none');

  let liEmail = document.createElement('li');
  let labelEmail = document.createElement('label');
  labelEmail.htmlFor = 'student_email';
  labelEmail.innerText = 'Email:';
  let inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'text');
  inputEmail.setAttribute('name', 'student_email');
  inputEmail.setAttribute('id', 'student_email');
  inputEmail.value = email;
  liEmail.append(labelEmail);
  liEmail.append(inputEmail);
  ul.append(liEmail);

  let liName = document.createElement('li');
  let labelName = document.createElement('label');
  labelName.htmlFor = 'student_name';
  labelName.innerText = 'Name:';
  let inputName = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('name', 'student_name');
  inputName.setAttribute('id', 'student_name');
  liName.append(labelName);
  liName.append(inputName);
  ul.append(liName);

  let liSequence = document.createElement('li');
  let labelSequence = document.createElement('label');
  labelSequence.htmlFor = 'booking_sequence';
  labelSequence.innerText = 'Booking Sequence:';
  let inputSequence = document.createElement('input');
  inputSequence.setAttribute('type', 'text');
  inputSequence.setAttribute('name', 'booking_sequence');
  inputSequence.setAttribute('id', 'booking_sequence');
  inputSequence.value = sequence;
  liSequence.append(labelSequence);
  liSequence.append(inputSequence);
  ul.append(liSequence);

  let liSubmit = document.createElement('li');
  let inputSubmit = document.createElement('input');
  inputSubmit.setAttribute('type', 'button');
  inputSubmit.setAttribute('value', 'Submit');
  inputSubmit.setAttribute('id', 'new_student_submission');
  liSubmit.append(inputSubmit);
  ul.append(liSubmit);

  form.append(ul);
  body.append(form);
}

// Retrieve Staff Members

let staff = [];

(() => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/staff_members');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', event => {
    staff = xhr.response;
  });
})();

// Format Schedules

function openScheduleData(schedules, staff) {
  let data = [];
  
  for (let index = 0; index < schedules.length; index += 1) {
    let schedule = schedules[index];
    let id = schedule.staff_id;
    let name;
    for (let member = 0; member < staff.length; member += 1) {
      if (id === staff[member].id) {
        name = staff[member].name;
      }
    }
    let date = schedule.date;
    let time = schedule.time;
    let scheduleId = schedule.id;
    
    data.push([name, date, time, scheduleId]);
  }
  
  return data.sort(function(a, b) {
    let value = -1;
    if (a[0] > b[0]) {
      value = 1;
    }
    return value;
  });
}

// Populate <select> element with Schedule Data

function populateSelectElementWithScheduleData(scheduleData) {
  let select = document.getElementById('schedules');
  
  for (let index = 0; index < scheduleData.length; index += 1) {
    let option = document.createElement('option');
    let schedule = scheduleData[index];
    
    let name = schedule[0];
    let date = schedule[1];
    let time = schedule[2];
    let id = schedule[3];
    let formatted = `${name} | ${date} | ${time}`;

    option.text = formatted;
    option.value = id;
    option.id = `schedule_${id}`;

    select.append(option);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    let openSchedules = retrieveOpenSchedules(schedules);
    let scheduleData = openScheduleData(openSchedules, staff);

    populateSelectElementWithScheduleData(scheduleData);
  }, 2000);

  // Submit schedule and email form

  let submitSchedule = document.getElementById('submit_schedule');
  
  submitSchedule.addEventListener('click', event => {
    event.preventDefault();

    let scheduleId = Number(document.getElementById('schedules').value);
    let studentEmail = document.getElementById('email').value;
    let bookingData = { id: scheduleId, student_email: studentEmail };
    let json = JSON.stringify(bookingData);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/bookings');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(json);
    xhr.addEventListener('load', event => {
      let status = xhr.status;

      if (status === 204) {
        alert("Booked");
        let form = document.querySelector('form');
        form.reset();
      } else if (status === 404) {
        let responseMessage = xhr.responseText;
        let sequence = responseMessage.match(/\d{6}$/)[0];
        alert(responseMessage);
        generateAddStudentForm(studentEmail, sequence);

        let submitNewStudent = document.getElementById('new_student_submission');

        submitNewStudent.addEventListener('click', event => {
          event.preventDefault();

          let studentEmailStudent = document.getElementById('student_email').value;
          let studentName = document.getElementById('student_name').value;
          let sequenceStudent = Number(document.getElementById('booking_sequence').value);
          let studentData = { email: studentEmailStudent, name: studentName, booking_sequence: sequenceStudent };
          let jsonStudent = JSON.stringify(studentData);

          let xhrStudent = new XMLHttpRequest();
          xhrStudent.open('POST', '/api/students');
          xhrStudent.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
          xhrStudent.send(jsonStudent);
          xhrStudent.addEventListener('load', event => {
            let statusStudent = xhrStudent.status;

            if (statusStudent === 201) {
              alert(xhrStudent.responseText);
              xhr = new XMLHttpRequest();
              xhr.open('POST', '/api/bookings');
              xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
              xhr.send(json);
              xhr.addEventListener('load', event => {
                if (xhr.status === 204) {
                  alert("Booked");
                  let forms = document.querySelectorAll('form');
                  let bookingForm = forms[0];
                  let studentForm = forms[1];
                  let studentHeading = document.querySelectorAll('h2')[1];
                  studentForm.remove();
                  studentHeading.remove();
                  bookingForm.reset();
                } else {
                  alert(xhr.responseText);
                }
              });
              
            } else {
              alert(xhrStudent.responseText);
            }
          });
        });
      }
    });
  });
});
```



