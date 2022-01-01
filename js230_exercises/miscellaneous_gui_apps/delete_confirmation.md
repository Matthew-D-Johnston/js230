###### JS230 — Front-end Development with JavaScript > Miscellaneous GUI Apps

---

## A Custom Delete Confirmation Prompt

Create an application that displays a list of todos. When the user wants to delete a todo, the application should show a custom confirmation dialog.

#### Specifications

- Create a list of todos in the DOM from a JavaScript collection (array) of todos.
- Add a delete button for each todo.
- When the user clicks the delete button, a dialog appears asking the user to confirm the deletion.
  - Use CSS to display the dialog.
  - The dialog has Yes and No buttons.
  - When the user clicks the Yes button, the dialog disappears, and the corresponding todo is deleted.
  - When the user clicks the No button, the dialog disappears, and the todo is not deleted.

You can start with a collection of your choice. Here's the collection used in our demo app:  

```javascript
todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];
```

You can use the `id` property for each todo object to identify the todo item to remove from the DOM. Most applications use a `data-id` HTML attribute to identify DOM items.  

#### My Solution

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Todos</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="delete_confirmation.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js" integrity="sha512-RNLkV3d+aLtfcpEyFG8jRbnWHxUqVZozacROI4J2F1sTaDqo1dPQYs01OMi1t1w9Y2FdbSCDSQ2ZVdAC8bzgAg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="delete_confirmation.js"></script>
  </head>
  <body>
    <h1>Todos</h1>
    <ul id="todos">
    </ul>
    <div id="dialog">
      <p>Are you sure you want to delete this todo?</p>
      <div class="button">
        <button id="yes" type="button">Yes</button><button id="no" type="button">No</button>
      </div>
    </div>
    <div id="modal"></div>
    <script id="todo_list" type="text/x-handlebars">
      {{#each todo}}
      {{> todo_template}}
      {{/each}}
    </script>

    <script id="todo_template" data-type="partial" type="text/x-handlebars">
      <li data-id="{{id}}">{{title}}<a href="#">x</a></li>
    </script>
  </body>
</html>
```

###### CSS

```css
@import url("whitespace-reset.css");

body {
  background: #236643;
}



h1 {
  font-size: 30px;
  color: #fff;
  margin: 40px 0 0 25px;
}

ul {
  width: 600px;
  margin-left: 60px;
  margin-top: 20px;
}

li {
  font-size: 18px;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
}

a {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  position: relative;
  top: -8px;
  color: red;
  text-decoration: none;
  float: right;
}

#modal {
  display: none;
  z-index: 1;
  position: absolute;
  background: black;
  opacity: 30%;
  width: 100%;
  height: 100%;
  top: 0;
}

#dialog {
  display: none;
  position: absolute;
  z-index: 2;
  top: 20%;
  left: 40%;
  width: 450px;
  height: 150px;
  background: #fff;
  border-radius: 4px;
}

div > p {
  font-size: 18px;
  margin-top: 30px;
  margin-left: 20px;
}

div.button {
  float: right;
  margin-right: 15px;
  margin-top: 50px;
}

div button {
  font-size: 20px;
  font-family: 'Times New Roman', Times, serif;
  color: #fff;
  border: none;
  border-radius: 3px;
  width: 55px;
  height: 30px;
}

div button:hover {
  cursor: pointer;
}

#yes {
  background: #9F1331;
  margin-right: 5px;
}

#no {
  background: #279F36;
}
```

###### JavaScript

```javascript
"use strict";

const todoItems = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

document.addEventListener('DOMContentLoaded', () => {
  let todoItemsCopy = createCopyOfTodoItems(todoItems);

  renderTodoList();

  document.getElementById('todos').addEventListener('click', event => {
    let target = event.target;

    if (target.tagName === 'A') {
      let todoId = Number(target.closest('li').dataset.id);

      let dialogBox = document.getElementById('dialog');
      dialogBox.style.display = 'inline-block';

      let modal = document.getElementById('modal');
      modal.style.display = 'inline-block';
      
      document.querySelector('div.button').addEventListener('click', event => {
        let target = event.target;
        
        if (target.id === 'yes') {
          todoItemsCopy = todoItemsCopy.filter(item => {
            return item.id !== todoId;
          });
          renderTodoList();
          dialogBox.style.display = 'none';
          modal.style.display = 'none';
        } else if (target.id === 'no') {
          dialogBox.style.display = 'none';
          modal.style.display = 'none';
          todoId = null;
        }
      });
    }
  });


  function createCopyOfTodoItems(todos) {
    return todos.slice();
  }

  function renderTodoList() {
    let todoList = Handlebars.compile(document.getElementById('todo_list').innerHTML);
    let todoTemplate = Handlebars.compile(document.getElementById('todo_template').innerHTML);
    Handlebars.registerPartial('todo_template', document.getElementById('todo_template').innerHTML);

    let todoListHTML = todoList({ todo: todoItemsCopy });
    
    document.getElementById('todos').innerHTML = todoListHTML;
  }
});
```

#### LS Solution

###### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todos</title>
  <script src="jquery.js"></script>
  <script src="handlebars.js"></script>
  <link rel ="stylesheet" href="app.css">
</head>
<body>
	<h2>Todos</h2>
  <ul id="todos"></ul>
  
  <div class="overlay"></div>
  <div class="confirm_prompt"></div>
  <script id="todos_template" type="text/x-handlebars-template">
  		{{#each todos}}
  			<li data-id="{{id}}">{{title}} <span class="remove"></span></li>
  		{{/each}}
  </script>
  
  <script id="confirm_template" type="text/x-handlebars-template">
  	<div class="confirm_wrapper" data-id="{{id}}">
  		<p>Are you sure you want to delete this todo?</p>
  		<div class="actions">
  			<a href="#" class="confirm_yes">Yes</a>
  			<a href="#" class="confirm_no">No</a>
  		</div>
    </div>
  </script>
  
  <script src="app.js"></script>
</body>
</html>
```

###### CSS

```css
body {
  background: #226543;
  padding: 20px;
  color: #000;
  font-size: 18px;
}

h2 {
  color: #fff;
}

#todos {
  list-style: none;
  width: 600px;
}

#todos li {
  padding: 16px 20px 0 20px;
  box-sizing: border-box;
  background: #fff;
  color: #222;
  height: 50px;
  margin-bottom: 20px;
  text-indent: 0;
  border-radius: 5px;
  position: relative;
}
.confirm_prompt {
  display: none;
  width: 500px;
  height: 150px;
  position: absolute;
  z-index: 10;
  top: 150px;
  left: 50%;
  margin-left: -200px;
  border: 1px solid #ccc;
  background: #eee;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 20px;
}

.confirm_prompt .actions {
  position: absolute;
  right: 20px;
  bottom: 10px;
}

.confirm_prompt .actions a {
  display: inline-block;
  width: 60px;
  height: 25px;
  text-align: center;
  padding-top: 8px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
}

a.confirm_yes {
  background: #9f1331;
}

a.confirm_no {
  background: #289f37;
}

.overlay {
  display: none;
  position: absolute;
  z-index: 5;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.3);
}

  /*delete button styles*/
span.remove {
  width: 20px;
  height: 20px;
  position: absolute;
  display: inline-block;
  overflow: hidden;
  transform: rotate(45deg);
  right: 20px;
  cursor: pointer;
}

span.remove:hover {
  width: 24px;
  height: 24px;
}

span.remove:before, span.remove:after {
  background: #ec5555;
  content: "";
  position: absolute;
}
span.remove:before {
  height: 3px;
  top: 50%;
  right: 0;
  left: 0;
  margin-top: -1px;
}
span.remove:after {
  width: 3px;
  left: 50%;
  top: 0;
  bottom: 0;
  margin-left: -1px;
}
```

###### JavaScript

```javascript
var todoItems = [{id: 1, title: 'Homework'},
                {id: 2, title: 'Shopping'},
                {id: 3, title: 'Calling Mom'},
                {id: 4, title: 'Coffee with John'}];

var App = {
  todos: todoItems,
  todosTemplate: Handlebars.compile($('#todos_template').html()),
  confirmTemplate: Handlebars.compile($('#confirm_template').html()),
  $todos: $('ul#todos'),
  $confirm: $('.confirm_prompt'),
  
  renderTodos: function() {
    this.$todos.html(this.todosTemplate({ todos: this.todos }));
  },
  
  handleDeleteClick: function(e) {
    e.preventDefault();
    var todoId = Number($(e.target).closest('li').attr('data-id'));
    this.showPrompt(todoId);
  },
  
  handleConfirmYes: function(e) {
    var todoId = Number($(e.target).closest('.confirm_wrapper').attr('data-id'));
    e.preventDefault();
    this.removeTodo(todoId);
  },
  
  removeTodo: function(id) {
    this.todos = this.todos.filter(function(todo) {
      return todo.id !== id;
    });
    
    this.hidePrompt();
    this.renderTodos();
  },
  
  showPrompt: function(todoId) {
    this.$confirm.html(this.confirmTemplate({id: todoId}));
    this.$confirm.add('.overlay').show();
    this.bindPromptEvents();
  },
  
  bindPromptEvents: function() {
    this.$confirm.find('.confirm_no').one('click', this.hidePrompt.bind(this));
    this.$confirm.find('.confirm_yes').one(
    	'click',
    	this.handleConfirmYes.bind(this)
    );
  },
  
  hidePrompt: function() {
    this.$confirm.add('.overlay').hide();
    this.$confirm.html('');
  },
  
  init: function() {
    this.renderTodos();
    this.$todos.on('click', 'li.remove', this.handleDeleteClick.bind(this));
    $('.overlay').on('click', this.hidePrompt.bind(this));
  }
};

App.init();
```

