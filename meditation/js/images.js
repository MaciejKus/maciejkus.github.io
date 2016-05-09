var imageLocation = 'images/';
var type = 'earth';
//time between automatic image change
var changeTimer = 10000;
var changeImagesTimed;
//if false, never show same image
var repeatImages = true;
var cont = document.getElementById("content");
//one image change at a time
var changingImage = false;
var currentImage = '';
var images = {
  city: ['16493978338_14fd41834b_k.jpg', 'swQucrP.jpg', '14741281588_488d8b441a_o.jpg', '8DhqLfc.jpg', 'sHmUsCF.jpg'],
  earth: ['21136101110_1dde1c1a7e_o.jpg', 'h1DtT6j.jpg', 'PZMvFuq.jpg', '0fR0RmH.jpg', '20664938416_4e4b224684_h.jpg', 'AmWThvw.jpg', 'UaQJaKH.jpg'],
  space: ['16215270065_f7f4719124_h.jpg','l1UTkZx.jpg','7kxyAfl.jpg']
};

var changeImage = function(newtype) {
	var r;
	//earth is default
	type = newtype ? newtype : 'earth';
	if(images[type].length < 2 || changingImage) return;
	changingImage = true;

	//ensure same image isnt shown twice in a row
	do {
	  r = Math.floor(Math.random() * images[type].length);
	}
	while (currentImage === images[type][r]);
	currentImage = images[type][r];
	if(repeatImages) {
		var image = images[type][r];
	} else {
		var image = images[type].splice(r,1);
	}
	cont.classList.remove('transOut');

	//take a second for css animation to take place (fade)
	window.setTimeout(
		function() {
	    preLoad(imageLocation +  type + "/"  + image);
		}, 1000);
};

var preLoad = function(imageURL) {
  var img = new Image;
	img.src = imageURL;
	img.onload = function() { setBackground(imageURL);};
};

var setBackground = function(imageURL) {
	document.body.style.backgroundImage = "url('" + imageURL + "')";
	cont.classList.add('transOut');
	changingImage = false;
	clearInterval(changeImagesTimed);
	changeImagesTimed = setInterval(function() {
 		 changeImage(type);
	}, changeTimer);
};



changeImage();
