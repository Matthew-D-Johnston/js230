
let h1 = document.querySelector('h1');
h1.remove();

let headerNav = document.body.firstElementChild.nextElementSibling;
headerNav.remove();
headerNav.insertAdjacentElement('afterbegin', h1);

document.body.insertAdjacentElement('afterbegin', headerNav);

let [babyMop, chinStick] = document.querySelectorAll('img');
babyMop.remove();
chinStick.remove();

let [chinStickFigure, babyMopFigure] = document.querySelectorAll('figure');
chinStickFigure.remove();
babyMopFigure.remove();

chinStickFigure.insertAdjacentElement('afterbegin', chinStick);
babyMopFigure.insertAdjacentElement('afterbegin', babyMop);

let article = document.querySelector('#content article');
article.insertAdjacentElement('beforeend', chinStickFigure);
article.insertAdjacentElement('beforeend', babyMopFigure);

