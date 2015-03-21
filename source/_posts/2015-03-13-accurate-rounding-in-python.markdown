---
layout: post
title: "Accurate Rounding In Python"
date: 2015-03-13 14:25:15 -0700
comments: false
categories: python
description: How to round in python
---

Rounding floats doesn't work all that well. I was using python to write some code which outputs math problems related to rounding. I needed the problems to use random numbers, so I just used 
```
num= random.uniform(.5,10.9)
```
which returns a random floating point number. Easy enough. Later on I needed to round this to an integer, however, rounding floating numbers doesn't always work as expected. This is pretty well documented all over the Internet, yet a simple solution took me a bit more time than it should have. At one point I just thought about turning the number into a string, parsing out the digit after the decimal point and if it was greater than 4 rounding up and if not, rounding down. That would have worked.

But I was stubborn and figured there must be a more mathy way of doing things. The solution was:
```
round1 = Decimal(format( num1, '.2f'))
round1 = Decimal(round1.quantize(Decimal('1')))
```
Turn the number into a decimal, and then round. All arithmetic functions such as "+" still work fine without having to convert back to float or anything like that.
