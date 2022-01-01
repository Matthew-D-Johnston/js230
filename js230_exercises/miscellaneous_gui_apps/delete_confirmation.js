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

