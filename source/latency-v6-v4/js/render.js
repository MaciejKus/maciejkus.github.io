var render = {
  //render latency output
  latRender: function(v4,v6) {
    var theHTML;
    if(typeof v6.meanTime !== 'number' || typeof v4.meanTime !== 'number') {
      theHTML = '<strong>Could not find Ipv4 and Ipv6 latency</strong>';
    } else { 
      theHTML = 
      'IPv4 latency is: <strong>' + v4.meanTime + '</strong> ms<p>' +
      'IPv6 latency is: <strong>' + v6.meanTime + '</strong> ms';
    }
    document.getElementById('results').innerHTML = theHTML;
    
  }
};
