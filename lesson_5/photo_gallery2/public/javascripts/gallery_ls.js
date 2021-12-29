"use strict";

document.addEventListener('DOMContentLoaded', event => {
  const templates = {};
  let photos;

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
    templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
  });

  document.querySelectorAll("[data-type=partial]").forEach(tmpl => {
    Handlebars.registerPartial(tmpl["id"], tmpl["innerHTML"]);
  });

  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
  });

  document.querySelector('a.next').addEventListener('click', event => {
    event.preventDefault();

    nextSlide();
  });

  document.querySelector('a.prev').addEventListener('click', event => {
    event.preventDefault();

    previousSlide();
  });

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
    slides.querySelector('figure').classList.add('current');
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    let header = document.querySelector("section > header");
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }

  function getCommentsFor(idx) {
    fetch("/comments?photo_id=" + idx)
      .then(response => response.json())
      .then(comment_json => {
        let comment_list = document.querySelector("#comments ul");
        comment_list.insertAdjacentHTML('beforeend', templates.photo_comments({ comments: comment_json }));
    });
  }

  function nextSlide() {
    let currentSlide = document.querySelector('figure.current');
    let newCurrentSlide;
    let slideId;

    currentSlide.classList.remove('current');
    if (currentSlide.nextElementSibling === null) {
      newCurrentSlide = document.querySelector('#slides figure');
    } else {
      newCurrentSlide = currentSlide.nextElementSibling;
    }

    newCurrentSlide.classList.add('current');
    slideId = Number(newCurrentSlide.dataset.id);

    clearHeader();
    renderPhotoInformation(slideId);

    clearComments();
    getCommentsFor(slideId);
  }

  function previousSlide() {
    let currentSlide = document.querySelector('figure.current');
    let newCurrentSlide;
    let slideId;

    currentSlide.classList.remove('current');
    if (currentSlide.previousElementSibling === null) {
      let slides = document.querySelectorAll('#slides figure');
      newCurrentSlide = slides[slides.length - 1];
    } else {
      newCurrentSlide = currentSlide.previousElementSibling;
    }

    newCurrentSlide.classList.add('current');
    slideId = Number(newCurrentSlide.dataset.id);

    clearHeader();
    renderPhotoInformation(slideId);

    clearComments();
    getCommentsFor(slideId);
  }

  function clearHeader() {
    let header = document.querySelector('section header');
    header.parentNode.removeChild(header);
    document.querySelector('section').insertAdjacentElement('afterbegin', document.createElement('header'));
  }

  function clearComments() {
    let comments = document.querySelectorAll('#comments li');

    for (let index = 0; index < comments.length; index += 1) {
      comments[index].parentNode.removeChild(comments[index]);
    }
  }
});
