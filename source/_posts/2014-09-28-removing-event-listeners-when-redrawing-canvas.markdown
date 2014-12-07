---
layout: post
title: "Removing Event Listeners When Redrawing Canvas"
date: 2014-09-28 15:43:08 -0700
comments: false
categories: canvas, html5, javascript, jquery
description: How to remove an event listener from a canvas element using Jquery.
---

<p>I was drawing a network graph using canvas, it had nodes and edges and when a user clicks on a node the canvas is redrawn. All of this is fine, but then I also wanted to have a navigation bar outside of the canvas which would redraw the canvas when that was clicked. Now redrawing the canvas is easy, but the redraw did not remove the event listeners from the previously drawn canvas. For example, say a node moves to the middle of the graph if it is clicked on. Even if the canvas is redrawn with that node gone, the event listener stayed around and when the user clicked on the section of the canvas where the node used to be, the event would still trigger and the node would be drawn in the middle of the graph. </p>
<!--more-->
<p>The problem came about because the navigation bar was outside of the scope of the canvas function. Even if I turned 'canvas' into a global variable, 'canvas.removeEventListener' did not work because the event handler was not a global variable. I could eventually moved enough of the variables into the global scope that maybe things would have worked. 'removeEventListener' worked fine when I used it inside the canvas function. But luckily the page was already using jQuery, so after playing around and giving up on 'removeEventListener', I moved on to use the jQuery 'on()' and 'off()' event handler functions. </p>
<p>The reason these worked so well is that using 'off()' without any arguments removes all event handlers which were added using the 'on()' function. You cannot mix 'addEventListener' and 'off()' together. But anything attached with a 'on()' was fair game. So all I needed to add to the sidebar was '$(canvas).off();' and any event listener attached to the canvas element was removed.</p>
