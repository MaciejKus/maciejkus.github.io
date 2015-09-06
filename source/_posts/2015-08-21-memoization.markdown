---
layout: post
title: "memoization"
date: 2015-08-21 13:59:37 -0700
comments: false
categories: javascript
description: 
---

It's pretty amazing how much faster caching makes code. I was doing a CodeWars exercise trying to go through an array and find the first (left most) pair of numbers which add up to a given sum (`s`). I first tried:
 
```
var pairs=function(ints, s){
  for(var i = 1, j= ints.length; i < j; i++) {
    for (var x = 0; x < i; x++) {
      if(ints[i] + ints[x] === s) return [ints[x],ints[i]];
    }
  }   
  return undefined;
}
```
Pretty self explanatory, it goes through the array and for every number goes through all the numbers before that one to see if they add up to the sum. It works, but was too slow and timed out when the array was huge.

I tried to speed things up a bit by using indexOf() rather than a second for loop, but that actually slowed things down, as indexOf() is like a loop, but with a bunch of checks included in it. 
```
var pairs=function(ints, s){
  for(var i = 1, j= ints.length; i < j; i++) {
    var otherIndex = ints.indexOf(s - ints[i])
    if(otherIndex > -1 && otherIndex < i) return [(s - ints[i]),ints[i]];
  }   
  return undefined;
}
```
<!-- more -->

I then thought about caching or memoization, and that is where the solution lay. Basically, the trick is to create a JavaScript object which holds all the values which have already been seen in the `ints` array. 

```
var pairs=function(ints, s){
//variable to hold numbers already checked
var cached = {};
  for(var i = 0, j= ints.length; i < j; i++) {
    var num = ints[i];
    //the value needed to form a pair
    var num2 = s - num;
    //if have seen num2 already 
    //then this is the answer
    if(num2 in cached) {
      return [num2,num];
    //add num2 to cache
    } else {
      cached[num] = 1;
    }
  }   
  //no pair found
  return undefined;
}
```
