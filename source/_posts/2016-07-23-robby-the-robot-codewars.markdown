---
layout: post
title: "Robby-the-robot-codewars"
date: 2016-07-23 12:12:24 -0700
comments: false
categories: javascript, codewars
description:  How I solved a maze shortest path with turns.
---

I just solved a 2kyu challenge from codewars called Robby the robot. The algorithm used to solve the challenge was more time consuming than the actual coding, so here I will describe what I did. Others can use this to code their own solution.

I will not be posting any code on here. Codewars is supposed to be a challenge, and posting code here will allow others to cheat. I would be doing them a disservice. Oh, and I did not re-factor or clean up my code before submitting it, so it wouldn't set the best example.

<!--more-->

I didn't clean up the code because I know I will never touch it again. The Robby the robot codewars kata was so specific, it will never be useful to reuse this code.

Anyway, the challenge is this: Find the shortest path from one part of a maze to another, when turns count as a move. 

Lets say the maze looks like this:

S...
....
...T

"S" is the start and "T" is the finish. Dots are valid moves, and hashes are walls that cannot be stepped into. Finally, the starting direction is always facing north.

So my first step was to find the shortest path between the start and end points. I did this using a breadth first traversal. So, every space next to the start point gets a score of 1, every space adjacent to those spaces which we have not already marked gets a 2, and so on. This is only done for spaces which are valid to move into. Walls do not get a number. The result was this:

S123
1234
234T

Now that every possible space has a number, the shortest path would be found by starting at the end (T) and moving backwards along the lowest numbers. So the lowest number next to the "T" is a 4. From there move to a 3, then a 2 then a 1. As you can see, the above has more than one shortest path. For other mazes, there might be a single shortest path.

However, the problem states that a turn in direction counts as a move. And we always start facing north. To account for turns, I keep track of two numbers, the above number of moves, and also a second number which keeps track of the amount of turns used to reach the current space.

The amount of turns used to reach the end for each space would look like this:

S111
2222
333T

Now we are getting somewhere. To reach T from any of the southernmost row would require at least 3 turns, while reaching T from the eastern most row would require only 2 turns.

Finally, I add the numbers of turns and the number of moves needed to reach T together and get:

S123
1234
234T

+

S111
2222
333T

S234
3456
567T

From here we can trace the shortest path with the least amount of turns back from T to S. Just move from T to the lowest number, and keep moving to the lowest adjacent number. The route would be 6-4-3-2-S.

This solution worked for all mazes tested. 
