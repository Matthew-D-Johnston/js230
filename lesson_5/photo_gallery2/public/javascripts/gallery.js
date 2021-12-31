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

  let likeButton;
  let favoriteButton;

  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
      likeButton = document.querySelector('a.button.like');
      likeButton.addEventListener('click', updateLikes);
      favoriteButton = document.querySelector('a.button.favorite');
      favoriteButton.addEventListener('click', updateFavorites);
  });

  document.querySelector('a.next').addEventListener('click', event => {
    event.preventDefault();

    nextSlide();
    likeButton = document.querySelector('a.button.like');
    likeButton.addEventListener('click', updateLikes);
    favoriteButton = document.querySelector('a.button.favorite');
    favoriteButton.addEventListener('click', updateFavorites);
  });

  document.querySelector('a.prev').addEventListener('click', event => {
    event.preventDefault();

    previousSlide();
    likeButton = document.querySelector('a.button.like');
    likeButton.addEventListener('click', updateLikes);
    favoriteButton = document.querySelector('a.button.favorite');
    favoriteButton.addEventListener('click', updateFavorites);
  });

  let form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    
    let formData = new FormData(form);

    let encodedName = encodeURIComponent(formData.get("name"));
    let encodedId = encodeURIComponent(formData.get("photo_id"));
    let encodedEmail = encodeURIComponent(formData.get("email"));
    let encodedBody = encodeURIComponent(formData.get("body"));

    let data = `photo_id=${encodedId}&name=${encodedName}&email=${encodedEmail}&body=${encodedBody}`;
    console.log(data);

    fetch('/comments/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: data
    })
    .then(response => response.json())
    .then(json => {
      let comment_list = document.querySelector("#comments ul");
      comment_list.insertAdjacentHTML('beforeend', templates.photo_comments({ comments: [json] }));
      form.reset();
    });
  });

  function updateLikes(event) {
    event.preventDefault();
    
    let request = new XMLHttpRequest();
    request.open('POST', '/photos/like');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    let photoId = likeButton.dataset.id;
    let data = { photo_id: photoId };
    let json = JSON.stringify(data);

    request.addEventListener('load', event => {
      let response = JSON.parse(request.response);
      let total = response.total;

      likeButton.innerText = likeButton.innerText.replace(/\d+/g, total);

      fetch("/photos")
        .then(response => response.json())
        .then(json => {
          photos = json;
      });
    });

    request.send(json);
  }

  function updateFavorites(event) {
    event.preventDefault();
    
    let request = new XMLHttpRequest();
    request.open('POST', '/photos/favorite');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    let photoId = favoriteButton.dataset.id;
    let data = { photo_id: photoId };
    let json = JSON.stringify(data);

    request.addEventListener('load', event => {
      let response = JSON.parse(request.response);
      let total = response.total;

      favoriteButton.innerText = favoriteButton.innerText.replace(/\d+/g, total);

      fetch("/photos")
        .then(response => response.json())
        .then(json => {
          photos = json;
      });
    });

    request.send(json);
  }

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

    document.querySelector('fieldset input[type="hidden"]').value = String(slideId);
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

    document.querySelector('fieldset input[type="hidden"]').value = String(slideId);
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
