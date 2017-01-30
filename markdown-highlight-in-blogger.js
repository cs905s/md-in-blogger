//
// markdown-highlight-in-blogger.js -- javascript for using Markdown in Blogger
// Based on Francis Tang's http://blog.chukhang.com/2011/09/markdown-in-blogger.html
// Copyright (c) 2017 Divya van Mahajan
//
// Redistributable under a BSD-style open source license.
// Documentation: http://js-react.blogger.com/
//

// namespace
var MarkdownHighlightInBlogger = {};

MarkdownHighlightInBlogger.convertMD = function () {
  try {

    console.info('Converting markdown using jQuery');

    // showdown renderer
    var converter = new showdown.Converter({});
    converter.setFlavor('github');
    $('pre.markdown').each(function (i, block) {
      var rawtext = block.innerText;
      var md_html = converter.makeHtml(rawtext);
      var md = $(md_html); //.css('border','3px solid blue');
      md.insertBefore(block);
      block.hidden = true;
    });
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
  } catch (exc) {
    console.error(exc);
  }
};

$(document).ready(MarkdownHighlightInBlogger.convertMD);

