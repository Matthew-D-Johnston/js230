##### JS230 DOM and Asynchronous Programming with JavaScript > Event-Driven and Asynchronous Programming

---

## Capturing and Bubbling (2)

### Problems

###### Practice Problem 1

HTML

```html
<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>
```

CSS

```css
#elem1 {
  background-color: green;
  position: relative;
  width: 200px;
  height: 200px;
  text-align: center;
  cursor: pointer;
}

#elem2 {
  background-color: blue;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 150px;
  height: 150px;
}

#elem3 {
  background-color: red;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 100px;
  height: 100px;
  line-height: 25px;
}

#elem4 {
  background-color: yellow;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 50px;
  height: 50px;
  line-height: 50px;
}
```

JavaScript

```javascript
let elem1 = document.querySelector('#elem1');

elem1.addEventListener('click', event => alert(event.target.tagName));
elem1.addEventListener('click', event => alert(event.currentTarget.tagName));
```

###### My Solution

1. `click` event listener of the `main` element listening on the bubbling phase.
2. `click` event listern of the `div` element on the bubbling phase.

###### LS Solution

1. The `click` event listener listening on the bubbling phase that alerts the `tagName` of the `target` element listening on the `div` element (the first event handler).
2. The `click` event listener listening on the bubbling phase that alerts the `tagName` of the `currentTarget` element listening on the `div` element (the second event handler).

###### Practice Problem 2

HTML

```html
<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>
```

CSS

```javascript
#elem1 {
  background-color: green;
  position: relative;
  width: 200px;
  height: 200px;
  text-align: center;
  cursor: pointer;
}

#elem2 {
  background-color: blue;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 150px;
  height: 150px;
}

#elem3 {
  background-color: red;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 100px;
  height: 100px;
  line-height: 25px;
}

#elem4 {
  background-color: yellow;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 50px;
  height: 50px;
  line-height: 50px;
}
```

JavaScript

```javascript
let elem1 = document.querySelector('#elem1');

elem1.addEventListener('click', event => alert("bubbling"));
elem1.addEventListener('click', event => alert("capturing"), true);
```

###### My Solution

1. The `click` event listener listening on the capturing phase that alerts the `"capturing"` string listening on the `div` element (the second event handler).
2. The `click` event listener listening on the bubbling phase that alerts the `"bubbling"` string listening on the `div` element.

###### LS Solution

1. The `click` event listener listening on the **capturing** phase on the `div#elem1` element (the second event handler).
2. The `click` event listener listening on the **bubbling** phase on the `div#elem1` element (the first event handler).

This problem demonstrates that the [click] `event` object passes through the capturing before the bubbling phase.

###### Practice Problem 3

HTML

```html
<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>
<input type=text>
```

CSS

```css
#elem1 {
  background-color: green;
  position: relative;
  width: 200px;
  height: 200px;
  text-align: center;
  cursor: pointer;
}

#elem2 {
  background-color: blue;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 150px;
  height: 150px;
}

#elem3 {
  background-color: red;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 100px;
  height: 100px;
  line-height: 25px;
}

#elem4 {
  background-color: yellow;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 50px;
  height: 50px;
  line-height: 50px;
}
```

JavaScript

```javascript
let elem1 = document.querySelector('#elem1');

document.addEventListener('keypress', event => {
  setTimeout(() => alert(event.code), 7000);
});

elem1.addEventListener('click', event => {
  setTimeout(() => alert(event.target.tagName), 7000);
});
```

###### My Solution

1. The `click` event listener listening on the bubbling phase that alerts the `tagName` of the  `target` element (i.e. the `div` element) after 7 seconds listening on the `div#elem1` element (the second event handler).
2. The `keypress` event listener listening on the bubbling phase that alerts the `code` property of the `event` object (the character `q`) after 7 seconds listening on the `document` element (the first event handler).
3. The `keypress` event listener listening on the bubbling phase that alerts the `code` property of the `event` object (the character `w`) after 7 seconds listening on the `document` element (the first event handler).
4. The `click` event listener listening on the bubbling phase that alerts the `tagName` of the `target` element (i.e. the `main` element) after 7 seconds listening on the `div#elem1` element (the second event handler).

###### LS Solution

1. The `click` event listener listening on the bubbling phase on the `div#elem1` element that alerts the `tagName` of the target element (the second event handler).
2. The `keypress` event listener listening on the bubbling phase on `document` that alerts the `code` of the keyboard key that was pressed (the first event handler).
3. The `keypress` event listener listening on the bubbling phase on `document` that alerts the `code` of the keyboard key that was pressed (the first event handler).
4. The `click` event listener listening on the bubbling phase on the `div#elem1` element that alerts the `tagName` of the target element (the second event handler).  



