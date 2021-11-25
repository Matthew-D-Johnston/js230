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
