##### JS230 – Front-end Development with JavaScript > DOM Traversing, Querying, and Manipulation

---

# Nodes to Array

### Problem

Implement a function that converts the DOM, starting from the `body`, to nested arrays. Each element in the DOM is represented as `["PARENT_TAG_NAME", [children]]` where children are elements as well and as such follow the same format. When an element has no children, it's represented as `["PARENT_TAG_NAME", []]`. For instance, if the HTML doesn't have any elements inside the `body`, the result array would be: `["BODY", []]`. Likewise, if the HTML only has a `div` element as its content, the result array would be: `["BODY", [["DIV", []]]]`.

##### Problem Description:

Starting from the `body` node, create an array of nested arrays. The first entry of each nested array will be the element's tag name, the second entry will be an array of all the element's children, which follow the same pattern--element tag name and array of children. If an element has no children, then the second slot for that arry will be an empty array.

##### Definitions/Rules (explicit and implicit):

* start with the `body` element
* each element is represented as `["PARENT_TAG_NAME", [children]]`, where `children` are elements and follow same format
* An element with no children is represented as `["PARENT_TAG_NAME", []]`

##### Inputs/Outputs:

* the function has no input; it works on the DOM of an HTML document.
* Output is an array of nested subarrays containing the DOM elements.

##### Mental Model:

Starting with the `body` element, find its children elements, and for each child element, find those child elements. Every time the child elements are found, they must be iterated over and an array with two slots should be returned: the first slot contains the parent's tag name and the second slot contains an array of the children elements, which themselves are represented in the same format.

---

### Examples / Test Cases

##### Example 1:

```html
<!doctype html>
<html>
  <head>
    <title>Nodes to Array</title>
  </head>
  <body>
    <header id="1"></header>
    <main id="2"></main>
    <footer id="3"></footer>
  </body>
</html>
```

```javascript
> nodesToArr();
= ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]

// OR

= ["BODY", [
    ["HEADER", []],
    ["MAIN", []],
    ["FOOTER", []]]]
```

##### Example 2:

```html
<!doctype html>
<html>
  <head>
    <title>Nodes to Array</title>
  </head>
  <body>
    <header id="1"></header>
    <main id="2">
      <div></div>
      <div></div>
    </main>
    <footer id="3"></footer>
  </body>
</html>
```

```javascript
> nodesToArr();
= ["BODY",[["HEADER",[]],["MAIN",[["DIV",[]],["DIV",[]]]],["FOOTER",[]]]]

// OR

= ["BODY", [
    ["HEADER", []],
    ["MAIN", [
      ["DIV", []],
      ["DIV", []]]],
    ["FOOTER",[]]]]
```

##### Example 3:

```html
<!doctype html>
<html>
  <head>
    <title>Nodes to Array</title>
  </head>
  <body>
    <div id="1">
      <div id="4"></div>
      <div id="5">
        <div id="6"></div>
      </div>
    </div>
    <div id="2"></div>
    <div id="3">
      <div id="7"></div>
      <div id="8"></div>
      <div id="9"></div>
    </div>
  </body>
</html>
```

```javascript
> nodesToArr();
= ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]]

// OR

= ["BODY", [
    ["DIV", [
      ["DIV", []],
      ["DIV", [
        ["DIV",[]]]]]],
    ["DIV", []],
    ["DIV", [
      ["DIV", []],
      ["DIV", []],
      ["DIV", []]]]]]
```

---

### Data Structure





---

### Algorithm

* start by construction the first array
  * `let bodyArray = [document.body.tagName, Array.prototype.slice.call(document.body.children)]`

* Now, find a general function that will take the second slot at index `1` and map over the elements of that array

* For each element of the array, return an array whose first element is the tag name of that element and the second array that contains the children array.

* Example:

  * `['BODY', [header#1, main#2, footer#3]]`

    ```javascript
    document.body.children.map(element => {
      
    })
    ```

    

  * 

  * ['BODY', [header#1, main#2, footer#3]][1].map(element => {})

  * 

  * => ``

* 

---

### Code

```javascript
function nodesToArr() {
  return nestedDOMArrays(document.body);
}

function nestedDOMArrays(node) {
  let parentName = node.tagName;
  let children = Array.prototype.slice.call(node.children) || [];
  return [parentName, children.map(element => nestedDOMArrays(element))];
}
```

Refactored:

```javascript
function nodesToArr(node = document.body) {
  let parentName = node.tagName;
  let children = Array.prototype.slice.call(node.children) || [];
  return [parentName, children.map(nodesToArr)];
}
```

