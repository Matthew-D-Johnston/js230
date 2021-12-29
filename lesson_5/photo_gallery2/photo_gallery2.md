###### JS230 DOM and Asynchronous Programming with JavaScript > Putting it All Together

---

## Project: Photo Gallery, Part 1 — Fetch Data and Render on Page Load

### Step 1: Fetch Photos Data and Render Photos on Page Load

For this step, we're going to issue an AJAX request to the server to get the JSON data for all the photos on page load, then use that to:

- Render the `photos` template, and write it to the `#slides` div
- Render the `photo_information` template using the **first photo**'s data, and write it to `section > header` element that needs to contain the photo information

The API end point that we need to use for this step:

- Path: `/photos`
- HTTP method: GET
- Returns: an array of photos data in JSON format

Since this is an HTTP GET, feel free to type `http://localhost:3000/photos` in your browser to see the data that it returns. If you're stuck or need a hint, check out the solution below.

A couple of hints on how to approach the implementation:

- Spend some time looking through the Handlebars templates to understand the data that needs to be supplied to each
- Using your browser, make some calls to the various API endpoints. Use the DevTools network tab to see what json data is returned

#### My Solution

```javascript
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
  
    let photoHeader = document.querySelector('section header');
    photoHeader.innerHTML = photoInformationHTML;
  });
  
  request.send();
});
```

#### LS Solution

```javascript
document.addEventListener('DOMContentLoaded', event => {
  const template = {};
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
  });
  
  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
  }
  
  function renderPhotoInformation(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    let header = document.querySelector("section > header");
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }
});
```

### Step 2: Render Comments for the First Photo

For this step, request the comments data for the first photo and render it on page load.

The API end point that we need to use for this step:

- Path: `/comments?photo_id=\<number\>`, for example, `comments?photo_id=3`. You can get photo's IDs from the AJAX request you built in the previous step.
- HTTP method: GET
- Returns: an array of comments for the photo with `photo_id`

If you're stuck or need a hint, check out the solution below.

#### My Solution

```javascript
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
```

#### LS Solution

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

  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
  });

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
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
});
```