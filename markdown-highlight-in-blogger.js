//
// markdown-highlight-in-blogger.js -- javascript for using Markdown in Blogger
//
// Copyright (c) 2011 Francis Tang.
//
// Redistributable under a BSD-style open source license.
//
// Documentation: http://blog.chukhang.com/2011/09/markdown-in-blogger.html .
//

// namespace
var MarkdownHighlightInBlogger = {};

// Function to load dependent scripts before calling callback
MarkdownHighlightInBlogger.loadScripts = function (urls, callback)
{
    // hash[url] = 1 if url not loaded and 0 otherwise
    var hash = {};
    for (i in urls) {
	var url = urls[i];
	hash[url] = 1;
    }
    // invariant: count is sum of values in hash
    var count = urls.length;

    // internal callback; will eventually call callback once all scripts are loaded
    var mycallback = function(url) {
	return function () {
	    if (hash[url] > 0) {
		hash[url]--;
		count--;
	    }
	    if (count == 0)
		callback();
	    if (count < 0)
		alert('oh crap ' + count);
	}
    }

    var head = document.getElementsByTagName('head')[0];
    for (var i in urls) {
	var url = urls[i];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// then bind the event to the callback function 
	// there are several events for cross browser compatibility
	script.onreadystatechange = mycallback(url);
	script.onload = mycallback(url);

	// fire the loading
	head.appendChild(script);
    }
};


// These are the scripts we need
MarkdownHighlightInBlogger.URL_PREFIX = 'http://markdown-in-blogger.appspot.com/';
MarkdownHighlightInBlogger.SCRIPTS = [
    MarkdownHighlightInBlogger.URL_PREFIX + 'getelementsbyclassname.js', // getElementsByClassName for compatibility with IE
    MarkdownHighlightInBlogger.URL_PREFIX + 'highlight.pack.js', // highlight.pack.js
    MarkdownHighlightInBlogger.URL_PREFIX + 'showdown.js' // showdown.js
]

// Main entry point for doing the magic
MarkdownHighlightInBlogger.main = function () {
    // Enable highlight.js syntax highlighting
    hljs.initHighlightingOnLoad();

    // showdown renderer
    var converter = new Showdown.converter();

    var elements = getElementsByClassName('markdown');

    for (var i = 0; i < elements.length; i++) {
	// <pre> elt with markdown source
	var raw = elements[i];
	// parent of <pre> element
	var parent = raw.parentNode;

	// pull out markdown source, make sure we get real angle brackets
	var text = unescapeHTML(raw.innerHTML);

	// rendered source
	var html = converter.makeHtml(text);
	var rendered = document.createElement("div");
	rendered.id = "rendered_" + i;
	rendered.innerHTML = html;
	parent.insertBefore(rendered, raw);

	// raw version of source
	raw.id = "raw_" + i;
	raw.style.display = "none";

	// element to toggle between raw and rendered versions
	var toggle = document.createElement("span");
	toggle.className = "raw_rendered_toggle";
	toggle.innerHTML = "raw/rendered";
	toggle.onclick = toggleCallback(i);
	parent.appendChild(toggle);
    }
};

// callback to toggle between raw and rendered versions
var toggleCallback = function (idx) {
    return function () {
	var raw_id = "raw_" + idx;
	var rendered_id = "rendered_" + idx;
	var raw = document.getElementById(raw_id);
	var rendered = document.getElementById(rendered_id);
	raw.style.display = (raw.style.display == "none") ? "block" : "none";
	rendered.style.display = (raw.style.display == "none") ? "block" : "none";
    }
};

// From http://erlend.oftedal.no/blog/?blogid=14
var unescapeHTML = function (html) {
    var htmlNode = document.createElement("DIV");
    htmlNode.innerHTML = html;
    if(htmlNode.innerText !== undefined)
        return htmlNode.innerText; // IE
    return htmlNode.textContent; // FF
};


// Load scripts and run
MarkdownHighlightInBlogger.loadScripts(MarkdownHighlightInBlogger.SCRIPTS, MarkdownHighlightInBlogger.main);