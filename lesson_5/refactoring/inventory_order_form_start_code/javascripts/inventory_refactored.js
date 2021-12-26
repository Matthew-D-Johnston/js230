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
