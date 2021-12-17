"use strict";

document.addEventListener('DOMContentLoaded', () => {
  let currentImg = document.querySelector('.current');
  let currentImgSrc = currentImg.getAttribute('src');

  let currentSlide = document.querySelector('figure img');
  currentSlide.setAttribute('src', currentImgSrc);

  let thumbnails = document.querySelectorAll('li img');

  for (let index = 0; index < thumbnails.length; index += 1) {
    thumbnails[index].addEventListener('click', event => {
      let clickedImg = event.target;
      let clickedImgSrc = clickedImg.getAttribute('src');

      currentImg.setAttribute('class', 'non-current');

      currentImg = clickedImg;
      currentImgSrc = clickedImgSrc;
      currentImg.setAttribute('class', 'current');

      currentSlide.setAttribute('src', currentImgSrc);
    });
  }
});
