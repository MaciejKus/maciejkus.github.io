var GameOver = function(game){};

GameOver.prototype = {

  	create: function(){
          this.button1 = game.add.button(game.world.centerX-64, 64, 'atlas', function() {
            this.restartGame();
         }, this, 'pagain', 'pagain', 'pagain');
          this.game.add.text(32, this.game.height/4, 'Or if you really want to help check out:', {font: "40px Arial", fill: "#FFF", align: "center" });
          this.button2 = game.add.button(game.world.centerX + 50, game.world.centerY - 100, 'atlas', function() {
            window.location.href = "http://www.refugees-welcome.net/";
         }, this, 'refugees-welcome', 'refugees-welcome', 'angry_trump');
          this.button3 = game.add.button(game.world.centerX - 250, game.world.centerY - 100, 'atlas', function() {
            window.location.href = "http://www.noii.org.uk/";
         }, this, 'noii', 'noii', 'mad_obran');
	},

	restartGame: function(){
		this.game.state.start("Main",true,false);
	}
	
}
