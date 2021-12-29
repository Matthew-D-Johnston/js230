"use strict";

// Step 1: Fetch Photos Data and Render Photos on Page Load

document.addEventListener('DOMContentLoaded', event => {
  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/photos');
  request.responseType = 'json';
  
  request.addEventListener('load', event => {
    let photoData = request.response;
  
    let photosTemplate = Handlebars.compile(document.getElementById('photos').innerHTML);
    let photosHTML = photosTemplate({ photos: photoData });
  
    let slidesDiv = document.getElementById('slides');
    slidesDiv.innerHTML = photosHTML;
  
    let photoInformationTemplate = Handlebars.compile(document.getElementById('photo_information').innerHTML);
    let photoInformationHTML = photoInformationTemplate(photoData[0]);
  
    let photoHeader = document.querySelector('section > header');
    photoHeader.innerHTML = photoInformationHTML;

    renderPhotoComments(photoData[0]);
  });
  
  request.send();
});

// Step 2: Render Comments for the First Photo

function renderPhotoComments(photo) {
  let request = new XMLHttpRequest();
  request.open('GET', `http://localhost:3000/comments?photo_id=${photo["id"]}`);
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let commentData = request.response;
    let commentsTemplate = Handlebars.compile(document.getElementById('photo_comments').innerHTML);
    Handlebars.registerPartial('photo_comment', document.getElementById('photo_comment').innerHTML);

    let commentsList = document.querySelector('#comments > ul');
    commentsList.innerHTML = commentsTemplate({ comments: commentData });
  });

  request.send();
}
