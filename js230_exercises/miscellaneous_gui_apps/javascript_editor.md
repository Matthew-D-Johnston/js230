###### JS230 — Front-end Development with JavaScript > Miscellaneous GUI Apps

---

## A JavaScript WYSIWYG Editor

Create a Rich Text editor that lets users edit text in a WYSIWYG (What You See Is What You Get) manner.  

#### Specifications

**Controls**

The WYSIWYG editor should let users:

- Enter text.
- Make text bold.
- Italicize text.
- Underline text.
- Strike-through text.
- Create a link from some text.
- Create an unordered list.
- Create an ordered list.
- Align text to the right, left, center, and fully-justified.

Use the following documents as a reference for this project:

1. https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable
2. https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand*

The first two paragraphs of reference 2 are a bit confusing: you do not need to set `designMode` to use the `execCommand` API, nor should you turn it on.  

*Please note that MDN indicates that `execCommand` has been deprecated. While you should not use this method in production, it will suit our needs for the purpose of this exercise. Lack of support is primarily centered around the `ClearAuthenticationCache`, `defaultParagraphSeparator`, and `insertBrOnReturn` commands.  

You can see our demo app [here](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/mini_projects/misc_gui_projects/09_rich_text_editor/index.html).  

The demo app uses [font awesome](https://fontawesome.com/) for some of the icons. You don't need to use those.  

#### My Solution

* We are going to need a recursive method that will toggle the appropriate styling buttons when a specific section of the text is selected.
* This method/function will be used as an event handler for a `selectionchange` event.
* The handler will get the currently selected text using: `document.getSelection()`;
* It will then get the `text` node by calling `anchorNode`;
* We could name a variable for this: `let selected = document.getSelection().anchorNode`
* Retrieve the text editor parent: `let textEditor = document.querySelector('div.text')`
* We will only execute code if the selected node was within the text editor portion of the web page; thus, `if (textEditor.contains(selected))`



```javascript
function toggleButtonsOnSelection(event) {
  let selected = document.getSelection().anchorNode;
  let textEditor = document.querySelector('div.text');

  if(textEditor.contains(selected) && textEditor.contains(selected.parentElement)) {
    let tags = [];

    while (selected.parentElement.id !== 'text-editor') {
      let tagName = selected.parentElement.tagName;
      console.log(tagName);

      if (tagName === 'B') {
        toggleBoldButton('on');
        tags.push(tagName);
      }

      if (tagName === 'I') {
        toggleItalicButton('on');
        tags.push(tagName);
      }

      if (tagName === 'U') {
        toggleUnderlineButton('on');
        tags.push(tagName);
      }

      if (tagName === 'STRIKE') {
        toggleStrikethroughButton('on');
        tags.push(tagName);
      }

      if (tagName === 'A') {
        toggleUnderlineButton('on');
      }

      if (tagName === 'LI') {
        if (selected.parentElement.parentElement.tagName === 'UL') {
          toggleUlListButton('on');
          tags.push(selected.parentElement.parentElement.tagName);
        }

        if (selected.parentElement.parentElement.tagName === 'OL') {
          toggleOlListButton('on');
          tags.push(selected.parentElement.parentElement.tagName);
        }
      }

      if (tagName === 'UL') {
        toggleUlListButton('on');
        tags.push(tagName);
      }

      if (tagName === 'OL') {
        toggleOlListButton('on');
        tags.push(tagName);
      }

      if (tagName === 'DIV' || tagName === 'P' || tagName === 'LI') {
        let parent = selected.parentElement;
        let alignment = parent.style.textAlign;

        if (alignment === 'left') {
          toggleAlignLeftButton('on');
          toggleAlignRightButton('off');
          toggleAlignCenterButton('off');
          toggleAlignJustifyButton('off');
        } else if (alignment === 'right') {
          toggleAlignRightButton('on');
          toggleAlignLeftButton('off');
          toggleAlignCenterButton('off');
          toggleAlignJustifyButton('off');
        } else if (alignment === 'center') {
          toggleAlignCenterButton('on');
          toggleAlignLeftButton('off');
          toggleAlignRightButton('off');
          toggleAlignJustifyButton('off');
        } else if (alignment === 'justify') {
          toggleAlignJustifyButton('on');
          toggleAlignCenterButton('off');
          toggleAlignLeftButton('off');
          toggleAlignRightButton('off');
        } else {
          toggleAlignLeftButton('on');
          toggleAlignRightButton('off');
          toggleAlignCenterButton('off');
          toggleAlignJustifyButton('off');
        }

        while (parent.id !== 'text-editor') {
          parent.style.textAlign = alignment;
          parent = parent.parentElement;
        }
      }

      selected = selected.parentElement;
    }

    if (!tags.includes('B')) {
      toggleBoldButton('off');
    }

    if (!tags.includes('I')) {
      toggleItalicButton('off');
    }

    if (!tags.includes('U') && !tags.includes('A')) {
      toggleUnderlineButton('off');
    }

    if (!tags.includes('STRIKE')) {
      toggleStrikethroughButton('off');
    }

    if (!tags.includes('UL')) {
      toggleUlListButton('off');
    }

    if (!tags.includes('OL')) {
      toggleOlListButton('off');
    }
  }
}
```

Create a link function

```javascript
function addLink() {
  toggleLinkButton('on');
  let linkURL = prompt('Enter the URL to link to:');
  let text = document.getSelection();
  
  document.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + text + '</a>');
}
```

#### My Final Solution

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Editor</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="javascript_editor.css">
    <script src="https://kit.fontawesome.com/62dd22e480.js" crossorigin="anonymous"></script>
    <script src="javascript_editor.js"></script>
  </head>
  <body>
    <h1>Rich Text Editor</h1>
    <div class="editor">
      <div class="menu">
        <button id="bold" class="fas fa-bold off"></button>
        <button id="italic" class="fas fa-italic off"></button>
        <button id="underline" class="fas fa-underline off"></button>
        <button id="strikethrough" class="fas fa-strikethrough off"></button>
        <button id="link" class="fas fa-link off"></button>
        <button id="ul-list" class="fas fa-list off"></button>
        <button id="ol-list" class="fas fa-list-ol off"></button>
        <button id="align-left" class="fas fa-align-left on"></button>
        <button id="align-right" class="fas fa-align-right off"></button>
        <button id="align-center" class="fas fa-align-center off"></button>
        <button id="align-justify" class="fas fa-align-justify off"></button>
      </div>
      <div id="text-editor" class="text" contenteditable="true">
      </div>
    </div>
  </body>
</html>
```

###### CSS

```css
@import url("whitespace-reset.css");

body {
  background: #5555FF;
}

h1 {
  color: #fff;
  font-size: 24px;
  margin: 20px 0 30px 0;
  text-align: center;
}

div.editor {
  display: block;
  width: 800px;
  margin: auto;
  overflow: auto;
}

div.menu {
  background: #CCCCCC;
  height: 30px;
  padding-right: 10px;
}

div.text {
  height: 470px;
  background: #fff;
  outline: none;
  padding: 5px;
  overflow: auto;
}

button {
  border: none;
  background: #CCCCCC;
  margin-top: 5px;
  margin-left: 5px;
  padding-top: 2px;
  width: 25px;
  height: 20px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
}

button:hover {
  background: #EBEBEB;
}

.on {
  background: #EBEBEB;
}

ul {
  list-style-type: disc;
  list-style-position: inside;
}

ol {
  list-style-type: decimal;
  list-style-position: inside;
}

li {
  display: list-item;
  list-style-position: inside;
  margin-left: 20px;
}
```

###### JavaScript

```javascript
"use strict";

document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('selectionchange', toggleButtonsOnSelection);

  document.querySelector('div.editor').addEventListener('click', event => {
    let target = event.target;
    
    if (target.tagName === 'BUTTON') {
      if (target.id === 'bold') {
        toggleBoldButton('on');
        document.execCommand('bold');
      }

      if (target.id === 'italic') {
        toggleItalicButton('on');
        document.execCommand('italic');
      }

      if (target.id === 'underline') {
        toggleUnderlineButton('on');
        document.execCommand('underline');
      }

      if (target.id === 'strikethrough') {
        toggleStrikethroughButton('on');
        document.execCommand('strikeThrough');
      }

      if (target.id === 'link') {
        toggleLinkButton('on');

        if (!!document.getElementById('link').classList.value.match('on')) {
          let url = prompt('Enter the URL to link to: ');
          document.execCommand('createLink', false, url);
          toggleLinkButton('off');
        }
      }

      if (target.id === 'ul-list') {
        toggleUlListButton('on');
        document.execCommand('insertUnorderedList');
      }

      if (target.id === 'ol-list') {
        toggleOlListButton('on');
        document.execCommand('insertOrderedList');
      }

      if (target.id === 'align-left') {
        toggleAlignLeftButton('on');
        document.execCommand('justifyLeft');
      }

      if (target.id === 'align-right') {
        toggleAlignRightButton('on');
        document.execCommand('justifyRight');
      }

      if (target.id === 'align-center') {
        toggleAlignCenterButton('on');
        document.execCommand('justifyCenter');
      }

      if (target.id === 'align-justify') {
        toggleAlignJustifyButton('on');
        document.execCommand('justifyFull');
      }
    }
  });
  
  function toggleBoldButton(toggle) {
    toggleButton(toggle, 'bold');
  }

  function toggleItalicButton(toggle) {
    toggleButton(toggle, 'italic');
  }

  function toggleUnderlineButton(toggle) {
    toggleButton(toggle, 'underline');
  }

  function toggleStrikethroughButton(toggle) {
    toggleButton(toggle, 'strikethrough');
  }

  function toggleLinkButton(toggle) {
    if (toggle === 'on') {
      let selection = document.getSelection().toString();
      if (!selection) return;
    }

    toggleButton(toggle, 'link');
  }

  function toggleUlListButton(toggle) {
    toggleButton(toggle, 'ul-list');
  }

  function toggleOlListButton(toggle) {
    toggleButton(toggle, 'ol-list');
  }

  function toggleAlignLeftButton(toggle) {
    toggleButton(toggle, 'align-left');
  }

  function toggleAlignRightButton(toggle) {
    toggleButton(toggle, 'align-right');
  }

  function toggleAlignCenterButton(toggle) {
    toggleButton(toggle, 'align-center');
  }

  function toggleAlignJustifyButton(toggle) {
    toggleButton(toggle, 'align-justify');
  }

  function toggleButton(toggle, type) {
    if (toggle === 'on') {
      document.getElementById(type).classList.replace('off', 'on');
    } else {
      document.getElementById(type).classList.replace('on', 'off');
    }
  }

  function toggleButtonsOnSelection(event) {
    let selected = document.getSelection().anchorNode;
    let textEditor = document.querySelector('div.text');
    
    if(textEditor.contains(selected) && textEditor.contains(selected.parentElement)) {
      let tags = [];
      
      while (selected.parentElement.id !== 'text-editor') {
        let tagName = selected.parentElement.tagName;
  
        if (tagName === 'B') {
          toggleBoldButton('on');
          tags.push(tagName);
        }
  
        if (tagName === 'I') {
          toggleItalicButton('on');
          tags.push(tagName);
        }
  
        if (tagName === 'U') {
          toggleUnderlineButton('on');
          tags.push(tagName);
        }
  
        if (tagName === 'STRIKE') {
          toggleStrikethroughButton('on');
          tags.push(tagName);
        }
  
        if (tagName === 'A') {
          toggleUnderlineButton('on');
          tags.push(tagName);
        }
  
        if (tagName === 'LI') {
          if (selected.parentElement.parentElement.tagName === 'UL') {
            toggleUlListButton('on');
            tags.push(selected.parentElement.parentElement.tagName);
          }
  
          if (selected.parentElement.parentElement.tagName === 'OL') {
            toggleOlListButton('on');
            tags.push(selected.parentElement.parentElement.tagName);
          }
        }

        if (tagName === 'UL') {
          toggleUlListButton('on');
          tags.push(tagName);
        }

        if (tagName === 'OL') {
          toggleOlListButton('on');
          tags.push(tagName);
        }

        if (tagName === 'DIV' || tagName === 'P' || tagName === 'LI') {
          let parent = selected.parentElement;
          let alignment = parent.style.textAlign;

          if (alignment === 'left') {
            toggleAlignLeftButton('on');
            toggleAlignRightButton('off');
            toggleAlignCenterButton('off');
            toggleAlignJustifyButton('off');
          } else if (alignment === 'right') {
            toggleAlignRightButton('on');
            toggleAlignLeftButton('off');
            toggleAlignCenterButton('off');
            toggleAlignJustifyButton('off');
          } else if (alignment === 'center') {
            toggleAlignCenterButton('on');
            toggleAlignLeftButton('off');
            toggleAlignRightButton('off');
            toggleAlignJustifyButton('off');
          } else if (alignment === 'justify') {
            toggleAlignJustifyButton('on');
            toggleAlignCenterButton('off');
            toggleAlignLeftButton('off');
            toggleAlignRightButton('off');
          } else {
            toggleAlignLeftButton('on');
            toggleAlignRightButton('off');
            toggleAlignCenterButton('off');
            toggleAlignJustifyButton('off');
          }

          while (parent.id !== 'text-editor') {
            parent.style.textAlign = alignment;
            parent = parent.parentElement;
          }
        }

        selected = selected.parentElement;
      }

      if (!tags.includes('B')) {
        toggleBoldButton('off');
      }

      if (!tags.includes('I')) {
        toggleItalicButton('off');
      }

      if (!tags.includes('U') && !tags.includes('A')) {
        toggleUnderlineButton('off');
      }

      if (!tags.includes('STRIKE')) {
        toggleStrikethroughButton('off');
      }

      if (!tags.includes('UL')) {
        toggleUlListButton('off');
      }

      if (!tags.includes('OL')) {
        toggleOlListButton('off');
      }
    }
  }
});
```