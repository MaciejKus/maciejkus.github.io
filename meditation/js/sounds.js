var song = document.getElementById('song');
var sounds = {
  newage: ['The_Kyoto_Connection_-_09_-_Hachiko_The_Faithtful_Dog.mp3'],
  classical: ['Kai_Engel_-_04_-_Moonlight_Reprise.mp3'],
	techno: ['Broke_For_Free_-_01_-_Night_Owl.mp3']
}

//songs do not check if the same song is
//selected as user might want to start song
//over from the beginning
var chooseSong = function(type) {
  type = type ? type : 'techno';
	if(sounds[type].length < 1) {
		return;
  }
	var r = Math.floor(Math.random() * sounds[type].length);	
  playSong('sounds/' + type + '/' + sounds[type][r], type);
};

var playSong = function(songURL, type) {
	song.pause();
	song.src = songURL;
	//loop song
	song.addEventListener('ended', function() {
		chooseSong(type);
	}, false);
	song.play();
}
