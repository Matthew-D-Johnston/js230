##### JS230 – Front-end Development with JavaScript > DOM Traversing, Querying, and Manipulation

---

# Array to Nodes

### Problem

##### Problem Description:

Implement a function that converts a nested array of `nodeName`s (see Nodes to Array exercise for examples) to nodes. Go over the sample code and the corresponding return values below as a guide for what you will implement.  

##### Definitions/Rules (explicit and implicit)

* nested array of `nodeName`s: example, `["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]`

* conversion to nodes: example,

  ```html
  <body>
    <header></header>
    <main></main>
    <footer></footer>
  </body>
  ```

##### Inputs/Outputs:

* the function will take an Array with nested sub-Arrays as an input
* It will output HTML nodes that follow the structure given by the nested sub-Arrays

##### Mental Model

Start with an array of sub-arrays. The first element will be a string representation of the node's `tagName`. Using this `tagName` we will want to create a node of the same `tagName`. Starting with the first array 

---

### Examples / Test Cases

##### Example 1:

```javascript
// Nested array of nodes
const nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];

// OR
//
// ["BODY", [
//   ["HEADER", []],
//   ["MAIN", []],
//   ["FOOTER", []]]]

arrayToNodes(nodes);
```

```html
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>
```

##### Example 2:

```javascript
// Nested array of nodes
const nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];

// OR
//
// ["BODY", [
//   ["DIV", [
//     ["DIV", []],
//     ["DIV", [
//       ["DIV",[]]]]]],
//   ["DIV", []],
//   ["DIV", [
//     ["DIV", []],
//     ["DIV", []],
//     ["DIV", []]]]]]

arrayToNodes(nodes);
```

```html
<body>
  <div>
    <div></div>
    <div>
      <div></div>
    </div>
  </div>
  <div></div>
  <div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</body>
```



---

### Data Structure





---

### Algorithm





---

### Code

```javascript
function arrayToNodes(nodes) {
  let nodeTree = document.createElement(nodes[0]);
  let parent = nodeTree;
  appendNodesToNodeTree(nodes[1]);
  return nodeTree;

  function appendNodesToNodeTree(nodes) {
    let nodesArray = Array.prototype.slice.call(nodes);
    let childrenArray = [];
    
    nodesArray.forEach(node => {
      child = document.createElement(node[0]);
      childrenArray.push([child, node[1]]);
      parent.appendChild(child);
    });
    
    childrenArray.forEach(node => {
      parent = node[0];
      appendNodesToNodeTree(node[1]);
    });
  }
}
```

