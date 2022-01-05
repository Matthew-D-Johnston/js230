###### JS230 — Front-end Development with JavaScript > Miscellaneous GUI Apps

---

## Adding Smart Select to Car Shop

#### Problem with car filtering

The car filtering application that we developed in the previous exercise works fine, but it has a small problem. When we select a car make from the filtering options, the model selection options remain the same. Ideally, selecting a specific make should limit the possible model choices to cars made by that manufacturer.

#### Required change

Make the changes needed in the car filtering application so that selecting a make restricts the model choices to the manufacturer's models.

See our demo app [here](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/06_car_filter_smart_select/index.html).  

#### My Solution (further exploration)

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Cars for sale</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="car_shop_smart_select.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js" integrity="sha512-RNLkV3d+aLtfcpEyFG8jRbnWHxUqVZozacROI4J2F1sTaDqo1dPQYs01OMi1t1w9Y2FdbSCDSQ2ZVdAC8bzgAg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="car_shop_smart_select.js"></script>
  </head>
  <body>
    <header>
      <h1>Buy Used Cars</h1>
      <form class="filters">
        <fieldset>
          <ul id="filters">
            <li class="make">
              <label for="make">Make</label>
              <select name="make" id="make">
              </select>
            </li>
            <li class="model">
              <label for="model">Model</label>
              <select name="model" id="model">
              </select>
            </li>
            <li class="price">
              <label for="price">Price</label>
              <select name="price" id="price">
              </select>
            </li>
            <li class="year">
              <label for="year">Year</label>
              <select name="year" id="year">
              </select>
            </li>
            <li class="button">
              <button type="submit">Filter</button>
            </li>
          </ul>
        </fieldset>
      </form>
    </header>
    <ul id="cars">
    </ul>

    <script id="cars_template" type="text/x-handlebars">
      {{#each car}}
      <figure>
        <img src="{{image}}" alt="{{make}} {{model}}">
        <figcaption><p class="bold">{{make}} {{model}}</p><p>Year: {{year}}</p><p>Price: ${{price}}</p></figcaption>
        <button type=button>Buy</button>
      </figure>
      {{/each}}
    </script>
  </body>
</html>
```

###### CSS

```css
@import url("whitespace-reset.css");

header {
  background: #E29821;
  color: #fff;
  width: 100%;
  height: 100px;
  border-radius: 4px;
}

h1 {
  padding: 20px 0 15px 20px;
  font-size: 24px;
}

header form {
  padding-left: 20px;
}

header li {
  display: inline-block;
  margin-right: 8px;
}

header label {
  margin-right: 5px;
}

select {
  color: #fff;
  background: #E29821;
  border-color: #fff;
  border-radius: 3px;
  width: 80px;
  height: 24px;
}

header button {
  margin-left: 20px;
  color: #fff;
  background: #E29821;
  border-radius: 3px;
  border: 1px solid #fff;
  width: 50px;
  height: 24px;
}

figure {
  display: inline-block;
  vertical-align: bottom;
  margin: 0 20px 20px 0;
}

img {
  width: 200px;
  margin-bottom: 10px;
}

ul#cars {
  padding: 30px 0 0 20px;
}

.bold {
  font-weight: bold;
}

ul#cars p {
  margin-bottom: 5px;
}

ul#cars button {
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  color: #fff;
  background: #E29821;
  border-radius: 4px;
  border: 1px solid #fff;
  width: 50px;
  height: 35px;
  cursor: pointer;
}
```

###### JavaScript

```javascript
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
```



