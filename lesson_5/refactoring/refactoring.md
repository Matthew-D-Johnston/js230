###### JS230 DOM and Asynchronous Programming with JavaScript > Putting it All Together

---

## Assignment: Refactoring

As we've already mentioned, although jQuery is a lot less prominent than it used to be, you'll still encounter it in a lot of legacy codebases. It's also not uncommon, however, for legacy code to be refactored in order to remove the jQuery and replace it with vanilla JavaScript and standard browser APIs. In fact, GitHub did exactly this to their entire front-end codebase in 2018. You can read about how they approached the task in [this blog post](https://github.blog/2018-09-06-removing-jquery-from-github-frontend/).  

In this assignment, we're going to ask you to do something similar, though on a much smaller scale. You'll start off with some code that uses jQuery, and replace the jQuery methods by using vanilla JavaScript and built in browser APIs.  

The main functionality of the program is the ability to dynamically add order lines to an Inventory Order Form using an 'Add Item' button, and to also delete a specific line item using a 'Delete' link on that item.  

The current implementation creates each order line by using jQuery to perform a string replacement using some pre-defined HTML located in a `<script>` element with an id of `inventory_item`. This kind of string replacement was a common approach for dynamically creating elements in the days before templating libraries. The major problem with this kind of approach is that it's not very scalable, and can quickly lead to overly complex and difficult to maintain code.  

These sorts of problems led to the emergence of templating libraries like Handlebars. As part of this refactoring project, you're going to replace this string replacement approach with a Handlebars template. So while removing one dependency in the form of jQuery, we're going to add a different one in the form of Handlebars.  

You can download the code for the current implementation [from this archive](https://d3905n0khyu9wc.cloudfront.net/managing_collections/inventory_order_form_start_code.zip) 

## How to Approach this Project

- Work incrementally. Remember that at its core, jQuery is just JavaScript. You can combine jQuery with vanilla JS.
  - In some cases you will be able to update one method at a time, and then test the functionality for that method.
  - In other cases, where there is a dependency between methods, updating one method may break something elsewhere in the code. Here, you may need to refactor more than one method in order to update a particular piece of functionality
- Understand what the program is doing at a high-level
- Understand what the jQuery is doing. This will involve using the jQuery documentation to research a particular method or some jQuery syntax.
- Find the vanilla JS/ browser API equivalent. Remember that jQuery is an abstraction of existing browser functionality.

You might find the following resources useful:

- [Cheat sheet for moving from jQuery to vanilla JavaScript](https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/)
- [You might not need jQuery](http://youmightnotneedjquery.com/)

---

### Original Code

```javascript
var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      $("#order_date").text(date.toUTCString());
    },
    cacheTemplate: function() {
      var $iTmpl = $("#inventory_item").remove();
      this.template = $iTmpl.html();
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function($item) {
      var id = this.findID($item),
          item = this.get(id);

      item.name = $item.find("[name^=item_name]").val();
      item.stock_number = $item.find("[name^=item_stock_number]").val();
      item.quantity = $item.find("[name^=item_quantity]").val();
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add(),
          $item = $(this.template.replace(/ID/g, item.id));

      $("#inventory").append($item);
    },
    findParent: function(e) {
      return $(e.target).closest("tr");
    },
    findID: function($item) {
      return +$item.find("input[type=hidden]").val();
    },
    deleteItem: function(e) {
      e.preventDefault();
      var $item = this.findParent(e).remove();

      this.remove(this.findID($item));
    },
    updateItem: function(e) {
      var $item = this.findParent(e);

      this.update($item);
    },
    bindEvents: function() {
      $("#add_item").on("click", $.proxy(this.newItem, this));
      $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

$($.proxy(inventory.init, inventory));
```

### Refactored Code

```javascript
var inventory;

(function() {
  inventory = {
  	lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      document.getElementById('order_date').textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      var iTmpl;
      var inventoryItemScript = document.getElementById('inventory_item');
      if (inventoryItemScript !== null) {
        iTmpl = inventoryItemScript.parentNode.removeChild(inventoryItemScript);
      }
      this.template = iTmpl.innerHTML;
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    // More methods in here
    //
    //
    //
    bindEvents: function() {
      document.getElementById('add_item').addEventListener('click', this.newItem.bind(this));
      document.getElementById('inventory').addEventListener('click', this.deleteItem.bind(this));
      document.getElementById('inventory').addEventListener('blur', this.updateItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', inventory.init.bind(inventory));

```

##### Adding a new item with the "ADD ITEM" button

```javascript
add: function() {
  this.lastId++;
  var item = {
    id: this.lastId,
    name: "",
    stock_number: "",
    quantity: 1
  };
  this.collection.push(item);

  return item;
},
// ....
// ....
newItem: function(e) {
  e.preventDefault();
  var item = this.add(),
      $item = $(this.template.replace(/ID/g, item.id));

  $("#inventory").append($item);
},

bindEvents: function() {
  $("#add_item").on("click", $.proxy(this.newItem, this));
  // ...
  // ...
},
```

##### Modifications

```javascript
add: function() {
  this.lastId++;
  var item = {
    id: this.lastId,
    name: "",
    stock_number: "",
    quantity: 1
  };
  this.collection.push(item);

  return item;
},
// ....
// ....
newItem: function(e) {
  e.preventDefault();
  var item = this.add()
  
  var itemTemplate = Handlebars.compile(document.getElementById('inventory_item').innerHTML));
  
  var trItem = document.createElement('tr');
  trItem.innerHTML = itemTemplate(item);

  document.getElementById('inventory').appendChild(trItem);
},

bindEvents: function() {
	document.getElementById('add_item').addEventListener('click', this.newItem.bind(this));  	
  // ...
  // ...
},
```

##### Delete and Update Items (code to be modified)

```javascript
update: function($item) {
  var id = this.findID($item),
      item = this.get(id);

  item.name = $item.find("[name^=item_name]").val();
  item.stock_number = $item.find("[name^=item_stock_number]").val();
  item.quantity = $item.find("[name^=item_quantity]").val();
},
update: function(itemHTML) {
  var id = this.findID(itemHTML),
      item = this.get(id);

  // item.name = $item.find("[name^=item_name]").val();
  item.name = itemHTML.querySelector("[name^=item_name]").value;
  // item.stock_number = $item.find("[name^=item_stock_number]").val();
  item.stock_number = itemHTML.querySelector("[name^=item_stock_number]").value;
  // item.quantity = $item.find("[name^=item_quantity]").val();
  item.quantity = itemHTML.querySelector("[name^=item_quantity]").value;
},

  // ...
  
findParent: function(e) {
  // return $(e.target).closest("tr");
  return e.target.closest("tr");
},
findID: function(itemHTML) {
  // return +$item.find("input[type=hidden]").val();
  return +itemHTML.querySelector("input[type=hidden]").value;
},
deleteItem: function(e) {
  e.preventDefault();
  
  if (e.target.matches('a')) {
    // var $item = this.findParent(e).remove();
		var itemHTML = this.findParent(e);
    if (itemHTML.parentNode !== null) {
      itemHTML.parentNode.removeChild(itemHTML);
    }
    this.remove(this.findID(itemHTML));
  }
},
updateItem: function(e) {
  // var $item = this.findParent(e);
  var itemHTML = this.findParent(e);

  // this.update($item);
  this.update(itemHTML);
},
bindEvents: function() {
	// ...
  $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
  $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
},
```

##### Modifications

```javascript
```

---

### Final Code

###### HTML

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Inventory Order Form</title>
    <meta charset="UTF-8" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js"></script>
    <script src="javascripts/inventory_refactored.js"></script>
    <link rel="stylesheet" href="stylesheets/form.css" />
  </head>
  <body>
    <main>
      <form action="" method="post">
        <fieldset>
          <h1>Inventory Order Form</h1>
          <dl>
            <dt>Date Ordered</dt>
            <dd id="order_date"></dd>
            <dt>
              <label for="requester_name">Requester Name</label>
            </dt>
            <dd>
              <input name="requester_name" id="requester_name" type="text" />
            </dd>
          </dl>

          <h2>Shipping Address</h2>
          <dl>
            <dt>
              <label for="address1">Street Address</label>
            </dt>
            <dd>
              <input name="address1" id="address1" type="text" />
              <input name="address2" id="address2" type="text" />
            </dd>
          </dl>
          <dl class="partial">
            <dt>
              <label for="city">City</label>
            </dt>
            <dd>
              <input name="city" id="city" type="text" />
            </dd>
          </dl>
          <dl class="partial">
            <dt>
              <label for="state">State</label>
            </dt>
            <dd>
              <input name="state" id="state" type="text" maxlength="2" />
            </dd>
          </dl>
          <dl class="partial">
            <dt>
              <label for="zip">Zipcode</label>
            </dt>
            <dd>
              <input name="zip" id="zip" type="text" maxlength="5" />
            </dd>
          </dl>

          <h2>Items to order</h2>
          <script type="text/x-handlebars" id="inventory_item">
            <tr>
              <td>
                <input type="hidden" name="item_id_{{id}}" value="{{id}}" />
                <label for="item_name_{{id}}">Name</label>
                <input name="item_name_{{id}}" type="text" />
              </td>
              <td>
                <label for="item_stock_number_{{id}}">Stock Number</label>
                <input name="item_stock_number_{{id}}" type="text" maxlength="8" />
              </td>
              <td>
                <label for="item_quantity_{{id}}">Quantity</label>
                <input name="item_quantity_{{id}}" type="number" value="1" />
              </td>
              <td>
                <a href="#" class="delete">Delete</a>
              </td>
            </tr>
          </script>

          <table id="inventory">
          </table>

          <button type="button" id="add_item">Add item</button>
<!-- 
          <div class="actions">
            <input type="submit" value="Order inventory" />
          </div> -->
        </fieldset>
      </form>
    </main>
  </body>
</html>
```

###### JavaScript

```javascript
var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      document.getElementById('order_date').textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      var iTmpl;
      var inventoryItemScript = document.getElementById('inventory_item');
      if (inventoryItemScript !== null) {
        iTmpl = inventoryItemScript.parentNode.removeChild(inventoryItemScript);
      }
      this.template = iTmpl.innerHTML;
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(itemHTML) {
      var id = this.findID(itemHTML),
          item = this.get(id);

      item.name = itemHTML.querySelector("[name^=item_name]").value;
      item.stock_number = itemHTML.querySelector("[name^=item_stock_number]").value;
      item.quantity = itemHTML.querySelector("[name^=item_quantity]").value;
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add();
      var itemTemplate = Handlebars.compile(this.template);
      var trItem = document.createElement('tr');
      trItem.innerHTML = itemTemplate(item);
      
      document.getElementById('inventory').appendChild(trItem);
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },
    findID: function(itemHTML) {
      return +itemHTML.querySelector("input[type=hidden]").value;
    },
    deleteItem: function(e) {
      e.preventDefault();

      if (e.target.matches('a')) {
        var itemHTML = this.findParent(e);
        if (itemHTML.parentNode !== null) {
          itemHTML.parentNode.removeChild(itemHTML);
        }

        this.remove(this.findID(itemHTML));
      }
    },
    updateItem: function(e) {
      var itemHTML = this.findParent(e);

      this.update(itemHTML);
    },
    bindEvents: function() {
      document.getElementById('add_item').addEventListener('click', this.newItem.bind(this));
      document.getElementById('inventory').addEventListener('click', this.deleteItem.bind(this));
      document.getElementById('add_item').addEventListener('click', event => {
        var itemInputs = document.querySelectorAll('#inventory input');

        for (let index = 0; index < itemInputs.length; index += 1) {
          itemInputs[index].addEventListener('blur', this.updateItem.bind(this));
        }
      });
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', inventory.init.bind(inventory));
```

