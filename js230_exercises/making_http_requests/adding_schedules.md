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



##### Submitting the Form Data to Add One or More Schedules

###### Steps:

1) Check that all the form fields are filled out for each schedule.

2) Collect the data for each schedule: switch the staff name for the staff id as a number; keep date as a string; and keep time as a string. The data can be stored in an array called `"schedules"`, and each schedule is an object with the following keys: `"staff_id"`, `"date"`, and `"time"`. Below is an example of what it should look like:

   ```
   {
       "schedules": [
           {
               "staff_id": 1,
               "date": "10-10-10",
               "time": "12:12"
           }
       ]
   }
   ```

3) Submit the data using a `POST` request to `/api/schedules`

   

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
    <script src="add_schedules.js"></script>
  </head>
  <body>
    <button type="button">Add more schedules</button>
    <form>
      <input type="button" value="Submit">
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
  let elements = form.elements;
  let fieldset;
  
  if (elements.length === 1) {
    fieldset = createFieldsetElement(1);
    form.insertAdjacentElement('afterbegin', fieldset);
  } else {
    let lastFieldset = elements[elements.length - 2];
    let lastScheduleNumber = Number(lastFieldset.id.split('_')[1]);
    let newScheduleNumber = lastScheduleNumber + 1;
    fieldset = createFieldsetElement(newScheduleNumber);
    form.insertBefore(fieldset, form.elements[elements.length - 1]);
  }
}
```

###### JS for adding the staff names to the select element of the form

```javascript
const StaffNames = retrieveStaffNames();

document.addEventListener('DOMContentLoaded', () => {
  addSchedulesToForm();

  setTimeout(() => {
    let select = document.getElementById('name_1');

    for (let index = 0; index < StaffNames.length; index += 1) {
      let option = document.createElement('option');
      option.text = StaffNames[index];
      option.value = StaffNames[index];
      select.append(option);
    }
  }, 10);
});
```

###### JS for inserting additional schedules into the form element when "Add more schedules" button is pressed

```javascript
const StaffNames = retrieveStaffNames();

document.addEventListener('DOMContentLoaded', () => {
  addSchedulesToForm();

  setTimeout(() => {
    let select = document.getElementById('name_1');

    for (let index = 0; index < StaffNames.length; index += 1) {
      let option = document.createElement('option');
      option.text = StaffNames[index];
      option.value = StaffNames[index];
      select.append(option);
    }
  }, 10);

  let button = document.querySelector('button');

  button.addEventListener('click', event => {
    event.preventDefault();
  
    addSchedulesToForm();

    let selectElements = document.querySelectorAll('select');
    let lastSelectElement = selectElements[selectElements.length - 1];
    
    for (let index = 0; index < StaffNames.length; index += 1) {
      let option = document.createElement('option');
      option.text = StaffNames[index];
      option.value = StaffNames[index];
      lastSelectElement.append(option);
    }
  });
});
```

###### JS for retrieving staff_id given the staff member's name

```javascript
let staffId;
function retrieveStaffId(name) {
  let request = new XMLHttpRequest();
  request.open('GET', 'api/staff_members');
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let staffMembers = request.response;

    for (let member = 0; member < staffMembers.length; member += 1) {
      if (staffMembers[member].name === name) {
        staffId = staffMembers[member].id;
      }
    };
  });

  request.send();
}
```

###### JS to retrieve all input elements except final input button

```javascript
function retrieveScheduleInputData() {
  let inputs = document.querySelectorAll('input');
  let inputsArr = [];
  for (let index = 0; index < inputs.length - 1; index += 1) {
    inputsArr.push(inputs[index]);
  }
  
  return inputsArr;
}
```

###### JS to retrieve all date input elements

```javascript
function retrieveDateInputs() {
  let inputs = retrieveScheduleInputData();
  return inputs.filter((input, index) => index % 2 === 0);
}
```

###### JS to retrieve all time input elements

```javascript
function retrieveTimeInputs() {
  let inputs = retrieveScheduleInputData();
  return inputs.filter((input, index) => index % 2 === 1);
}
```

###### JS to verify that all input data is complete

```javascript
function verifyInputData() {
  let dateInputs = retrieveDateInputs();
  let timeInputs = retrieveTimeInputs();
  
  for (let index = 0; index < dateInputs.length; index += 1) {
    let dateValue = dateInputs[index].value;
    let timeValue = timeInputs[index].value;
    
    if (dateValue.length < 8 || timeValue.length < 5) {
      alert('Please check your inputs');
      break;
    }
  }
}
```

###### JS for retrieving staff names and ids

```javascript
function retrieveStaffNamesAndIds() {
  let request = new XMLHttpRequest();
  request.open('GET', 'api/staff_members');
  request.responseType = 'json';

  let namesAndIds = [];

  request.addEventListener('load', event => {
    let staffMembers = request.response;

    for (let member = 0; member < staffMembers.length; member += 1) {
      let staff = {};
      staff.name = staffMembers[member].name;
      staff.id = staffMembers[member].id;

      namesAndIds.push(staff);
    };
  });

  request.send();

  return namesAndIds;
}
```

###### JS for creating schedule data to POST

```javascript
const NamesAndIds = retrieveStaffNamesAndIds();

function constructScheduleData() {
  if (verifyInputData()) {
    let nameInputs = document.querySelectorAll('select');
    let dateInputs = retrieveDateInputs();
    let timeInputs = retrieveTimeInputs();
    let namesAndIds = retrieveStaffNamesAndIds();
    
    let data = {
      schedules: [
        
      ]
    }
    
    for (let index = 0; index < nameInputs.length; index += 1) {
      let name = nameInputs[index].value;
      let staffId;
      for (let member = 0; member < NamesAndIds.length; member += 1) {
        if (NamesAndIds[member].name === name) {
          staffId = NamesAndIds[member].id;
        }
      }

      let date = dateInputs[index].value;
      let time = timeInputs[index].value;
      let schedule = {};
      
      schedule.staff_id = staffId;
      schedule.date = date;
      schedule.time = time;
      
      data.schedules.push(schedule);
    }
    
    return data;
  }
}
```

---

#### Finished Code

```javascript
"use strict";

// Functions

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
      inputDate.placeholder = "mm-dd-yy";
      dd.append(inputDate);
      break;
    case 'time':
      let inputTime = document.createElement('input');
      inputTime.type = 'text';
      inputTime.id = `time_${scheduleNumber}`;
      inputTime.name = `time_${scheduleNumber}`;
      inputTime.placeholder = "hh:mm";
      dd.append(inputTime);
      break;
  }
  
  return dd;
}

function addSchedulesToForm() {
  let form = document.querySelector('form');
  let elements = form.elements;
  let fieldset;
  
  if (elements.length === 1) {
    fieldset = createFieldsetElement(1);
    form.insertAdjacentElement('afterbegin', fieldset);
  } else {
    let lastFieldset = elements[elements.length - 2];
    let lastScheduleNumber = Number(lastFieldset.id.split('_')[1]);
    let newScheduleNumber = lastScheduleNumber + 1;
    fieldset = createFieldsetElement(newScheduleNumber);
    form.insertBefore(fieldset, form.elements[elements.length - 1]);
  }
}

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

function retrieveScheduleInputData() {
  let inputs = document.querySelectorAll('input');
  let inputsArr = [];
  for (let index = 0; index < inputs.length - 1; index += 1) {
    inputsArr.push(inputs[index]);
  }
  
  return inputsArr;
}

function retrieveDateInputs() {
  let inputs = retrieveScheduleInputData();
  return inputs.filter((input, index) => index % 2 === 0);
}

function retrieveTimeInputs() {
  let inputs = retrieveScheduleInputData();
  return inputs.filter((input, index) => index % 2 === 1);
}

function verifyInputData() {
  let dateInputs = retrieveDateInputs();
  let timeInputs = retrieveTimeInputs();
  
  for (let index = 0; index < dateInputs.length; index += 1) {
    let dateValue = dateInputs[index].value;
    let timeValue = timeInputs[index].value;
    
    if (dateValue.length < 8 || timeValue.length < 5) {
      alert('Please check your inputs');
      return false;
    }
  }

  return true;
}

function retrieveStaffNamesAndIds() {
  let request = new XMLHttpRequest();
  request.open('GET', 'api/staff_members');
  request.responseType = 'json';

  let namesAndIds = [];

  request.addEventListener('load', event => {
    let staffMembers = request.response;

    for (let member = 0; member < staffMembers.length; member += 1) {
      let staff = {};
      staff.name = staffMembers[member].name;
      staff.id = staffMembers[member].id;

      namesAndIds.push(staff);
    };
  });

  request.send();

  return namesAndIds;
}

const NamesAndIds = retrieveStaffNamesAndIds();

function constructScheduleData() {
  if (verifyInputData()) {
    let nameInputs = document.querySelectorAll('select');
    let dateInputs = retrieveDateInputs();
    let timeInputs = retrieveTimeInputs();
    let namesAndIds = retrieveStaffNamesAndIds();
    
    let data = {
      schedules: [
        
      ]
    }
    
    for (let index = 0; index < nameInputs.length; index += 1) {
      let name = nameInputs[index].value;
      let staffId;
      for (let member = 0; member < NamesAndIds.length; member += 1) {
        if (NamesAndIds[member].name === name) {
          staffId = NamesAndIds[member].id;
        }
      }

      let date = dateInputs[index].value;
      let time = timeInputs[index].value;
      let schedule = {};
      
      schedule.staff_id = staffId;
      schedule.date = date;
      schedule.time = time;
      
      data.schedules.push(schedule);
    }
    
    return data;
  }
}

const StaffNames = retrieveStaffNames();
let scheduleData;

document.addEventListener('DOMContentLoaded', () => {
  addSchedulesToForm();

  setTimeout(() => {
    let select = document.getElementById('name_1');

    for (let index = 0; index < StaffNames.length; index += 1) {
      let option = document.createElement('option');
      option.text = StaffNames[index];
      option.value = StaffNames[index];
      select.append(option);
    }
  }, 10);

  let button = document.querySelector('button');

  button.addEventListener('click', event => {
    event.preventDefault();
  
    addSchedulesToForm();

    let selectElements = document.querySelectorAll('select');
    let lastSelectElement = selectElements[selectElements.length - 1];
    
    for (let index = 0; index < StaffNames.length; index += 1) {
      let option = document.createElement('option');
      option.text = StaffNames[index];
      option.value = StaffNames[index];
      lastSelectElement.append(option);
    }
  });

  let submit = document.getElementById('submit');

  submit.addEventListener('click', event => {
    event.preventDefault();

    scheduleData = constructScheduleData();
    let jsonData = JSON.stringify(scheduleData);

    let request = new XMLHttpRequest();
    request.open('POST', 'api/schedules');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    request.addEventListener('load', event => {
      let response = request.status;
      
      switch(response) {
        case 201:
          alert('Staff schedules updated');
          break;
        case 400:
          alert('Server error');
          break;
      }
    });

    request.send(jsonData);
  });
});
```

