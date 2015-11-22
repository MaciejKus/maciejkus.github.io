var Boot = function(game){

};
  
Boot.prototype = {

  init: function() {
    this.input.maxPointers = 1;
    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    this.stage.disableVisibilityChange = true;
  },

  preload: function(){

  },
	
  create: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.state.start("Preload");
  }
}
