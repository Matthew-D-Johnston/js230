"use strict";

function colorGeneration(generation) {
  let generationElements = walk(document.body)[generation] || [];
  
  for (let index = 0; index < generationElements.length; index += 1) {
    generationElements[index].classList.add('generation-color');
  }
}

let walk = (function() {
  let allGenerations = [];

  return function(node) {
    for (let index = 0; index < node.children.length; index += 1) {
      let count = 0;
      let parent = node.children[index];
  
      do {
        count += 1;
        parent = parent.parentElement;
      } while (parent.tagName !== 'BODY');
  
      if (allGenerations[count]) {
        allGenerations[count].push(node.children[index]);
      } else {
        allGenerations[count] = [];
        allGenerations[count].push(node.children[index]);
      }
  
      walk(node.children[index]);
    }
  
    return allGenerations;
  }
})();

colorGeneration(7);
