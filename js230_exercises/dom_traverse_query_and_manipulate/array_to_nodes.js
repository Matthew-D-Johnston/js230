"use strict";

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

arrayToNodes(["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]);
arrayToNodes(["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]]);
arrayToNodes(["BODY",[["HEADER",[]],["MAIN",[["DIV",[]],["DIV",[]]]],["FOOTER",[]]]]);
