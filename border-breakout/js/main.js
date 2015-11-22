var Main = function(game){

};

Main.prototype = {

  create: function() {
    //////////Varibales
    this.brickSize = 64;
    this.brickSpeed = 32;
    this.secondsPerBrickMove = 5;
    this.bricksPerRow = 11;
    this.brickRows = 6;
    this.movingBricks = false; //are bricks movig down
    this.lives = 4; //balls
    //these are set to null for if the game is restarted they are not 
    //in memory
    this.man = null; 
    this.woman = null;


    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.checkCollision.down = false;

    this.game.add.tileSprite(0,0,1028,768, 'atlas', 'background');

    //bricks
    this.bricks = game.add.group();
    this.bricks.enableBody = true;
    this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
   
    //animations in order of bricks. third image is for when destroyed
    this.animations = [
      ['happy_trump', 'talking_trump', 'angry_trump'],
      ['talking_obran','silent_obran','mad_obran'],
      ['vigilante1','vigilante2', 'vigilante3'],
      ['border2','border','border3'],
      ['skinhead2','skinhead','skinhead3'],
      ['kkk1','kkk2','kkk-hanging']
    ];

    for (var x = 0; x < this.bricksPerRow; x++) {
      for ( var y = 0; y < this.brickRows; y++) {
        var curBrick = this.bricks.create(32 + (x * this.brickSize*1.5), -224 + (y * this.brickSize*1.5), 'atlas');
        //last two variables are animations / second and should the animation loop
        curBrick.animations.add('talk', [this.animations[y][0],this.animations[y][1]], Math.floor(Math.random()*2)+2, true);
        //used simply to know which image to show when destroying
        curBrick.imageIndex = y;
        curBrick.animations.play('talk');
        curBrick.body.bounce.set(1);
        curBrick.body.immovable = true;
        //rand is 1 or -1 and decides which direction sprite faces
        var rand = Math.floor(Math.random()*2 + 1);
        if (rand > 1) rand = -1;
        //anchor decides where the sprit is flipped
        //default is at top left so that sprite would be moved
        //when it is flipped. 
        curBrick.anchor.setTo(0.5, 0.5);
        curBrick.scale.setTo(0.5 * rand, 0.5);
      }
    }

    ////////////ball//////////
    this.ball = this.game.add.sprite(this.game.width/2,this.game.height*4/5,'atlas');
    this.ball.frameName = 'ball';
    this.ball.scale.setTo(0.5, 0.5);
    //rotate around center of sprite
    this.ball.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.ball);
    this.ball.body.velocity.x = 0;
    this.ball.body.velocity.y = 0;
    this.ball.body.collideWorldBounds = true;
//    this.ball.outOfBoundsKill = true;
    this.ball.body.bounce.set(1);
    this.ball.checkWorldBounds = true;
    this.ball.events.onOutOfBounds.add(this.ballLost, this);
    this.ball.onPaddle = true;

    /////////////paddle//////
    this.paddle = this.game.add.sprite(this.game.width/2, this.game.height - 100, 'atlas');
    this.paddle.frameName = 'paddle';
    this.game.physics.arcade.enable(this.paddle);
    this.paddle.anchor.setTo(0.5, 0.5);
    this.paddle.body.immovable =  true;
    this.paddle.scale.setTo(0.5, 0.5);
    
    //////child holding paddle
    this.child = this.game.add.sprite(this.game.width/2, this.game.height-50, 'atlas');
    this.child.frameName = 'child';
    this.child.anchor.setTo(0.5, 0.5);
//    this.child.scale.setTo(0.8, 1);

     this.introText1 = this.game.add.text(32, this.game.height/2+64, 'You are a refugee fleeing to a safer land.', {font: "32px Arial", fill: "#000000", align: "center" });
     this.introText2 = this.game.add.text(32, this.game.height/2+96, 'In your path are racists, the border patrol and xenophobic politicians.', {font: "32px Arial", fill: "#000000", align: "center" });
     this.introText3 = this.game.add.text(32, this.game.height/2+128, 'Bounce them out of the way to reach your new home.', {font: "32px Arial", fill: "#000000", align: "center" });

    this.scoreText = this.game.add.text(32, this.game.height - 32, 'Balls: ' + this.lives, {font: "32px Arial", fill: "#000000", align: "center" });

    this.clickToStart();
  },

  update: function() {
    this.ball.angle -= 3;
    if(this.ball.onPaddle) this.ball.x = this.game.input.x;
    this.paddle.x = this.game.input.x;
    this.child.x = this.game.input.x;
    this.game.physics.arcade.collide(this.ball,this.bricks, this.collisionHandler, null, this);
    this.game.physics.arcade.collide(this.ball,this.paddle, this.ballPaddle, null, this);
    if(this.man && this.man.y < 200) this.state.start('GameOver');
  },
  //ball hits brick
  collisionHandler: function(ball, brick) {
     //disables collisions for dead bricks
     brick.body.enable = false;
     //image
     brick.animations.stop(null, true);
     brick.frameName = this.animations[brick.imageIndex][2];
     //roatate brick
     this.game.add.tween(brick).to( {angle: 360 }, 2000, Phaser.Easing.Linear.None, true);
     //shrink brick and kill after shrank
     this.game.add.tween(brick.scale).to( { x: 0.1, y: 0.1 }, 2000, Phaser.Easing.Linear.None, true).onComplete.add(killBrick);
     //bricks needed for scope
     //kinda hacky
     var bricks = this.bricks;
     var me = this;
     function killBrick() {
       brick.kill();
       if (bricks.countLiving() === 0) {
         me.gameWon();
       }
     }

  },
  ballLost: function() {
    this.lives--;
    this.scoreText.setText('Balls: ' + this.lives);
    if (this.lives < 1) {
      this.gameOver();
    }
    this.ball.reset(this.paddle.x, this.paddle.y -20);
    this.ball.body.velocity.y = 0;
    this.ball.body.velocity.x = 0;
    this.ball.onPaddle = true;
    this.clickToStart();
  },
  clickToStart: function() {
     this.startText = this.game.add.text(this.game.width/3, this.game.height/2, 'Click to Shoot', {font: "40px Arial", fill: "#000000", align: "center" });
     this.game.input.onDown.add(this.clickedStart, this);
  },
  clickedStart: function() {
    //add loop where bricks move down every x seconds
    if(!this.movingBricks) {
      this.game.world.remove(this.introText1);
      this.game.world.remove(this.introText2);
      this.game.world.remove(this.introText3);
      this.movingBricks = true;
      this.game.time.events.loop(Phaser.Timer.SECOND * this.secondsPerBrickMove, this.moveBricksDown, this);
    }
    this.game.world.remove(this.startText);
    if (this.ball.body.velocity.y === 0) { this.ball.body.velocity.y = -400; };
    this.ball.onPaddle = false;
  },
  ballPaddle: function(ball, paddle) {
    var diff = 0;
    if( ball.x < paddle.x) {
      diff = paddle.x - ball.x;
      ball.body.velocity.x = -10 * diff;
    } else if (ball.x > paddle.x) {
      diff = ball.x - paddle.x;
      ball.body.velocity.x = 10 * diff;
    } else {
      ball.body.velocity.x = 2 + Math.random() * 8;
    }
  },
  moveBricksDown: function() {
    var gameOverYValue = this.paddle.y; // - this.brickSize * 0.5;
    var speed = this.brickSpeed;
    var me = this;
    this.bricks.forEachAlive(function(brick) {
      brick.y += speed;
      if (brick.y >= gameOverYValue) me.gameOver();
    });
  }, 
  gameWon: function() {
    this.ball.destroy();
    this.paddle.destroy();

    this.game.add.text(this.game.width/3, this.game.height/2, 'Welcome Refugees', {font: "40px Arial", fill: "#000000", align: "center" });
    this.man = this.game.add.sprite(this.game.width/2, this.game.height, 'atlas');
    this.man.frameName = 'man-back1';
    this.man.animations.add('walk', ['man-back2','man-back3',],4,true);
    this.man.animations.play('walk');
    this.game.physics.arcade.enable(this.man);
    this.man.body.velocity.y = -64;

    this.woman = this.game.add.sprite(this.game.width/2-64, this.game.height+12, 'atlas');
    this.woman.frameName = 'robe-back1';
    this.woman.animations.add('walk', ['robe-back2','robe-back3',],4,true);
    this.woman.animations.play('walk');
    this.game.physics.arcade.enable(this.woman);
    this.woman.body.velocity.y = -64;

    this.game.physics.arcade.enable(this.child);
    this.child.animations.add('walk', ['child1','child2',],4,true);
    this.child.animations.play('walk');
    this.child.body.velocity.y = -54;
  },
  gameOver: function(){
    this.game.state.start('GameOver');
  }

};
