###### JS230 DOM and Asynchronous Programming with JavaScript > Putting it All Together

---

## Project: Photo Gallery, Part 3 — Like, Favorite and Comment

### Step 4: Like and Favorite a Photo

In this step, we'll allow the user to click on the "Like" and "Favorite" buttons and consequently, increment the respective counts.

The API end-point that we're going to use for this step:

- Like a photo:
  - Path: `/photos/like`; send `photo_id` as the data
  - HTTP method: POST
- Favorite a photo:
  - Path: `/photos/favorite`; send `photo_id` as the data
  - HTTP method: POST

Both of these end-points respond with a JSON object with a total. Use that to update the numbers on the buttons.  

```javascript
{
  total: 6
}
```

If you're stuck or need a hint, check out the solution below.

#### My Solution

```javascript
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
```

#### LS Solution

```javascript
// rest of code omitted for brevity

document.querySelector("section > header").addEventListener("click", function(e) {
  e.preventDefault();
  let button = e.target;
  let buttonType = button.getAttribute("data-property");
  if (buttonType) {
    let href = button.getAttribute("href");
    let dataId = button.getAttribute("data-id");
    let text = button.textContent;
    
    fetch(href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'photo_id=' + dataId
    })
    .then(response => response.json())
    .then(json => {
      button.textContent = text.replace(/\d+/, json.total);
    });
  }
});

// rest of code omitted for brevity
```

### Step 5: Add a New Comment for a Photo

Lastly, we're going to allow the user to add comments. We're going to add a submit callback to the comment form that will serialize and send the data to the server. The API end point that we're going to use for this step:  

 

- Path: `/comments/new`
- HTTP method: POST

The server will save the comment and return a JSON object back with the same data with a `date` property. If the email has a [Gravatar](https://en.gravatar.com/) associated with it, you'll get back a Gravatar url that you can use to render the comment. Here's an example server response:  

```javascript
{
  "name": "Shane Riley",
  "photo_id": 1,
  "gravatar": "http://gravatar.com/avatar/9f6f9c0b100d371267f07a12f73edf9d",
  "date": "3/31/15",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}
```

Once we get the response, we're going to:

- Render the new comment at the end of the current comments list using the JSON data that is returned
- Reset the form

The server is expecting the data as a set of parameters in the structure of a query string (although we're sending it in the body, since this is a post request):  

```
photo_id=1&name=Bill&email=bill%40gmail.com&body=some+random+comment
```

One tricky part of the implementation is converting the submitted form data to the format required by the server.  

#### My Solution

```javascript
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
```

#### LS Solution

```javascript
// rest of code omitted for brevity

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  let form = e.target;
  let href = form.getAttribute("action");
  let method = form.getAttribute("method");
  let data = new FormData(form);
  let currentSlideId = slideshow.currentSlide.getAttribute('data-id');
  data.set('photo_id', currentSlideId);
  
  fetch(href, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: new URLSearchParams([...data])
  })
  .then(response => response.json())
  .then(json => {
    let commentsList = document.querySelector('#comments ul');
    commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(json));
    form.reset();
  });
});

// rest of code omitted for brevity
```

