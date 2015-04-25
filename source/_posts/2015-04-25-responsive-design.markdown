---
layout: post
title: "Responsive Design"
date: 2015-04-25 15:16:46 -0700
comments: false
categories: css
description: 
---
Responsive design in the idea that a webpage will respond to and accommodate the width of a browser. What this means is that if you are looking at a website on a small screen, such as those found in smart phones, the page will adjust to fit that small screen. Usually things that happen is the line height and font increase and the layout of the page becomes more vertical. Elements line up on top of one another rather than to the left or right of one another. 

My job's main webpage was designed years ago, well before mobile phones were widely used to browse the Internet. The webpage still works fine and the belief is that there is little reason to change the site. All the information that customers and potential customers may need can be easily found. However, up until a week ago the site looked pretty terrible on mobile devices. This was a problem, especially since Google was going to start punishing non-mobile friendly sites in its search results. 

I took a look at the existing CSS and realized I can make the site responsive. So I added some CSS media queries, removed some inline CSS, changed a tiny bit of html, and bam! Now on a desktop or wider screen the site looks exactly like it used to, but on a smaller screen or on a mobile phone the layout of the site is a lot more vertical and user friendly. 

<!--more-->

Making an existing page responsive is not too difficult. Most of the challenge revolves around understanding the existing CSS. First you want to understand what the page is doing and why it is doing it, and then you will be able to move elements around without breaking everything. The basic ideas are, make lots of elements have a width of 100%. This ensures elements are stacked vertically. Be sure to keep line heights larger than you would on a desktop, this is especially true for links. Hard to press links create a crummy user experience. 'Max-width' is your friend. This is especially true for images.

I didn't want to touch the existing HTML when I could help it, but there were a couple things I just couldn't help but touch up. On one page there was an empty table element which was used to create whitespace. I was easily able to remove this element and add the whitespace with CSS. It is considered best practice to separate the content of a page (HTML) from the design of the page (CSS). I also had to add a couple of classes to some HTML elements, but that doesn't affect anything in terms of the way the page looks. 

It was a neat little project, working with HTML and CSS that I originally had nothing to do with and trying to make the page work great on small screens while not changing anything on the desktop version. I remember the first time I tried to do anything with CSS I hated it, but now I realize that was because I was unfamiliar with it. 
