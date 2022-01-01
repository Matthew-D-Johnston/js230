###### JS230 — Front-end Development with JavaScript > Miscellaneous GUI Apps

---

## Programming Languages Info

A page that gives a description of one paragraph of a few programming languages of your choice and give the user the option to show/hide a portion of the paragraph.  

#### Requirements

- Create a collection of programming languages of your choice.
- Display a heading and a paragraph for each programming language.
- Initially, display the first 120 characters for each paragraph.
- There is a *Show More* button for each programming language.

#### Functionality

- When the user clicks the *Show More* button:
  - Display the entire paragraph about the corresponding language.
  - Change the button text to *Show Less*.
- When the user clicks the *Show Less* button:
  - Change the button text to *Show More*.
  - Hide all but the first 120 characters of the paragraph text.

You can choose any programming languages you want. Here's are some candidate languages you can use:

```javascript
const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];
```

#### My Solution

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Programming Languages Info</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="programming_languages_info.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js" integrity="sha512-RNLkV3d+aLtfcpEyFG8jRbnWHxUqVZozacROI4J2F1sTaDqo1dPQYs01OMi1t1w9Y2FdbSCDSQ2ZVdAC8bzgAg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="programming_languages_info.js"></script>
  </head>
  <body>
    <h1>Programming Languages</h1>
    <dl>
      
    </dl>
    <script id="languages_list" type="text/x-handlebars">
      {{#each languages}}
      {{> programming_language}}
      {{/each}}
    </script>

    <script id="programming_language" data-type="partial" type="text/x-handlebars">
      <div>
        <dt>{{name}}</dt>
        <dd>{{description}}</dd>
        <button type="button">Show More</button>
      </div>
    </script>
  </body>
</html>
```

###### CSS

```css
@import url("whitespace-reset.css");

body {
  background: #999900;
}

h1 {
  font-size: 32px;
  color: #fff;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

dl {
  background: #fff;
  width: 600px;
  margin: auto;
  border-radius: 3px;
  padding: 25px 20px;
}

dt {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

dd {
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
}

dd.show_more {
  overflow: visible;
  text-overflow: "";
  white-space: normal;
  height: 100%;
}

button {
  color: #fff;
  background: #999900;
  border-radius: 3px;
  margin-bottom: 15px;
  border: none;
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  width: 100px;
  height: 20px;
}

button:hover {
  cursor: pointer;
}
```

###### JavaScript

```javascript
"use strict";

const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  let languagesList = document.getElementById('languages_list');
  let programmingLanguageScript = document.getElementById('programming_language');

  let languagesListTemplate = Handlebars.compile(languagesList.innerHTML);
  let programmingLanguageTemplate = Handlebars.compile(programmingLanguageScript.innerHTML);
  Handlebars.registerPartial('programming_language', programmingLanguageScript.innerHTML);

  let languageListHTML = languagesListTemplate({ languages: languages });

  let languageList = document.querySelector('dl');
  languageList.innerHTML = languageListHTML;

  document.querySelector('dl').addEventListener('click', event => {
    let target = event.target;

    if (target.tagName === 'BUTTON' && target.innerText === 'Show More') {
      target.closest('div').querySelector('dd').classList.add('show_more');
      target.innerText = 'Show Less';
    } else if (target.tagName === 'BUTTON' && target.innerText === 'Show Less') {
      target.closest('div').querySelector('dd').classList.remove('show_more');
      target.innerText = 'Show More';
    }
  });
});
```

#### LS Solution

###### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Programming Languages</title>
  <link rel="stylesheet" href="app.css">
  <script src="jquery.js"></script> 
</head>
<body>
	<h1>Programming Languages</h1>
  <div id="languages">
    
  </div>
  <script src="app.js"></script>
</body>
</html>
```

###### CSS

```css
body {
  background: #999900;
}

h1 {
  text-align: center;
  color: #fff;
}

#languages {
  box-sizing: border-box;
  padding: 20px;
  width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 4px;
}

.more {
  display: inline-block;
  text-decoration: none;
  background: #990;
  color: #fff;
  text-align: center;
  width: 90px;
  border-radius: 4px;
}
```

###### JavaScript

```javascript
var languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, \
    general-purpose programming language. It was designed and developed in the mid-1990s \
    by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, \
    Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, \
    including functional, object-oriented, and imperative. It also has a dynamic type \
    system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted \
    programming language. It has been standardized in the ECMAScript language \
    specification. Alongside HTML and CSS, JavaScript is one of the three core \
    technologies of World Wide Web content production; the majority of websites employ \
    it, and all modern Web browsers support it without the need for plug-ins. JavaScript \
    is prototype-based with first-class functions, making it a multi-paradigm language, \
    supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages \
    with a long history and a distinctive, fully parenthesized prefix notation. \
    Originally specified in 1958, Lisp is the second-oldest high-level programming \
    language in widespread use today. Only Fortran is older, by one year. Lisp has changed \
    since its early days, and many dialects have existed over its history. Today, the best \
    known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

languages.forEach(function(lang) {
  lang.description = lang.description.replace(/\s{2,}/g, ' ');
});

function renderLanguages() {
  languages.forEach(function(lang) {
		var $langDiv = $('<div class=lang></div>');
    
    $langDiv.attr('data-lang', lang.name);
    $langDiv.append($('<h2>').text(lang.name));
    $langDiv.append($('<p>').text(lang.description.slice(0, 120) + ' ...'));
    $langDiv.append($('<a href=# class=more>').text('Show More'));
    
    $('#languages').append($langDiv);
  });
}

renderLanguages();

$('.more').on('click', function(e) {
  var $btn = $(e.target);
  var $langDiv = $btn.closest('.lang');
  var langName = $langDiv.attr('data-lang');
  var langObj = languages.filter(function(lang) { return lang.name === langName; })[0];
  
  if ($btn.text() === 'Show More') {
    $langDiv.find('p').text(langObj.description);
    $btn.text('Show Less');
  } else {
    $langDiv.find('p').text(langObj.description.slice(0, 120) + ' ...');
    $btn.text('Show More');
  }
});
```

