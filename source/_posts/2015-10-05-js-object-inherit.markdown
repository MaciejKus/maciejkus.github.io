---
layout: post
title: "JS object inherit"
date: 2015-10-05 16:43:56 -0700
comments: false
description: Proper JavaScript Inheritance
categories: javascript
---

As found here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript

Proper JavaScript inheritance looks like this:

//Inherit from Tower  prototype

<code>
var Tower2 = function(x,y,z) {
  Tower.call(this,x,y);
  this.z = z; //not from Tower
}
Tower2.prototype = Object.create(Tower.prototype);
Tower2.prototype.constructor = Tower2;
</code>

Mainly this post is a reminder for myself so I don't have to search to see if I got everything correct.
