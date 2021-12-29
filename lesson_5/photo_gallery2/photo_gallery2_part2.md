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

