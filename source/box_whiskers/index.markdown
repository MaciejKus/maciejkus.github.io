---
layout: page
title: "Box and Whiskers Plot Calculator"
date: 2015-06-20 12:26
comments: false
description: An accurate Box and Whiskers Plot calculator. 
sharing: true
footer: true
---
<p>
This is an accurate box and whiskers plot calculator. It might be the only accurate box and whiskers calculator one on the Internet. All the others that I have come across contain calculation errors, even with a simple set of numbers such as 1,1,2,2,3,3,4,4. Mainly they are unable to calculate the quartile values correctly. This calculator calculates all the values accurately. </p>
<p>To use this box and whiskers calculator, simply enter a group of numbers into the text box and click 'Submit'. The group of numbers can be either comma separated or space separated. Maybe even a mix of both.</p>
<form onsubmit="return false;">
<textarea placeholder='1 2 3 4...' rows ="4" cols="40" id='input' ></textarea><br>
<button onClick="calc();">Submit</button>
</form>
<p>
Numbers: <span id='numbers'></span>
<br>
Minimum: <span id='minimum'></span>
<br>
Maximum: <span id='maximum'></span>
<br>
Median: <span id='median'></span>
<br>
First Quartile: <span id='first'></span>
<br>
Third Quartile: <span id='third'></span>
<br>
<p>
<canvas id='boxCanvas' width='420' height='220' style='border:1px solid #000000;'>Your broswer does not support HTMl5 canvas, so you cannot see the graph</canvas>
<script type='text/javascript' src='box.js'></script>
