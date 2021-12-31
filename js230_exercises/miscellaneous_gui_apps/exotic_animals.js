"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let images = document.querySelectorAll('img');

  for (let index = 0; index < images.length; index += 1) {
    images[index].addEventListener('mouseenter', event => {
      let figcaption = event.target.nextElementSibling;

      let mouseLeft = false;

      images[index].addEventListener('mouseleave', event => {
        mouseLeft = true;
      });

      setTimeout(() => {
        if (!mouseLeft) {
          figcaption.classList.add('show');
          images[index].addEventListener('mouseleave', event => {
            figcaption.classList.remove('show');
          });
        }
      }, 2000);
    });
  }
});
