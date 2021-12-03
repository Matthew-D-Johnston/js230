###### JS230 DOM and Asynchronous Programming with JavaScript > JavaScript Libraries

---

## Practice Problems: Handlebars Basics

To test your work with Handlebars, download a copy of Handlebars from [its homepage](http://handlebarsjs.com/) and include it in the `head` element of a blank HTML file. You could also bring it in directly from a public CDN (Content Delivery Network) with a `script` tag like this:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js"></script>
```

We are going to work with a Handlebars template for a blog post and a post object:

```html
<script id="post" type="text/x-handlebars">
  <article>
    <h1>{{title}}</h1>
    <p><time>Posted on {{published}}</time></p>
    {{body}}
  </article>
</script>
```

```javascript
let post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
};
```

Feel free to check [Handlebars website](http://handlebarsjs.com/) for references.

1. Locate the template by ID and compile it to a template function. Render the post to the `body` element using the function.

   ###### My Solution

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js"></script>
       <script
         src="https://code.jquery.com/jquery-3.6.0.js"
         integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
         crossorigin="anonymous">
       </script>
       <!-- <script src="pp_handlebars_basics.js"></script> -->
       <script id="post" type="text/x-handlebars">
         <article>
           <h1>{{title}}</h1>
           <p><time>Posted on {{published}}</time></p>
           {{body}}
         </article>
       </script>
       <script>
         let post = {
           title: 'Lormem ipsum dolor sit amet',
           published: 'April 1, 2015',
           body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
         }
   
         let template = $('#post').html();
         let templateScript = Handlebars.compile(template);
   
         let html = templateScript(post);
   
         $(document).ready(function () {
           $(document.body).append(html);
         });
       </script>
     </head>
     <body>
   
     </body>
   </html>
   ```

   ###### LS Solution

   ```javascript
   // Using jQuery
   let postTemplate = Handlebars.compile($('#post').html());
   
   // Using JavaScript
   let postTemplate = Handlebars.compile(document.getElementById('post').innerHTML);
   
   $('body').append(postTemplate(post));
   ```

2. Change your `post` object's `body` property to contain HTML elements as part of the string. Modify your Handlebars template to allow HTML to be output unescaped.

   ###### My Solution

   ```html
   <script id="post" type="text/x-handlebars">
     <article>
       <h1>{{title}}</h1>
       <p><time>Posted on {{published}}</time></p>
       {{{body}}}
     </article>
   </script>
   <script>
     let post = {
           title: 'Lormem ipsum dolor sit amet',
           published: 'April 1, 2015',
           body: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>'
         }
   
   // ....
   </script>
   ```

   ###### LS Solution

   ```javascript
   post.body = '<p>' + post.body '</p>';
   ```

   ```html
   <script id="post" type="text/x-handlebars">
   	<article>
   		<h1>{{title}}</h1>
   		<p><time>Posted on {{published}}</time></p>
   		{{{body}}}
   	</article>
   </script>
   ```

3. Add a property called `tags` on the `post` object that will be an array of strings to represent tags added to the blog post. Use the Handlebars [`each` built-in helper](https://handlebarsjs.com/guide/builtin-helpers.html#each) to output all tags for the post.

   ###### My Solution

   ```javascript
   post.tags = ['#lorem', '#totam', '#nemo'];
   ```

   ```html
   <script id="post" type="text/x-handlebars">
     <article>
       <h1>{{title}}</h1>
       <p><time>Posted on {{published}}</time></p>
       {{{body}}}
     </article>
     <p>
       {{#each tags}}
         {{this}}
       {{/each}}
     </p>
   </script>
   ```

   ###### LS Solution

   ```javascript
   post.tags = ['Food', 'Cooking', 'Vegetables'];
   ```

   ```html
   <script id="post" type="text/x-handlebars">
     <article>
       <h1>{{title}}</h1>
       <p><time>Posted on {{published}}</time></p>
       {{{body}}}
       <footer>
         <p>
           Tags:
           {{#each tags}}
           <strong>{{this}}</strong>
           {{/each}}
         </p>
       </footer>
     </article>
   </script>
   ```

4. Create a separate template for the HTML element that wraps each tag. Using the handlebars partial method, register the template as a partial using the name "tag" and replace the HTML for tags in the main template with a reference to the partial.

   ###### My Solution

   Unknown

   ###### LS Solution

   ```html
   <script id="tag" type="text/x-handlebars">
     <strong>{{this}}</strong>
   </script>
   
   <script id="post" type="text/x-handlebars">
     <article>
       <h1>{{title}}</h1>
       <p><time>Posted on {{published}}</time></p>
       {{{body}}}
       <footer>
         <p>
           Tags:
           {{#each tags}}
           {{>tag}}
           {{/each}}
         </p>
       </footer>
     </article>
   </script>
   ```

   ```javascript
   Handlebars.registerPartial('tag', $('#tag').html());
   ```

5. Create a `posts` array, adding the existing post to it. Add a second post with no tags property. Modify your template to check for the existence of tags, and if none exist, output a "Not tagged" message. Wrap the template in an each loop to output each post.

   ###### My Solution

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js"></script>
       <script
         src="https://code.jquery.com/jquery-3.6.0.js"
         integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
         crossorigin="anonymous">
       </script>
       <!-- <script src="pp_handlebars_basics.js"></script> -->
       <script id="tag" type="text/x-handlebars">
         <strong>{{this}}</strong>
       </script>
   
       <script id="post" type="text/x-handlebars">
         {{#each posts}}
         <article>
           <h1>{{title}}</h1>
           <p><time>Posted on {{published}}</time></p>
           {{{body}}}
           <footer>
             <p>
               {{#if tags}}
                 Tags:
                 {{#each tags}}
                 {{>tag}}
                 {{/each}}
               {{else}}
                 Not tagged
               {{/if}}
             </p>
           </footer>
         </article>
         {{/each}}
       </script>
       <script>
         let posts = [];
         let post = {
           title: 'Lormem ipsum dolor sit amet',
           published: 'April 1, 2015',
           body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
         };
   
         let post2 = {
           title: 'Yolo',
           published: 'July 2, 2021',
           body: 'What are we going to do now, Brain?'
         };
   
         posts.push(post);
         posts.push(post2);
   
         post.body = '<p>' + post.body + '</p>';
         post.tags = ['Food', 'Cooking', 'Vegetables'];
   
         let template = $('#post').html();
         let templateScript = Handlebars.compile(template);
         Handlebars.registerPartial('tag', $('#tag').html());
   
         let html = templateScript({posts});
   
         $(document).ready(function () {
           $(document.body).append(html);
         });
       </script>
     </head>
     <body>
     </body>
   </html>
   ```

   ###### LS Solution

   ```javascript
   let posts = [
     {
       title: 'voluptate velit',
       published: 'April 2, 2015',
       body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
     }
   ];
   posts.push(post);
   
   let postsTemplate = Handlebars.compile(document.getElementById('posts').innerHTML);
   
   $('body').append(postsTemplate({ posts: posts }));
   ```

   ```html
   <script id="posts" type="text/x-handlebars">
     {{#each posts}}
     <article>
       <h1>{{title}}</h1>
       <p><time>Posted on {{published}}</time></p>
       {{{body}}}
       <footer>
         <p>
           {{#if tags}}
           Tags:
           {{#each tags}}
           {{>tag}}
           {{/each}}
           {{else}}
           Not tagged
           {{/if}}
         </p>
       </footer>
     </article>
     {{/each}}
   </script>
   ```

   