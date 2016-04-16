---
layout: post
title: "phaser addColor text"
date: 2015-12-01 12:19:00 -0800
comments: false
categories: phaserjs
description: addColor in phaserjs for text is slow
---
So I am making a text game in Phaserjs. Right now I am working on a simple way to move a cursor around a bunch of text. I have a background rectangle which is the same color as the text and the size of a single letter. This is similar to VIM or other text editors. However when moving to a new letter the letter itself have to change color to contrast the background. Again, exactly what VIM and other text editors do.

I currently do this using a simple function:

    colorLetter: function(letter, color) {
      this.text.addColor(color, letter);
      this.text.addColor('#0f0', letter+1);
    }

where 'letter' is the position of the letter. This colors that letter and all the other letters a color 'color', and then the next line colors all letters after 'letter' back to green. 

The problem is, this addColor() function takes forever and the code ends up being really laggy. I might look into doing things with retroFont, or I might have to change the color schemes so that the letters are different colors than the cursor rectangle. Hmmm...
