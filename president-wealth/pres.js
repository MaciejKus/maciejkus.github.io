var margin = {top: 20, right: 20, bottom: 160, left: 80};
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;

var div = d3.select("body").append("div").attr("class", "toolTip");

// set the ranges
var x = d3.scaleBand()
  .range([0, width])
  .padding(0.1);
//var y = d3.scaleLog()
var y = d3.scaleLinear()
  .range([height, 0]);

var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "xAxis")
      .call(d3.axisBottom(x))
      .selectAll('text')
   .attr('transform', 'rotate(65 -10 10)')
 .attr("dx", "-.8em")
 .style("text-anchor", "start");

  // add the y Axis
  svg.append("g")
      .attr("class", "yAxis") 
      .call(d3.axisLeft(y));

    //left title
  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 -  margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "0.8em")
        .style("text-anchor", "middle")
        .text('Millions of 2016 US Dollars');

      //top title
var topTitle = svg.append("text")
        .attr("y", (0))
        .attr("x", (width / 2))
        .style("text-anchor", "middle")
        .text('USA Presidential Wealth');


d3.csv("presidents.csv", function(data) {
  x.domain(data.map(function(d) { return d.Name;}));
  y.domain([0, d3.max(data, function(d) { return parseInt(d.Worth);})])  

  /*
  var rep = 0;
  var dem = 0;
  data.forEach(function(d) {
    if(d.Party == 'Republican') rep += parseInt(d.Worth)
    if(d.Party == 'Democratic') dem += parseInt(d.Worth)
  })
  console.log(rep)
  console.log(dem)
 */
  
  svg.select('.xAxis').transition().duration(500).call(d3.axisBottom(x))
      .attr("class", "xAxis")
          .selectAll('text')
           .attr('transform', 'rotate(65 -10 10)')
          .attr("dx", "-.8em")
         .style("text-anchor", "start");

  svg.select(".yAxis").transition().duration(500).call(d3.axisLeft(y)) 
      .attr("class", "yAxis")

  var bars = svg.selectAll("rect")
      .data(data)
        .enter()
      .append('rect')
      .attr('class', function(d) {
        if(d.Party === 'Democratic')  return 'dem';
        if(d.Party === 'Republican')  return 'rep';
        return 'bar';
      })
      .attr("x", function(d, i){ return x(d.Name) })
       .attr("y", function(d){ return y(0) })
       .attr("height", function(d){ 0; })
      .attr("width", x.bandwidth())
         .on("mousemove", function(d){
                             div.style("left", d3.event.pageX+10+"px");
                             div.style("top", d3.event.pageY-25+"px");
                             div.style("display", "inline-block");
                             div.html((d.Name)+"<br>"+(d.Worth)+" Million Dollars<br>" + (d.Party));
                         })
           .on("mouseout", function(d){
                               div.style("display", "none");
                           })
        .transition()
        .duration(1000)
       .attr("height", function(d){ return height - y(d.Worth); })
       .attr("y", function(d){ return y(d.Worth) })


     function byDate() {
        x.domain(data.sort(function(a, b) {
           return d3.ascending(parseInt(a.Years), parseInt(b.Years));
        }).map(function(d) { return d.Name;}))

      svg.select('.xAxis')
            .call(d3.axisBottom(x))
      .selectAll('g')

      svg.selectAll("rect")
           .sort(function(a, b) {
           return d3.ascending(parseInt(a.Years), parseInt(b.Years));
         })
         .transition()
         .duration(1000)
         .attr("x", function(d, i) {
            return x(d.Name);
          });
     } //end by Date

     function byWealth() {
        x.domain(data.sort(function(a, b) {
           return d3.descending(parseInt(a.Worth), parseInt(b.Worth));
        }).map(function(d) { return d.Name;}))

      svg.select('.xAxis')
            .call(d3.axisBottom(x))
      .selectAll('g')

      svg.selectAll("rect")
           .sort(function(a, b) {
           return d3.descending(parseInt(a.Worth), parseInt(b.Worth));
         })
         .transition()
         .duration(1000)
         .attr("x", function(d, i) {
            return x(d.Name);
          });
     } //end by Worth

     function byParty() {
        x.domain(data.sort(function(a, b) {
           return d3.descending(a.Party, b.Party);
        }).map(function(d) { return d.Name;}))

      svg.select('.xAxis')
            .call(d3.axisBottom(x))
      .selectAll('g')

      svg.selectAll("rect")
           .sort(function(a, b) {
           return d3.descending(a.Party, b.Party);
         })
         .transition()
         .duration(1000)
         .attr("x", function(d, i) {
            return x(d.Name);
          });
     } //end by Worth

       //////
       var sortSelection = document.getElementById('selectOrder');
       sortSelection.onchange = function(n) {
         var selection = n.target.value;
         if(selection === 'date') {
            byDate();
            return;
         }
         if(selection === 'wealth') {
            byWealth();
            return;
         }
         if(selection === 'party') {
           byParty();
           return;
        }
       } //end onchange

})

