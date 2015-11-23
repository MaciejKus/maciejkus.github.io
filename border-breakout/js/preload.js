var Preload = function(game){};

Preload.prototype = {

  preload: function(){ 
    this.game.load.atlas('atlas', 'assets/spritesheet.png', 'assets/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.game.load.audio('doh', 'assets/doh.wav');
    this.game.load.audio('bounce', 'assets/bounce.mp3');
  },

  create: function(){
    this.game.state.start("Main");
  }
}
