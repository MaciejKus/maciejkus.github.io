---
layout: post
title: "New Website"
date: 2015-10-11 15:38:33 -0700
comments: false
description: tech website
categories: css, html, metalsmith, handlebars.js, sys admin
---

I made a new website. The idea is to create a <a href='http://adminhacks.com/'>IT technician information</a> website. Something for those looking to get into system administration or network administration, but not really knowing where to start. The idea is to write some posts and code some useful tools for those looking to get on the Internet, whether that be by running a web-server, or improving their home routing, or setting up an IPv6 tunnel.

<!-- more -->

The site is a static html site running off a very low power VPS. It can handle a decent amount of traffic, but if it ever got a reddit hug of death or got slashdotted, it would probably become unaccessible fairly quickly. Setting up nginx was about all that needed to be done on the server side to get the site up and running.

The content is largely created using <a href='http://www.metalsmith.io/'>metalsmith</a> which is JavaScript based static site generator (though it can be used for a lot more than that). I use handlebars.js templates and markdown to make my life a bit easier. The setup is very basic. My build.js file looks like this:

``` 
var Metalsmith = require('metalsmith'),
  templates = require('metalsmith-templates'),
  collections = require('metalsmith-collections'),
  markdown = require("metalsmith-markdown");


Metalsmith(__dirname)
    .use(collections({
        articles: {
          pattern:'*.md',
          sortBy: 'date',
          reverse: true
       }
     }))
    .use(markdown())
    .use(templates('handlebars'))
    .destination('./build')
    .build(function(err) {
	if (err) console.log(err);
  })
```

Nothing too fancy. The collections() part allows me to create an array of all the markdown posts which I can then input into the handlebars.js templates to create an <a href='http://adminhacks.com/all-articles.html'>all posts</a> page. 

There is a source/ directory, which the above build.js takes, runs the above functions on and spits out into a build/ directory.


