"use strict";

const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

let makes = cars.map(car => { return car.make });
const Makes = makes.filter((make, index) => {
  return makes.indexOf(make) === index;
});

let models = cars.map(car => { return car.model });
const Models = models.filter((model, index) => {
  return models.indexOf(model) === index;
});

let prices = cars.map(car => { return car.price });
const Prices = prices.filter((price, index) => {
  return prices.indexOf(price) === index;
});

let years = cars.map(car => { return car.year });
const Years = years.filter((year, index) => {
  return years.indexOf(year) === index;
});

document.addEventListener('DOMContentLoaded', event => {
  createSelectOptions('make', Makes);
  createSelectOptions('model', Models);
  createSelectOptions('price', Prices);
  createSelectOptions('year', Years);

  renderCarData(filterCarData('all', 'all', 'any', 'any'));

  let form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let formData = new FormData(form);

    let make = formData.get('make');
    let model = formData.get('model');
    let price = formData.get('price');
    let year = formData.get('year');
    
    renderCarData(filterCarData(make, model, price, year));
  });

  let selectMenus = document.querySelectorAll('select');

  for (let index = 0; index < selectMenus.length; index += 1) {
    selectMenus[index].addEventListener('blur', event => {
      let target = event.target;
      let menuType = target.id;

      let form = document.querySelector('form');
      let formData = new FormData(form);
      let make = formData.get('make');
      let model = formData.get('model');
      let price = formData.get('price');
      let year = formData.get('year');

      let carData = filterCarData(make, model, price, year);

      let selectMenusToUpdate = ['make', 'model', 'price', 'year'].filter(type => type !== menuType);
      
      selectMenusToUpdate.forEach(menu => {
        let data = carData.map(car => car[menu]);
        data = data.filter((car, index) => {
          return data.indexOf(car) === index;
        });

        if (menu === 'make') {
          createSelectOptions(menu, data, make);
        } else if (menu === 'model') {
          createSelectOptions(menu, data, model);
        } else if (menu === 'price') {
          createSelectOptions(menu, data, price);
        } else if (menu === 'year') {
          createSelectOptions(menu, data, year);
        }
      });

      if (make === 'all' && model === 'all' && price === 'any' && year === 'any') {
        createSelectOptions('make', Makes);
        createSelectOptions('model', Models);
        createSelectOptions('price', Prices);
        createSelectOptions('year', Years);
      }
    });
  }

  function createSelectOptions(type, data, selected) {
    let selectElem = document.getElementById(type);
    selectElem.innerHTML = '';

    let firstOptionElem = document.createElement('option');

    if (type === 'make' || type === 'model') {
      firstOptionElem.value = "all";
      firstOptionElem.innerText = "All";
      
    } else {
      firstOptionElem.value = "any";
      firstOptionElem.innerText = "Any";
    }

    selectElem.appendChild(firstOptionElem);

    data.forEach(elem => {
      let optionElem = document.createElement('option');
      optionElem.value = `${elem}`.toLowerCase();
      optionElem.innerText = elem;

      if (`${elem}`.toLowerCase() === selected) {
        optionElem.setAttribute('selected', 'true');
      }

      selectElem.appendChild(optionElem);
    });

  }

  function filterCarData(make, model, price, year) {
    let filtered = cars.slice();

    if (make !== 'all') {
      filtered = filtered.filter(car => car.make.toLowerCase() === make);
    }

    if (model !== 'all') {
      filtered = filtered.filter(car => car.model.toLowerCase() === model);
    }

    if (price !== 'any') {
      filtered = filtered.filter(car => car.price.toString() === price);
    }

    if (year !== 'any') {
      filtered = filtered.filter(car => car.year.toString() === year);
    }

    return filtered;
  }

  function renderCarData(filteredData) {
    let carsTemplate = Handlebars.compile(document.getElementById('cars_template').innerHTML);
    document.getElementById('cars').innerHTML = carsTemplate({ car: filteredData });
  }
});
