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
