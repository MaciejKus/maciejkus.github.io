---
layout: post
title: "linux is cool"
date: 2015-04-13 14:46:23 -0700
comments: false
categories: linux
description: I like wget and sed.
---
I like wget and sed. Want to download a whole website? 
	wget -r --no-parent http://example.com/

Want to insert the test of input.txt after the head tag into all html files?
	sed -i '/<head>/r input.txt' *.html
Tools like these make life so easy.
