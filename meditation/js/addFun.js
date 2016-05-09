document.getElementById("selectEarth").addEventListener("click", 
	function() {
	  changeImage('earth');
});

document.getElementById("selectCity").addEventListener("click", 
	function() {
	  changeImage('city');
});

document.getElementById("selectSpace").addEventListener("click", 
	function() {
	  changeImage('space');
});

//sounds
document.getElementById("selectNewAge").addEventListener("click",
  function() {
	  chooseSong('newage');
});

document.getElementById("selectClassical").addEventListener("click",
  function() {
	  chooseSong('classical');
});

document.getElementById("selectTechno").addEventListener("click",
  function() {
	  chooseSong('techno');
});
