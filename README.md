# Embedding Markdown in a Blogger HTML page.
This originally was on my blog at https://js-react.blogspot.com/2017/01/using-markdown-in-blogger.html.

[Markdown](http://daringfireball.net/projects/markdown/) has become very popular due to its simplicity and its wide adoption in Github and other developer websites. So when I was looking at Blogger to start a blog, I wanted the same easy syntax. I had expected that Blogger would support Markdown natively. Alas it does not. 

I found [Francis's blog](http://blog.chukhang.com/2011/09/markdown-in-blogger.html) that explained on how to do this on the client side (no server needed!). Unfortunately it was written a few years ago and there was no updated docs on the steps to do it. So I rolled up my sleeves and took the same approach but using the latest versions of CDN hosted [jQuery](http://www.jquery.com), highlightJS (https://highlightjs.org) and [showDown](https://github.com/showdownjs) libraries. 

jQuery had the nice bonus of cleaning up the previous code by abstracting away the DOM manipulation.

**Caveat - your post shows up as Markdown in RSS feeds.**

## Adding markdown to your Blogger

   1. Open your template, by clicking the "Template" menu item. This displays the current template. Click Edit to modify the template. At the top of your template, add the following tags just before the &lt;/head&gt; tag.
```html
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min.css"/>
```

   2. At the bottom of the template, add the following tags just before the </html> tag.
```html
<script src='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js' type='text/javascript'></script>
<script src='//cdnjs.cloudflare.com/ajax/libs/showdown/1.6.2/showdown.min.js' type='text/javascript'></script>
<script src='//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' type='text/javascript'></script>
<script src='//mxp22.surge.sh/markdown-highlight-in-blogger.js' type='text/javascript'></script>
```

   3. Save your template. The first three steps need to be done only once. If you have a mobile template, remember to adjust that template as well.

   4. Edit your post and switch from compose to HTML mode (buttons above the editor). Try out this sample.
```markdown
<pre class="markdown">
# Woo hoo!

[Markdown](http://daringfireball.net/projects/markdown/) is cool!

\```javascript
// Verify code highlighting
if (today==rainy) {
return false;
}
\```
</pre>

```

   5. Any HTML **pre** tags with the class **markdown** are converted by showdown. After this any HTML code tags in the generated HTML are highlighted by highlightJS. 

   6. Remember to escape your &amp; with &amp;amp;, < with &amp;lt; and > with &amp;gt;. Also remember to not include tabulations and ensure markdown is formatted correctly, you can verify it using a markdown editor.

   6. Save your post. Preview or Publish the post.
   7. Now go and start [mastering Markdown at Github](https://guides.github.com/features/mastering-markdown/)
   8. If you don't have a Markdown editor, use [StackEdit](https://stackedit.io/editor) for a browser Markdown editor.
## How it works.

   1. Finds `pre` elements marked with `class='markdown'` with jQuery.  
   2. Showdown converts the markdown text content into html and injects
      that back into the post before the pre (and hides the pre).
   3. Each code section in the converted HTML is color highlighted by HighlightJS.


I have set the showdown convertor to to GitHub flavor markdown. 
The libraries are hosted by the kind folks at [cdnjs](http://cdnjs.com). The core javascript is hosted on the [surge.sh](http://surge.sh) CDN.

