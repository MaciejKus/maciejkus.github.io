---
layout: post
title: "jsbreakouts"
date: 2015-08-11 09:12:00 -0700
comments: false
categories: enchantjs, javascript, games
description: Enchant.js version of the classic Breakout game
---

There's a project, JavaScript [Breakouts](http://www.jsbreakouts.org/) which is a collection of different JavaScript game engines. All the game engines are used to create the same version of Breakout, with the same features, etc. It's a way to allow people to compare different game engines by looking at them in action. 

Since I've used enchant.js before, I figured I would add an enchant.js version to the Breakouts. The game can be played [here](http://www.jsbreakouts.org/enchantjs/index.html). Coding this game I realized that enchant.js is out of date. The last time it has been updated was around 2013. There was one [issue](https://github.com/wise9/enchant.js/issues/312) where I actually had to go in and change the code for enchant.js to make the game work. There is an outdated web audio line:


`this.src.disconnect(this.connectTarget);`

This caused Chrome and other webkit based browsers to issue a

`Uncaught InvalidAccessError: Failed to execute 'disconnect' on 'AudioNode': the given destination is not connected.`

error. This was fixed by changing the above line to

`this.src.disconnect();`

Before this change, the game would crash as soon as a sound was played. I see there are other issues with enchant.js. On older versions of Firefox the game does not finish loading. Instead it throws a 

`Error: failed in Deferred`

error. It's unfortunate, but it seems like enchant.js is no longer being maintained, and so I will have to find a new game engine to use, if I ever decide to use a game engine for a game.
