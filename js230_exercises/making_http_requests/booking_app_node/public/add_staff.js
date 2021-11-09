"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let submit = document.getElementById('submit');
  let email = document.getElementById('email');
  let name = document.getElementById('name');

  submit.addEventListener('click', event => {
    event.preventDefault();

    if (email.value === '' || name.value === '') {
      alert('Staff cannot be created. Check your inputs.');
    } else {
      let request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:3000/api/staff_members');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      request.setRequestHeader('Access-Control-Allow-Origin', 'public/add_staff.html');

      let data = { name: `${name.value}`, email: `${email.valuel}` };
      let json = JSON.stringify(data);

      request.send(json);
    }

    email.value = '';
    name.value = '';
  });
});
