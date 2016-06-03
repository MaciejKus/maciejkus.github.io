'use strict';
//a much less accurate latency test
var latFallback = function(callback) {
  var timeout = 500,
      n = 5,
      imageFile = '_utm.gif',
      v4 = {
        times: [],
        meanTime: null,
        url: 'http://ipv4.dev.maciejkus.com/'
      },
      v6 = {
        times: [],
        meanTime: null,
        url: 'http://ipv6.dev.maciejkus.com/'
      };

  //time the loading of the image or null if image fails to load
  //push result into v4/v6.times array
  var imgLoad = function(protocol, testnum) {
    var start, 
        roundTrip = null, 
        img = new Image,
        error,
        timer;

    img.onload = function() {
      roundTrip = +new Date - start;
      protocol.times.push(roundTrip);
      clearTimeout(timer); 
      img.onload = null;
      img = null;
      seeIfAllLoaded();
    };

    img.onerror = function() {
      console.log('Failed to load ' + this.src);
    };

    error = function() {
      console.log('error');
      clearTimeout(timer);
      protocol.times.push(roundTrip);
      img.onload = null;
      img = null;
      seeIfAllLoaded();
    };

    timer = setTimeout(error, timeout);
    start = + new Date;
    img.src = protocol.url + imageFile + '?'+ Math.random();
  };

  var seeIfAllLoaded = function() {
    if( v4.times.length === n && v6.times.length === n) {
      findMean(v4);
      findMean(v6);
      callback(v4,v6);
    }
  };

  //calculate times alternating between v4 and v6 
  var calcNTimes = function() {
    for(var i =0; i < n; i++) {
      imgLoad(v4, i);
      imgLoad(v6, i);
    }
  };

  var findMean = function(protocol) {
    //remove first time due to possible TCP handshake delays
    protocol.times.shift();
    var sum = protocol.times.reduce(function(a,b) {return a+b;});
    protocol.meanTime = sum/protocol.times.length || null;
  };

  calcNTimes();
};

