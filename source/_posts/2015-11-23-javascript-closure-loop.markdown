---
layout: post
title: "Javascript-closure-loop"
date: 2015-11-23 09:30:33 -0800
comments: false
categories: javascript
description:  ECMAScript 2015 (ES6) has a easy solution for the infamous JavaScript closure inside a loop problem.
---

Placing a closure inside a loop in JavaScript was a common source of headaches. The results were often unexpected. ECMAScript 2015 offers a new simple solution.

<!-- more -->

Using a codewars.com example as the basic idea, say you have a function which returns an array of functions, which return their index in the array. 

    var callbacks = createFunctions(5); // create an array, containing 5 functions

    callbacks[0](); // must return 0
    callbacks[3](); // must return 3

Well, a closure is a solution that comes to mind, maybe something like this:

    function createFunctions(n) {
      var callbacks = [];

      for (var i=0; i<n; i++) {
        callbacks.push(function() {
          return i;
        });
      }
  
      return callbacks;
    }

But that doesn't work. Every callback will return 'n'.

    var callbacks = createFunctions(5); // create an array, containing 5 functions

    callbacks[0](); // returns 5
    callbacks[3](); // returns 5

The reason is that the only thing happening inside the createFunctions function is that functions are being added to an array. They are not being executed until i=n. At that point each function sees that i is equal to n, and uses the last value of i.

One solution for this is to wrap things in a function that does execute every time the loop is run. Something like:

    function createFunctions(n) {
      var callbacks = [];

      for (var i=0; i<n; i++) {
        (function(x) {callbacks.push(function() {
          return x;
        });
        }(i));
      }
  
      return callbacks;
    }

Now every time the loop increments a function executes and the current value of i is passed into the function which is added to the array. Now you get the expected results.

ECMAScript 2015 (ES6) introduces a new 'let' statement which is a block level scope! Previously all we had was 'var' which was a function-wide scope. 'Let' creates a variable within a block, for example an 'if' or 'for' block.

The new, ECMAScript 2015 solution to the above problem is a lot nicer looking:

    function createFunctions(n) {
      var callbacks = [];

      for (var i=0; i<n; i++) {
        let x = i; //x has a scope only within the 'for' loop
         callbacks.push(function() {
          return x;
        });
      }
  
      return callbacks;
    }

Pretty Exciting!
