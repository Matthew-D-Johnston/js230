"use strict";

let h1 = document.querySelector('h1');
let headerNav = document.body.firstElementChild.nextElementSibling;
headerNav.insertAdjacentElement('afterbegin', h1);
document.body.insertAdjacentElement('afterbegin', headerNav);

let [babyMop, chinStick] = document.querySelectorAll('img');
let [chinStickFigure, babyMopFigure] = document.querySelectorAll('figure');
chinStickFigure.insertAdjacentElement('afterbegin', chinStick);
babyMopFigure.insertAdjacentElement('afterbegin', babyMop);

let article = document.querySelector('#content article');
article.insertAdjacentElement('beforeend', chinStickFigure);
article.insertAdjacentElement('beforeend', babyMopFigure);
