/*d3 force graph.
* arrows point to the direction of the link
* nodes increase opacity and size when moused over
* clicking on a node freezes the position of that node
* double clicking releases a frozen node
*/

var width = 1020,
    height = 800,
    nodeOpacity = 0.5,
    nodeFontSize = 9,
    radius = 8;

//these settings change how the graph 'acts'
var force = d3.layout.force()
    .gravity(.2)
    .charge(-200)
    .linkDistance(10)
    .size([width, height]);

var svg = d3.select("#d3-graph").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("rs-data/jsonData.json", function(error, graph) {
  if (error) throw error;

  //allow string source and target in links
  //note that 'edges' must be used not 'graph.links'
  var edges = [];
  graph.links.forEach(function(e) { 
    var sourceNode = graph.nodes.filter(function(n) { return n.id === e.source; })[0],
    targetNode = graph.nodes.filter(function(n) { return n.id === e.target; })[0];
    edges.push({source: sourceNode, target: targetNode, value: e.id});
   });

  // build the arrow.
  svg.append("svg:defs").selectAll("marker")
      .data(["end"])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
    .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

  var link = svg.selectAll("line")
      .data(edges)
      .enter().append("line")
      .attr("id", function(d) { return d.value;})
      .attr("target", function(d) { return d.target.id;})
      .attr("source", function(d) { return d.source.id;})
      .attr("opacity", nodeOpacity)
      .attr("marker-end", "url(#end)");

  //create node group which will hold both circles and text
  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("id", function(d) { return d.id;})
      .attr("opacity", nodeOpacity)
      .attr("font-size", nodeFontSize + 'px')
      .attr("class", "node");

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.id});

  //interaction only happens with circles
  node.append("circle")
      .attr("class", "node")
      .attr("r", radius - 0.75)
      .on("mousedown", function(d) { d.fixed = true; })
      .on("dblclick", function(d) { d.fixed = false; })
      .on("mouseenter", selectNode)
      .on("mouseleave", unselectNode)
      .style("fill", function(d) { return "#00CED1" })
      .style("stroke", function(d) { return "#00008B"})
      .call(force.drag);

  force
      .links(edges)
      .nodes(graph.nodes)
      .on("tick", tick)
      .start();


  function tick() {
    //stops the redrawing once the graph is close to settled
    if (force.alpha() <0.02) { force.stop(); };

    //bind nodes within graph
    node.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }

  //mouse events
  function selectNode() {
    d3.select(this).attr("r", radius *1.25)
                   .style("fill", "red")

    var thisNode = d3.select(this.parentNode);

    thisNode.select("text").transition()
      .duration(500)
      .style("font-size", (nodeFontSize * 2) + 'px');
    
    var id = this.parentNode.id;

    thisNode.style("opacity", "1");

    //add opactiy to neighbor links
    //and itself (parent node)
    //that is why id is passed into neighbors array
    var influenced = [];
    var influencedBy = []
    link.style("opacity", function(d) { 
      if(d.source.id === id) {
        influenced.push(d.target.id);
        return 1; 
      } else if (d.target.id === id) {
        influencedBy.push(d.source.id);
        return 1; 
      }  
      return nodeOpacity;
    })

    //add opactiy to neightbor nodes
    node.each(function(d) {
      //escape if this node
      if(id === d.id) return;
      if(influenced.indexOf(d.id) > -1) {
        d3.select(this).style("opacity", "1")
                       .style("font-size", (nodeFontSize * 1.4) + "px");
        d3.select(this).select("circle")
                       .style("fill", "#90EE90");
      }
      else if(influencedBy.indexOf(d.id) > -1) {
        d3.select(this).style("opacity", "1")
                       .style("font-size", (nodeFontSize * 1.4) + "px");
        d3.select(this).select("circle")
                       .style("fill", "#FFA07A");
      }
    })

    //add data to sidebar outside of graph
    document.getElementById('currentNode').innerHTML = id;
    document.getElementById('influenced').innerHTML = "<strong>Influenced: </strong>" + influenced.join(', ');
    document.getElementById('influencedBy').innerHTML = "<strong>Influenced By: </strong>" + influencedBy.join(', ') ;
  }

  function unselectNode() {
    node.style("opacity", nodeOpacity);
    node.style("font-size", nodeFontSize + "px");
    node.select("circle").style("fill", "#00CED1");

    d3.select(this).attr("r", radius - 0.75 )
                   
      
    d3.select(this.parentNode).select("text").transition()
      .duration(500)
      .style("font-size", nodeFontSize + 'px');

    link.style("opacity", nodeOpacity);
  }


});


