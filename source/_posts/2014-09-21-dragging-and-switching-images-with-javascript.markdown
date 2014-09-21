---
layout: post
title: "Dragging and Switching Images with JavaScript"
date: 2014-09-21 15:46:14 -0700
comments: false
categories: JavaScript, HTML5
description: A simple way to drag and drop images using HTML5 and JavaScript
---
<p>I needed a simple mechanism to drag and drop images from one place to another on a webpage. Using the HTML5 draggable, ondragstart and ondragover events I made a simple script which allows the user to drag an image, and then drop that image onto another image. The two images then switch positions on the page. The HTML code for each image looks something like this:
{% codeblock %}
<img src="imageSource.png" draggable="true" ondragstart="return dragStart(event)" ondragover="return dragOver(event)" ondrop="dragDrop(event)">
{% endcodeblock %}
draggable allows the image to be dragged. This is the default for most browsers when it comes to images, but it cannot hurt to explicitly set it.<br>
ondragstart is triggered when the dragging starts.<br>
ondragover is similar to a mouseover event. It is fired when the mouse is over the event.<br>
ondrop is fired when the mouse button is finally released.
The JavaScript looks like this:</p>
<!-- more -->
<p>
{% codeblock lang:javascript %}
var dragSrc = null; //used to store the dropped object

function dragStart(ev) {
	ev.dataTransfer.effectAllowed='move'; //allows the object to be moved
	dragSrc = ev.target; //sets the dragged object to be dragSrc
	return true;
}

function dragOver(e) {
	if (e.preventDefault) { //stop default browser action
		e.preventDefault(); // Allows us to drop.
	}
	return false;
}

function dragDrop(ev) {
	ev.preventDefault(); //stops default browser action
	if (dragSrc != ev.target) { //only if dropping onto another image, not self
		var x = dragSrc.outerHTML; //temp variable
		dragSrc.outerHTML = ev.target.outerHTML; //sets dragged object to current image
		ev.target.outerHTML = x; //set current image to dragged image
	}
	return false;
}
{% endcodeblock %}
</p>
<p>
This code should work for any kind of HTML, not only a img tag. You can see working demo of this at this <a href='http://subnettingpractice.com/ethernet_wiring.html'>Ethernet wire ordering</a> page. The JavaScript on that page is minified to make it load slightly faster, but you can see what the above is doing.
</p>
