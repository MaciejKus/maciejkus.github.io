---
layout: post
title: "Canvas Match 3 Game"
date: 2015-09-29 09:39:45 -0700
comments: false
description: A simple canvas/javascript match-3 game
categories: javascript, games, canvas
---

I decided to make a match three game as a first step to learning a new game engine. Since Enchant.js is pretty much abandoned at this point, I figured it was time to try something new, and I decided on Phaser.js. So I start making the game, but it just seems that using a game engine was overkill for something as simple as a match-three game.

So I decided to save learning Phaser.js for a different project and just make the match-three game using plain old vanilla JavaScript and the html5 canvas element. Play it <a href='http://brogress.smoothiegains.com/smoothie_match/'>here</a>.

<!-- more -->

The coolest thing about making the game was dealing with all the animations. I split up the animations to only render the tile which is moving, instead of rendering the whole canvas every time something has to be changed. This saves a lot of resources, making the game run faster and smoother. The trick was to make sure that things didn't overlap.  The animations run asynchronously, so I had to avoid situations where multiple animations were running on top of one another, or that the logic from a running animation did not interfere with the logic of a new mouse click.

The game is pretty basic, but I was able to remove all the little glitches I came across when testing. I'm also pleased to have made a game where the graphics actually look OK. This is all thanks to finding creative commons images and playing with GIMP a little bit.
