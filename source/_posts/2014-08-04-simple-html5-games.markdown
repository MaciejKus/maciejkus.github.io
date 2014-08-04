---
layout: post
title: "Simple HTML5 Games"
date: 2014-08-04 10:39:21 -0700
comments: false
categories: html5, javascript, games
description: A few HTML5 canvas games created while learning the basics of canvas
---
<p>
A while ago I wanted to work with graphics. Before then all I have ever coded were text based programs. Calculators, problem generators, text games, console scripts, etc. I figured a game would be the best way to do this and that HTML5/canvas would be the best area to learn. Internet browsers have largely adopted canvas and it works on all kinds of devices, including smart phones. I hope posting these early experiments will allow others to speed up their own learning of HTML5/canvas. 
</p>
<p>A coworker suggested I start with making a breakout style game and then move on to pong. My first step was to actually learn how to draw a <a href='../../../../../html5-games/ball_shadow.html'>circle</a>. Then how to move the circle. Once I got that down the rest was easy.
</p>
<!-- more -->
<p>OK, maybe not easy, but there is enough documentation out there that I was able to make  some simple graphical programs. Rather than dive right into breakout I made a little 'game' where balls simply bounce around in two 'rooms'. This was largely a way to practice collision detection and collision response before making a more advanced game. The result can be played <a href='../../../../../html5-games/click-balls.html'>here</a>. The collision response in the game is definitely lacking, but it worked well enough for me to feel like I understood how things should work.
</p>
<p>
After that I felt like I understood collisions well enough that I did not need to make a breakout game and instead could move straight to a pong game, which is what I did. Instead of regular pong I made it more of a wall-ball style game where both players are on the same side. It's pretty much pong, with a tiny difference. See it in action <a href='../../../../../html5-games/wallball.html'>here</a>.
</p>
<p>
Finally, I wanted something more advanced, so I made a space shooter game. Instead of trying to use sprites I just used basic canvas shapes like circles, but the idea works pretty well. Play it <a href='../../../../../html5-games/shooter.html'>here</a>.
</p>
<p>
The above three were all learning experiences, and I believe I could go through the code and make it a bit nicer and maybe more efficient today. I am posting them as I originally wrote them. No improvments or anything, but I found that looking at how other simple games were coded was very helpful. Hopefully looking at the page source for the above might be helpful for others who are starting out. 
</p>
