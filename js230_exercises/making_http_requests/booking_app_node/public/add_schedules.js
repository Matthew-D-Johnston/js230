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
