##### JS230 – Front-end Development with JavaScript > Making HTTP Requests

---

### Adding Schedules

---

#### Problem

Implement the markup and JavaScript to add one or more schedules. You should handle and inform the user of the different possible responses of the server.  

###### Hint 1

It might not be apparent, but you'll need a way to get the `id` of the staff that you'll be creating a schedule for. You can get the list of staffs via `/api/staff_members. 

###### Hint 2

Your markup and JS should have the ability to add one or more schedules. This means that you'll need to figure out how to serialize the data for either case.  

---

#### Examples / Test Cases



---

#### Data Structure



---

#### Algorithm

- Retrieve the staff names.
- Allow for 

---

#### Code

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <title>Add Schedules</title>
    <style>
  
    </style>
  </head>
  <body>
    <button type="button">Add more schedules</button>
    <form>
      <fieldset id="schedule_1">
        <legend>Schedule 1</legend>
        <dl>
          <dt>
            <label for="name_1">Staff Name:</label>
          </dt>
          <dd>
            <select name="name_1" id="name_1">
            </select>
          </dd>
          <dt>
            <label for="date_1">Date:</label>
          </dt>
          <dd>
            <input type="text" id="date_1" name="date_1">
          </dd>
          <dt>
            <label for="time_1">Time:</label>
          </dt>
          <dd>
            <input type="text" id="time_1" name="time_1">
          </dd>
        </dl>
    	</fieldset>
    </form>
  </body>
</html>
```

###### JS for Retrieving Staff Names

```javascript
function retrieveStaffNames() {
  let request = new XMLHttpRequest();
  request.open('GET', 'api/staff_members');
  request.responseType = 'json';
  
  let staffNames = [];
  
  request.addEventListener('load', event => {
    let staffMembers = request.response;
    
    for (let member = 0; member < staffMembers.length; member += 1) {
      staffNames.push(staffMembers[member].name);
    };
  });
  
  request.send();
  
  return staffNames;
}
```

###### JS for creating a fieldset element for the form element

```javascript
function createFieldsetElement(scheduleNumber) {
  let fieldset = document.createElement('fieldset');
  fieldset.id = `schedule_${scheduleNumber}`;

  let legend = document.createElement('legend');
  legend.innerText = `Schedule ${scheduleNumber}`;
  fieldset.append(legend);
  
  let dl = createDlElement(scheduleNumber);
  fieldset.append(dl);
  
  return fieldset;
}
```

###### JS for creating dl element

```javascript
function createDlElement(scheduleNumber) {
  let dl = document.createElement('dl');
  
  let dtName = createDtElement('name', scheduleNumber);
	let ddName = createDdElement('name', scheduleNumber);
  dl.append(dtName);
  dl.append(ddName);
  
  let dtDate = createDtElement('date', scheduleNumber);
  let ddDate = createDdElement('date', scheduleNumber);
  dl.append(dtDate);
  dl.append(ddDate);
  
  let dtTime = createDtElement('time', scheduleNumber);
  let ddTime = createDdElement('time', scheduleNumber);
  dl.append(dtTime);
  dl.append(ddTime);
  
  return dl;
}
  
function createDtElement(type, scheduleNumber) {
  let dt = document.createElement('dt');
  let label = document.createElement('label');
  
  switch(type) {
    case 'name':
      label.htmlFor = `name_${scheduleNumber}`;
      label.innerText = 'Staff Name:';
      break;
    case 'date':
      label.htmlFor = `date_${scheduleNumber}`;
      label.innerText = 'Date:';
      break;
    case 'time':
      label.htmlFor = `time_${scheduleNumber}`;
      label.innerText = 'Time:';
      break;
  }
  
  dt.append(label);
  return dt;
}

function createDdElement(type, scheduleNumber) {
  let dd = document.createElement('dd');
  
  switch(type) {
    case 'name':
      let select = document.createElement('select');
      select.name = `name_${scheduleNumber}`;
      select.id = `name_${scheduleNumber}`;
      dd.append(select);
      break;
    case 'date':
      let inputDate = document.createElement('input');
      inputDate.type = 'text';
      inputDate.id = `date_${scheduleNumber}`;
      inputDate.name = `date_${scheduleNumber}`;
      dd.append(inputDate);
      break;
    case 'time':
      let inputTime = document.createElement('input');
      inputTime.type = 'text';
      inputTime.id = `time_${scheduleNumber}`;
      inputTime.name = `time_${scheduleNumber}`;
      dd.append(inputTime);
      break;
  }
  
  return dd;
}
```

###### JS populating the form element (add schedules to form element)

```javascript
// This function must be called within a 'DOMContentLoaded' event listener on the document
// element.

function addSchedulesToForm() {
  let form = document.querySelector('form');
  let fieldsets = form.elements;
  let fieldset;
  
  if (fieldsets.length === 0) {
    fieldset = createFieldsetElement(1);
  } else {
    let lastFieldset = fieldsets[fieldsets.length - 1];
    let lastScheduleNumber = Number(lastFieldset.id.split('_')[1]);
    let newScheduleNumber = lastScheduleNumber + 1;
    fieldset = createFieldsetElement(newScheduleNumber);
  }
  
  form.append(fieldset);
}
```

