---
layout: post
title: "canvas-game"
date: 2016-03-14 10:03:59 -0700
comments: false
categories: javascript, canvas, jasmine
description: A html5 canvas game
---

I wanted to try out Jasmine, which is a JavaScript unit testing library. I also had an idea for what could be a fun little <a href='/canvas-game/'>game</a>, so I went ahead and made a html5/canvas game and used Jasmine to test things as I coded.

<!-- more -->

Though there are some plug-ins out there to make Jasmine work with canvas rendering, I skipped those, so I didn't truly test everything. But I did test all the non-drawing aspects of the game.

The game is simple enough that I don't think the unit testing helped too much, but if I were to expand the game it is useful to have the existing tests in place.

The tricky thing about this game was all the math. Do you remember those smart aleck kids in math class who would ask the teacher when they would ever use the math that they were learning? Well, at times I felt like my work on this game justified as an answer for all those teachers. This might have been the first time I ever had to find the intersection of two line segments outside of a school setting.

The game is all vanilla JavaScript using the HTML5 canvas object. Play it <a href='/canvas-game/'>here</a>. The source code is on <a href='https://github.com/MaciejKus/canvas-fly-game'>github</a>. I am now familiar enough with Jasmine that I can and will use unit testing for future projects. Wins all around. 
