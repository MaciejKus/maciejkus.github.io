---
layout: post
title: "Bicycle or Walk"
date: 2015-05-26 14:40:11 -0700
comments: false
description: Bootstrap, Jquery, Google maps API and myGasFeed API this is a quick little comparison of driving and bicycling between two locations. 
---
Playing around with Bootstrap a tiny bit more I made a little [bicycle versus driving](http://maciejkus.com/bike-drive/) app. It's pretty simple in terms of the data that is shows. I used google maps and tabs, which do not get along very well, but luckily others have run into this problem in the past and there is a fair amount of recommendations out there. 

<!-- more -->

My app was unique because I use two separate tabs for two separate maps, and I want to load dynamic directions when the maps are presented. All the existing code I found only focused on a single map which did not have directions on it. After a bit, I was able to make things work the way I wanted them to.

I also used an API feed from myGasFeed.com. Playing with two separate APIs was a nice reminder of the asynchronous nature of AJAX.

I feel really comfortable with Bootstrap at this point. Time to find something new to experiment with?

