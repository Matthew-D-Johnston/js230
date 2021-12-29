###### JS230 DOM and Asynchronous Programming with JavaScript > Putting it All Together

---

## Project: Photo Gallery, Part 2 — Slide Show

In this assignment we'll handle the slideshow functionality. This will not only fade in the next photo, but also re-render the photo information as well as request the comments for that photo. The new comments are then rendered below the photo information.  

### Step 3: Create the Slide Show Functionality

In this step, implement the feature that allows users to navigate through the photos like a slide show. The requirements are the following:

- Attach events to the previous and next anchors to fade out the current photo and fade in the new one at the same time
- If we're on the first photo and click "previous", we loop to the last one. Clicking "next" when on the last one should bring the first photo.
- Each slide transition will also render the photo details for that photo below it
- When the slideshow is advanced, request and render the comments for that photo

If using jQuery to implement your solution, the library provides several techniques for adding [animation effects](https://api.jquery.com/category/effects/) to your application, including the [fadeIn](http://api.jquery.com/fadein/) and [fadeOut](http://api.jquery.com/fadeout/) methods.  

Modern CSS allows us to add many animation effects without having to resort to using JavaScript library like jQuery. One approach for the fading effect using vanilla JS would be to alter the [opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity) of the various slides, and set a [transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) `duration` for that property change. Note that some CSS properties **cannot** be animated, including `display`. In order to fade the slides using `opacity`, you'll need to update the stylesheet so that `#slides figure + figure` selector uses `opacity` rather than `display` to be initially hidden from view.  

```css
#slides figure + figure {
  opacity: 0;
}
```

You can then define some new CSS classes to alter the `opacity` of the slides, and add and remove these classes to the appropriate slides using JavaScript. Be sure to use the correct specificity for the classes.  

jQuery also provides some handy methods, [prev](http://api.jquery.com/prev/) and [next](http://api.jquery.com/next/), which can be used to get to the previous or the next photo from the current photo. If using a vanilla JavaScript implementation, you'll need to be a little bit more creative about how to approach this piece of functionality.  

If you're stuck or need a hint, check out the solution below.  

#### My Solution (modified LS's solution from previous assignment)

###### JavaScript

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
```

###### CSS (modifications)

```css
#slides figure {
  opacity: 0;
}

#slides figure.current {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 784px;
  opacity: 1;
  transition: opacity 3s;
}

/* #slides figure + figure {
  display: none;
} */
```

#### LS Solution

###### CSS

```css
#slides figure + figure {
  opacity: 0;
}

#slides .hide {
  opacity: 0;
  transition: opacity 800ms;
}

#slides .show {
  opacity: 1;
  transition: opacity 800ms;
}
```

###### JavaScript

```javascript
// rest of code omitted for brevity

const slideshow = {
  prevSlide: function(e) {
    e.preventDefault();
    let prev = this.currentSlide.previousElementSibling;
    if (!prev) {
      prev = this.lastSlide;
    }
    this.fadeOut(this.currentSlide);
    this.fadeIn(prev);
    this.renderPhotoContent(prev.getAttribute("data-id"));
    this.currentSlide = prev;
  },
  nextSlide: function(e) {
    e.preventDefault();
    let next = this.currentSlide.nextElementSibling;
    if(!next) {
      next = this.firstSlide;
    }
    this.fadeOut(this.currentSlide);
    this.fadeIn(next);
    this.renderPhotoContent(next.getAttribute("data-id"));
    this.currentSlide = next;
  },
  fadeOut: function(slide) {
    slide.classList.add('hide');
    slide.classList.remove('show');
  },
  fadeIn: function(slide) {
    slide.classList.remove('hide');
    slide.classList.add('show');
  },
  renderPhotoContent: function(idx) {
    renderPhotoInformation(Number(idx));
    getCommentsFor(idx);
  },
  bind: function() {
    let prevButton = this.slideshow.querySelector("a.prev");
    let nextButton = this.slideshow.querySelector("a.next");
    prevButton.addEventListener("click", (e) => { this.prevSlide(e) });
    nextButton.addEventListener("click", (e) => { this.nextslide(e) });
  },
  init: function() {
    this.slideshow = document.querySelector("#slideshow");
    let slides = this.slideshow.querySelectorAll('figure');
    this.firstSlide = slides[0];
    this.lastSlide = slides[slides.length - 1];
    this.currentSlide = this.firstSlide;
    this.bind();
  }
};

fetch("/photos")
	.then(response => response.json())
	.then(json => {
  	photos = json;
  	renderPhotos();
  	renderPhotoInformation(photos[0].id);
  	getCommentsFor(photos[0].id);
  	slideshow.init();
});

// rest of code omitted for brevity
```

