"use strict";

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


