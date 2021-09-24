##### JS230 - Front-end Development with JavaScript > Events and Asynchronous Programming

---

## Buggy Code

The code below is buggy. The person who created the code expects that nothing will happen when the user clicks on the image. This, however, isn't the case; clicking the image still brings the user to another web page.  

Study the code and explain the bug.  

###### HTML

```html
<a href="https://www.launchschool.com">
  Home
  <img src="https://d24f1whwu8r3u4.cloudfront.net/assets/launch-logo-b6d01bd15ee9da31457ee3c315845718823aa8a741858be598ab35042a312348.svg" />
</a>
```

###### CSS

```css
img {
  display: block;
  width: 15%;
  margin-top: 10px;
  cursor: auto;
}
```

###### JavaScript

```javascript
document.querySelector('img').addEventListener('click', event => {
  event.stopPropagation();
}, false);
```

---

#### My Solution

There are two problems with the code: 1) first of all, we are selecting an `img` element on which to add the `click` event listener when it should be an `a` element; 2) secondly, the code is calling the `stopPropagation` method on the `event` when it should be calling `preventDefault()`.  

Below is a refactoring of the code so that it works as intended:

```javascript
document.querySelector('a').addEventListener('click', event => {
  event.preventDefault();
}, false);
```

