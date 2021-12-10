"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let item = '';

    if (formData.get('quantity') === '') {
      item = '1 ' + formData.get('name');
    } else {
      item = formData.get('quantity') + ' ' + formData.get('name');
    }

    let li = document.createElement('li');
    li.innerText = item;

    let ul = document.getElementById('grocery-list');
    ul.appendChild(li);

    form.reset();
  });
});
