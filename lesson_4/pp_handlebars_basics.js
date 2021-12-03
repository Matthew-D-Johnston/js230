"use strict";

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
