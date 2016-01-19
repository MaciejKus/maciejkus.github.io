var h = 800;
var w = 900
var d = 90; //max circle diameter
var dataset = completed.concat(funded);


//used to create a scale for the size of the circles
var rScale = d3.scale.linear()
  .domain([d3.min(dataset, function(d) { return d.raised;}), d3.max(dataset, function(d) { return d.raised;})])
  .range([2,d]);

var force = d3.layout.force()
  .nodes(dataset)
  .size([w,h])
  //repulsion of nodes from one another.  6 works nicely here, so why not? magic
  .charge(function(d) { return  -rScale(d.raised) * rScale(d.raised)/6;})
  .start();

var zoom = d3.behavior.zoom()
 //max zoom in and out ratio
 .scaleExtent([1,14]);


var svg = d3.select('#graph')
  .append('svg')
  .attr('width', w)
  .attr('height', h)
  //zoom zoom
  .call(zoom.on("zoom", function () {
    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
  }))
  .append("g");

var nodes = svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  //larger sized circles = larger amount of $ raised
  .attr('r', function(d) {
    return rScale(d.raised);
  })
  .attr('fill', function(d) {
    if(d.complete === 'complete') {
      //10 times percent. this colors the circles, with the ligher colored circles being ones with a higher returned percent anything above 25 percent (10 * 25  when may is 255 for rbg) returns black
      var red = 10 * d.percentReturned;
      var green = 0;
    } else {
      var green = 10 * d.percentReturned;
      var red = 0;
    }
    return 'rgb(' + parseInt(red) + ',' + parseInt(green) + ',0)'; 
  })
  .attr('opacity', '0.8')
  .on('mouseover', function(d) {
    d3.select(this) 
      .attr('opacity', '1');
    d3.select('.infobox')
      .style('display', 'block');
    d3.select('#name')
      .text(d.name);
    d3.select('#raised')
      .text(d.raised);
    d3.select('#returned')
      .text(d.percentReturned);
    d3.select('#monthly')
      .text(Math.round(100 * d.percentReturned/d.timeReturned)/100);
    d3.select('#followers')
      .text(d.amountRaised);
   })
  .on('mouseout', function() {
    d3.select('.infobox')
      .style('display', 'none');
    d3.select(this) 
      .attr('opacity', '0.8');
   })
  .call(force.drag);

//hover title 
nodes.append('title')
  .text(function(d) {
     return d.name + ' - $' + d.raised;
  });

//what to do on 'tick' aka elapsed time unit
force.on("tick", function() {
  nodes.attr("cx", function(d) { return d.x; })
   .attr("cy", function(d) { return d.y; });
});



/*
svg.selectAll('rect')
  .data(completed)
  .enter()
  .append('rect')
  .attr('x', function(d,i) {
     return i *25;
  })
  .attr('y', function(d) {
     return h - d.percentReturned *10;
  })
  .attr('width', 10)
  .attr('height', function(d) {
    return  d.percentReturned *10 ;
  })
  .attr('fill', 'blue')
  .append('title')
  .text(function(d) {
     return d.name;
  });

svg.selectAll('text')
  .data(completed)
  .enter()
  .append('text')
  .text(function(d) {
     return d.percentReturned;
  })
  .attr('text-anchor', 'middle')
  .attr('x', function(d,i) {
    return i * 25;
  })
  .attr('y', function(d) {
     return h - d.percentReturned *10 - 8;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr('fill', 'black');
*/


/*
var circles = svg.selectAll('circle')
  .data(completed)
  .enter()
  .append('circle');

circles.attr('cx', function(d, i) {
    return (i*50) + 25;
  })
  .attr('cy', diameter)
  .attr('r', function(d) {
    return d.amountRaised/3;
  })
  .attr('fill', 'green');

svg.selectAll('text')
  .data(completed)
  .enter()
  .append('text')
  .text(function(d) {
     return d.name;
  })
  .attr('x', function(d, i) {
     return (i*50) + 25;
  })
  .attr('y', diameter)
  .attr('text-anchor', 'middle');
*/
