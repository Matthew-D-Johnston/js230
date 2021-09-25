##### JS230 - Front-end Development with JavaScript > Events and Asynchronous Programming

---

## Selection Filters

### Problem

##### Description

Given the HTML below, write some JavaScript code that updates the options on one dropdown when the selection in the other dropdown changes. For instance, when the user chooses an option under Classifications, the items in the Animals dropdown should change accordingly. Use the lookup tables below to see which animals and classifications go together.  

###### HTML

```html
<form id="selection-filters" method="post" action="#">
  <select id="animal-classifications">
    <option value="Classifications" selected>Classifications</option>
    <option value="Vertebrate">Vertebrate</option>
    <option value="Warm-blooded">Warm-blooded</option>
    <option value="Cold-blooded">Cold-blooded</option>
    <option value="Mammal">Mammal</option>
    <option value="Bird">Bird</option>
  </select>
  <select id="animals">
    <option value="Animals" selected>Animals</option>
    <option value="Bear">Bear</option>
    <option value="Turtle">Turtle</option>
    <option value="Whale">Whale</option>
    <option value="Salmon">Salmon</option>
    <option value="Ostrich">Ostrich</option>    
  </select>
  <button id="clear">Clear</button>  
</form>
```

**Selection Change with Filter1: Animal Classifications**

| Selection    | Animals Options                      |
| :----------- | :----------------------------------- |
| Vertebrate   | Bear, Turtle, Whale, Salmon, Ostrich |
| Warm-blooded | Bear, Whale, Ostrich                 |
| Cold-blooded | Salmon, Turtle                       |
| Mammal       | Bear, Whale                          |
| Bird         | Ostrich                              |

**Selection Change with Filter2: Animals**

| Selection | Animal Classifications Options   |
| :-------- | :------------------------------- |
| Bear      | Vertebrate, Warm-blooded, Mammal |
| Turtle    | Vertebrate, Cold-blooded         |
| Whale     | Vertebrate, Warm-blooded, Mammal |
| Salmon    | Vertebrate, Cold-blooded         |
| Ostrich   | Vertebrate, Warm-blooded, Bird   |

When the user clicks the "Clear" button, the program should reset both dropdowns to their default values.  

##### Rules/Definitions

* Update options on one dropdown when the selection in the other dropdown changes.
* When the "Clear" button is clicked, the program should reset both dropdown to their default values.
* Default Values: "Classifications" and "Animals"

##### Input/Output (Event/Response)

* Event: user selects an option from one of the two dropdown menus.
* Response: the options in the other dropdown menu are modified to reflect the option chosen in the other dropdown menu.

##### Mental Model

A user must select a single option from one of the two dropdown menus. Once an option has been selected, the other dropdown must update to include only the options that are related to the selected option. Both dropdown menus have this same functionality. If the "Clear" button is clicked, then reset both dropdown menus to their default positions.

---

### Examples / Test Cases

* If in the "Classifications" dropdown, "Vertebrate" is selected, then the "Animals" dropdown should provide the following options: "Bear", "Turtle", "Whale", "Salmon", and "Ostrich".
* If in the "Animals" dropdown, "Bear" is selected, then the "Classifications" dropdown should provide the following options: "Vertebrate", "Warm-blooded", "Mammal".

---

### Data Structure:

---

### Algorithm:

---

### Code:

```html
<script>
  const Classifications = {
    'Classifications': ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Vertebrate': ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    'Mammal': ['Bear', 'Whale'],
    'Bird': ['Ostrich'],
  };

  const Animals = {
    'Animals': ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
    'Bear': ['Vertebrate', 'Warm-blooded', 'Mammal'],
    'Turtle': ['Vertebrate', 'Cold-blooded'],
    'Whale': ['Vertebrate', 'Warm-blooded', 'Mammal'],
    'Salmon': ['Vertebrate', 'Cold-blooded'],
    'Ostrich': ['Vertebrate', 'Warm-blooded', 'Bird'],
  };

  function setAnimals(classification) {
    let animalList = Classifications[classification];
    
    let selectElement = document.getElementById('animals');
    Array.prototype.slice.call(selectElement.children).forEach(animal => animal.remove());

    animalList.forEach((animal, index) => {
      let optionElement = document.createElement('option');
      optionElement.value = animal;
      optionElement.textContent = animal;
      if (index === 0) {
        optionElement.setAttribute('selected', true);
      }
      selectElement.appendChild(optionElement);
    });
  }

  function setClassifications(animal) {
    let classificationList = Animals[animal];
    
    let selectElement = document.getElementById('animal-classifications');
    Array.prototype.slice.call(selectElement.children).forEach(classification => classification.remove());

    classificationList.forEach((classification, index) => {
      let optionElement = document.createElement('option');
      optionElement.value = classification;
      optionElement.textContent = classification;
      if (index === 0) {
        optionElement.setAttribute('selected', true);
      }
      selectElement.appendChild(optionElement);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('clear');

    button.addEventListener('click', event => {
      event.preventDefault();
      setClassifications('Animals');
      setAnimals('Classifications');
    });
    
    let classificationSelection = document.getElementById('animal-classifications');
    let animalSelection = document.getElementById('animals');
    
    classificationSelection.addEventListener('change', event => {
      setAnimals(classificationSelection.value);
    });
    
    animalSelection.addEventListener('change', event => {
      setClassifications(animalSelection.value);
    });
  });
</script>
<form id="selection-filters" method="post" action="#">
  <select id="animal-classifications">
    <option value="Classifications" selected>Classifications</option>
    <option value="Vertebrate">Vertebrate</option>
    <option value="Warm-blooded">Warm-blooded</option>
    <option value="Cold-blooded">Cold-blooded</option>
    <option value="Mammal">Mammal</option>
    <option value="Bird">Bird</option>
  </select>
  <select id="animals">
    <option value="Animals" selected>Animals</option>
    <option value="Bear">Bear</option>
    <option value="Turtle">Turtle</option>
    <option value="Whale">Whale</option>
    <option value="Salmon">Salmon</option>
    <option value="Ostrich">Ostrich</option>    
  </select>
  <button id="clear">Clear</button>  
</form>
```

