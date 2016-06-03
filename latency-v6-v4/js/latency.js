'use strict';

//to find latency run lat.loadImages();
var lat = function(callback) {

  //browser compatability check 
  if ( !('performance' in window) ||
    !('getEntriesByType' in window.performance) ||
    !(window.performance.getEntriesByType('resource') instanceof Array)
  ) {
    console.log('PerformanceResourceTiming not supported');
    //fall back latency test
    if (typeof latFallback === 'function') latFallback(callback);
    return;  
  }

  var v4 = {
      times: [],
      meanTime: null,
      url: 'http://ipv4.dev.maciejkus.com/'
    },
    v6 = {
      times: [],
      meanTime: null,
      url: 'http://ipv6.dev.maciejkus.com/'
    },
    //images that failed to load. likely will be empty or
    //contain all ipv6 images
    doNotCount = [],
    imageFile = '_utm.gif',
    //number of tests 
    n = 15,
    loadedCounter = 0,
    timeoutTime = 2000,
    callback = callback || function() {console.log('no callback given to latency check');},
    timeFun = null;


  var imgLoad =  function(protocol, testnum) {
    var start, 
        img = new Image,
        error,
        timer;

    img.onload = function() {
      //console.log('loaded ' + this.currentSrc);
      loadedCounter++;
      areAllLoaded();
    };

    img.onerror = function() {
      console.log('error loading ' + this.currentSrc);
      doNotCount.push(this.currentSrc);
      loadedCounter++;
      areAllLoaded();
    };

    img.src = protocol.url  + imageFile + '?' + Math.random(); 
      
  };

  var areAllLoaded = function() {
    if(loadedCounter === (n * 2)) {
      clearTimeout(timeFun);
      timeFun = null;
      checkImages();
    }
  };

  //load n images, alternate between v4 and v6
  var loadImages = function() {
    for(var i =0, j = n; i < j; i++) {
      imgLoad(v4, i);
      imgLoad(v6, i);
    }
    timeFun = setTimeout(imgsTimeout.bind(this), timeoutTime);
  };

  var imgsTimeout = function() {
    console.log('latency test time out');
    clearTimeout(timeFun);
    callback(v4,v6);
  };


  //find latency of loaded images
  //see https://www.w3.org/TR/resource-timing/
  var checkImages = function() {
    var resourceList = window.performance.getEntriesByType("resource");
    var re6 = new RegExp(v6.url, 'g');
    var re4 = new RegExp(v4.url, 'g');
    for (var i = 0; i < resourceList.length; i++) {
      var res = resourceList[i];
      if( res.initiatorType === "img") {
        //look at domain name and ensure this came 
        //from the widget and not from the main page
        if(
            res.name.match(re4)
            && (doNotCount.indexOf(res.name) === -1)
            && ((res.responseEnd - res.requestStart) > 0)
          ) {
          v4.times.push(res.responseEnd - res.requestStart);
        } 
        if(
            res.name.match(re6)
            && (doNotCount.indexOf(res.name) === -1)
            && ((res.responseEnd - res.requestStart) > 0)
        ) {
          v6.times.push(res.responseEnd - res.requestStart);
        }
      }
    }  
    findMean(v4);
    findMean(v6);
    callback(v4,v6);
  };

  var findMean = function(protocol) {
    var sum = protocol.times.reduce(function(a,b) {return a+b;}, 0);
    protocol.meanTime = sum/protocol.times.length || null;
  };
  
  loadImages();
};

