---
layout: post
title: "metalsmith-skeleton"
date: 2016-07-05 14:59:36 -0700
comments: false
categories: metalsmith
description: A blog skeleton for metalsmith. Used to quickly setup a metalsmith static website.
---

When I was first making a blog/site I wanted a static site, so I could host it on github pages without needing a backend. Octobers seemed like the best choice at the time because it was quick and easy to setup. Octopress is based on Jekyll, which is probably the most popular static website generator. It also had a number of pre-made templates which meant saving time on writing my own CSS. 

Basically, it was a quick and relatively easy way of getting a blog on maciejkus.com going. I now have plans to move the blog over to <a href="http://www.metalsmith.io/">metalsmith</a>. Metalsmith is written in JavaScript, and that alone is reason enough for me to switch over. I'm much more comfortable in a JavaScript/Nodejs environment than a Ruby one. I also find metalsmith to be a lot more customizable, and at this point I am much more interested in writing my own CSS rather than using a premade template. 

<!-- more -->

The move should not be very difficult as both Octopress and Metalsmith work from a source directory and all my posts are already in a markdown format. I've made a couple static websites using metalsmith, and have posted a <a href="https://github.com/MaciejKus/metalsmith-template">metalsmith skeleton</a> to github for myself and others to use when starting a metalsmith site/blog.

