---
layout: post
title: "jumpy jquery slide animation"
date: 2015-10-11 13:00:21 -0700
comments: false
description: How to solve jumpy jQuery animations such as slide
categories: jquery, css
---

CSS uses collapsing margins. What this means is that when two objects both have a margin value which overlaps, the margins are combines. So say you have two buttons, both of which have margin: 24px;.

Rather than creating a space of 48px between the two, CSS combines or collapses the margins into one value of 24px.

This is fine most of the time, but is a long known issue with jQuery animations. Here's a 5 year old post describing it:
http://bugs.jquery.com/ticket/7442

Basically jQuery animations become jumpy when margins are combined. I haven't looked too in-depth into the jQuery code to see exactly how animations like .slide() work, but the collapsing margins are the reason for the jumpiness. 

The solution is simply to remove any overlapping margins in the element which is being animated, along with any bordering elements. Istead of having two buttons both of which have a margin value of 24px (but combined CSS still only created a 24px margin between the two) have one of the buttons have a 0px margin and the other a 24px margin. The space between them will still be the same, and now jQuery animations looks smooth.
