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
