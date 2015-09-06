var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
//  lives = 3;
  fps = 30;

//draw stuff
mainLoopRender = function() {
  context.beginPath();
  context.clearRect(0,0,canvas.width,canvas.height);
  for (var i = 0, j = balls.length; i < j; i++ ) {
    balls[i].draw();
  }
  for (i = 0, j = bricks.length; i < j; i++ ) {
    bricks[i].draw();
  }
  for (i = 0;  i < bonuss.length; i++) {
    bonuss[i].draw();
  }
  paddle.draw();
  requestAnimationFrame(mainLoopRender);
};

//lost
lostBall = function(ball) {
  balls.splice(balls.indexOf(ball),1);
  if(balls.length < 1) addBall();
};

//logic stuff
mainLoopLogic = function() {
  for (var i = 0, j = balls.length; i < j; i++ ) {
    balls[i].move();
    //only returns true if ball removed
    if(balls[i].checkCollision()) {
      i--;
      j--;
    }
  }
  for (i = 0; i < bonuss.length; i++) {
    bonuss[i].move();
  }
  checkBonus();
  timer = setTimeout(mainLoopLogic, 1000/fps);
};

window.onload = function() {
  newLevel();
  addBall();
  mainLoopRender();
  mainLoopLogic();
};
