###### JS230 DOM and Asynchronous Programming with JavaScript > Putting it All Together

---

## Assignment: Photo Gallery Sideshow

A common addition to websites is a photo gallery. These may run automatically over time, by user interaction, or a combination of the two. There are also a large number of animation effects that can be used to transition between the visible and next photos in the slideshow. While there are a tremendous number of slideshow plugins out there that can be used, they all have more features than what we need for our basic slideshow. For our purposes, it would be like needing to hammer a nail into the wall to hang a frame, and instead of reaching for a basic hammer we grab the nail gun. Will it work? Probably. Do we need that much power and sophistication? Absolutely not.  

To start with, we will use placeholder images from [placeholder.com](https://placeholder.com/) to make four large images for the slides in our slideshow and four smaller, "thumbnail" images to be used for our slideshow navigation. The layout will be a single visible photo at the top of the page that takes up the width of the container, and the other images after it are hidden to start with. Below that are the four thumbnail images, laid out next to each other in a single row.  

You can see [an example](https://d3jtzah944tvom.cloudfront.net/lesson_5/photo_gallery_slideshow/index.html) that we have completed using placeholder images.  

On the first thumbnail, we will have a class added that will designate it as the currently visible image in the slideshow. As we click on other thumbnails, we will remove that class from the current thumbnail and place it on the clicked one. There should be some visual indicator that the thumbnail is the active one, like a change in border color.  

When the thumbnails are clicked, perform the `active` class toggle. Then, hide the currently visible image. Finally, based on which thumbnail was clicked, locate the image that was requested and show that image.  

For some extra practice, instead of simply showing and hiding the images, use fade animations to first fade the visible one out, then fade the selected one in.  

Here's a [link to an updated version of the photo gallery](https://d3jtzah944tvom.cloudfront.net/photo_gallery_with_fluid_layout/photo_gallery.zip) assignment that was worked on during the HTML/CSS course. You may start with this.  

