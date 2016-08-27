let cheerio = require('cheerio');
let fs = require('fs');

const htmlString = fs.readFileSync('data.html').toString();
let $ = cheerio.load(htmlString);


let links = [];
let nodes = [];

$('div.collection-item-body')
  .map(function(i, c) {
    //get the artist name from the parent
    let par = $(c).parent().attr('data-title');
    let inf = $(c).text();
    //regex for influences
    //note the above returned .text() so no html to regex through
    const re = /Influenced\s*(.*)\n/ig;
    inf = re.exec(inf);
    inf = inf[1].split(',')

    //remove leading and ending white space
    inf.forEach( function(a, i) {
      a = a.trim();

      let link = {
        id: par + a,
        source: par,
        target: a
      }

      links.push(link);

      //check to see if target is an existing node
      let exists = false;
      nodes.forEach(function(v) {
        if(v.id == link.target) exists = true;
      });

      //create node if target does not exist
      if(!exists) {
        nodes.push({
          id: a, 
          label: a 
        });
      }

    });

    let node = {
      id: par,
      label: par
    };
    let exists = false;
    nodes.forEach(function(v) {
      if(v.id == node.id) exists = true;
    });
    if(!exists) {
      nodes.push(node);
    }
});

let ans = {
    nodes: nodes,
    links: links
  }    
  ans = JSON.stringify(ans);
  fs.writeFile('jsonData.json', ans, function(err) {
     if (err) return console.log(err);
});
