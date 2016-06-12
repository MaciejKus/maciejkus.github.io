---
layout: post
title: "browser latency check"
date: 2016-06-03 13:57:47 -0700
comments: false
description: 
categories: javascript
---

Modern browsers have a really cool feature called resource timing. See here:
https://www.w3.org/TR/resource-timing/
It allows a much more accurate way of measuring latency within the browser. Specifically, separates out things like DNS requests, cache replies, TCP header data etc. This means that a modern browser can be used to make a speed measurement in a very similar way that the PING command is used. 

I created a little app which uses this resource timing to compare IPv4 and IPv6 latency directly within the browser. From my own testing the resulting times are very similar to ping times. 

A browser is unable to directly access ICMP packets, so one cannot perform operations such as traceroute or ping directly from the browser, but now one can replicate ping to a very accurate level directly from the browser.

You can see this browser latency test at http://maciejkus.com/latency-v6-v4/

I also added a fallback test for older browsers. This is much less accurate and uses the loadtime of an image. 
