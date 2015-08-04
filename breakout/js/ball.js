var balls = [];
var baseBallSpeed = 8;
//balls[0] = new Ball(400,300,-baseBallSpeed,baseBallSpeed);

function addBall() {
  var newBall = new Ball(300,300,Math.random()*4-2,baseBallSpeed/3);
  balls.push(newBall);
}

function Ball(x,y,dx,dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
}

//radius
Ball.prototype.r = 15;

Ball.prototype.draw = function() {
  context.beginPath();
  context.fillStyle = 'green';
  context.arc(this.x,this.y,this.r,0,2*Math.PI);
  context.fill();
  context.stroke();
}

Ball.prototype.move = function() {
  this.x += this.dx;
  this.y += this.dy;
}

Ball.prototype.checkCollision = function() {
  //walls
  if(this.x - this.r < 0) {
    this.dx = this.dx * (-1);
    //prevent ball from getting stick in wall
    this.x = this.r;
  }
  else if (this.x +this.r > canvas.width) {
    this.dx = this.dx *(-1);
    this.x = canvas.width-this.r;
  }
  //celing
  if(this.y-this.r < 0) {
    this.dy = this.dy*(-1);
    return false;
  }
  //floor
  if(this.y+this.r > canvas.height) {lostBall(this); return true;} //must return true
  //skip calculations is between paddle and bottomBrick
  //just to save time
  if(this.y -this.r > bottomBrick && this.y+this.r < paddle.y) return false;
  //add random bit of movemnet
  var randMove = Math.random()*4 -2;
  // brick collion 
  // only changes diretion once, even though might collide with multiple bricks per move 
  var collidedWithBrick = 0;
  for (var i = 0, j = bricks.length; i < j; i++) {
    if( this.x+this.r > bricks[i].x && this.x-this.r < bricks[i].x+bricks[i].width && this.y+this.r > bricks[i].y && this.y-this.r < bricks[i].y + bricks[i].height) {
      collidedWithBrick = 1;
      if(Math.random() * 20 < 1) bonuss.push(new Bonus(bricks[i].x,bricks[i].y));
      bricks.splice(i,1);
      i--;
      j--;
    } //end if
  }
  if(collidedWithBrick) {
    this.dy = this.dy*(-1);
    this.dx += randMove;
    if (bricks.length < 1) {
       levels.shift();
       newLevel();
    }
  }
  //paddle collsion
  //consider this.y - this.r < paddle.y + paddle.height. this this.r part makes it hit even at the lowest point. might want to not change this.dy at such alow point
  if(this.y + this.r > paddle.y && this.y - this.r  < paddle.y + paddle.height) {
    if (this.dx > 0 ) {
      //hit on left edge of paddle
      if(this.x+this.r < paddle.x + this.dx && this.x + this.r > paddle.x) {
        this.x = paddle.x - this.r;
        this.dx = baseBallSpeed * -1.5 +randMove;
        this.dy = baseBallSpeed * -1.5;
      } else if( this.x +this.r > paddle.x && this.x - this.r < paddle.x + paddle.width) {
        this.y = paddle.y - this.r;
        this.dy = -baseBallSpeed;
        this.dx = baseBallSpeed - (baseBallSpeed/4) +randMove;
      }
    } else {
      // this.dx is negative
      // right edge of paddle
      if(this.x-this.r > paddle.x + paddle.width + this.dx && this.x-this.r < paddle.x + paddle.width) {
        this.x = paddle.x + paddle.width + this.r;
        this.dx = baseBallSpeed * 2 + randMove;
        this.dy = baseBallSpeed * -2;
      } else if( this.x +this.r > paddle.x && this.x - this.r < paddle.x + paddle.width) {
        this.y = paddle.y - this.r;
        this.dx = -baseBallSpeed + (baseBallSpeed/4) + randMove;
        this.dy = -baseBallSpeed;
      }
    } //end else
  } //end if
  return false;
};
