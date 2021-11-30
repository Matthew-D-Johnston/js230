###### JS230 DOM and Asynchronous Programming with JavaScript > JavaScript Libraries

---

## Practice Problems: Using jQuery Selectors

To work these practice problems, open [this HTML file](https://d3jtzah944tvom.cloudfront.net/jquery_selectors/index.html) in Google Chrome or your favorite browser, view its source, and then use the console pane of the browser Developer Tools to enter the requested code. Once you have selected the elements, you can add a "highlight" class to them with `.addClass('highlight')` to visually change the page so you can verify your results. Refresh the page to clear the highlights.  

If you need to check the class or id of a particular element, you can right click on that element in the browser window and select `Inspect Element` from the menu.  

Some of the jQuery methods that you need to use will have been covered in previous assignment. For others, you may need to research the documentation. If you get stuck, feel free to check the hints.  

1. Use an element selector to find all `h1` elements.

   ###### My Solution

   ```javascript
   let $h1 = $('h1');
   ```

   ###### LS Solution

   ```javascript
   $('h1');
   ```

2. Use an ID selector to find the first `h1` element.

   ###### My Solution

   ```javascript
   $('#site_title');
   ```

   ###### LS Solution

   ```javascript
   $('#site_title');
   ```

3. Use a descendant selector to find all the list items in the `article` element.

   ###### My Solution

   ```javascript
   $('article.blog_article_block').find('li');
   ```

   ###### LS Solution

   ```javascript
   $('article li');
   ```

4. Find the third list item from the `article` element.

   ###### My Solution

   ```javascript
   $('article li').eq(2);
   ```

   ###### LS Solution

   ```javascript
   $('article li').eq(2);
   ```

5. Find the table element, then find all the odd-numbered table rows in that element.

   ###### My Solution

   ```javascript
   $('table tr').filter(':even');
   ```

   ###### LS Solution

   ```javascript
   $('table').find('tr').filter(':odd');
   // or
   $('table').find('tr:odd');
   ```

6. Find the list item that contains the text *ac ante*, then locate the parent `li` element.

   ###### My Solution

   ```javascript
   $('li ul li').filter(':contains(ac ante)');
   // and for the parent li element
   $('li ul li').filter(':contains(ac ante)').parent().closest('li');
   ```

   ###### LS Solution

   ```javascript
   $('li li').filter(":contains('ac ante')").parents('li');
   // or
   $("li li:contains('ac ante')").parents('li');
   ```

7. Find the list item that contains the text *ac ante*, then find and return the next element.

   ###### My Solution

   ```javascript
   $('li li').filter(":contains('ac ante')").next();
   ```

   ###### LS Solution

   ```javascript
   $("li li:contains('ac ante')").next();
   ```

8. Find all the table cells in the table, then find the last cell from the collection.

   ###### My Solution

   ```javascript
   $('td').last();
   ```

   ###### LS Solution

   ```javascript
   $('table td').last();
   // or
   $('table td').eq(-1);
   ```

9. Find all the table cells that do not have a class of `"protected"`.

   ###### My Solution

   ```javascript
   $('table td').not('.protected');
   ```

   ###### LS Solution

   ```javascript
   $('td').not(".protected");
   // or
   $('td:not(".protected")');
   ```

10. Find all the anchor elements that have an `href` value that begins with #.

    ###### My Solution

    ```javascript
    $("a[href='#']");
    ```

    ###### LS Solution

    ```javascript
    $('a[href^=#]');
    ```

11. Find all elements that have a class name that contains `"block"`.

    ###### My Solution

    ```javascript
    $('[class*=block]');
    ```

    ###### LS Solution

    ```javascript
    $('[class*=block]');
    ```

    

