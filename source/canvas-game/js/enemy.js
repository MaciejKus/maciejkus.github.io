var enemies = [];

var Enemy = function () {
  //x and y is set once moved
  this.life = enemyLife;
  this.r = enemySize;
  this.color = 'rgb(255,0,0)';
  this.angle = Math.random()*6.3; //random start location 360 degrees = around 6.3 radians
  this.counter = Math.floor(Math.random() * (enemyFireSpeed - enemyFireSpeed/3) + enemyFireSpeed/3); //each enemy has different fire time. max is enemyFireSpeed, min is enemyFireSpeed/3
};

Enemy.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.r,0, 2*Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();
  //draw turret
  ctx.beginPath();
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(this.xFire,this.yFire);
  ctx.lineWidth = enemySize/10; //1/10th of the enemy radius
  ctx.stroke();
  ctx.lineWidth = 1;//change linewidth back to 1
};

//move enemy is a circle
Enemy.prototype.move = function() {
  //move speed
  this.angle += enemySpeed;
  this.x = canvas.width/2 + Math.sin(this.angle) * backgroundRadius;
  this.y = canvas.width/2 + Math.cos(this.angle) * backgroundRadius;
};

//find target (hero)
Enemy.prototype.findTarget = function() {
  var xDist = hero.x - this.x;
  var yDist = hero.y - this.y;
  var dist = Math.sqrt(xDist*xDist+yDist*yDist); 
  this.xFire = this.x+this.r*xDist/dist; //where turret ends and bullets start
  this.yFire = this.y+this.r*yDist/dist;
};

Enemy.prototype.shoot = function() {
  if(--this.counter === 0) {
    var dx = this.xFire - this.x;
    var dy = this.yFire - this.y;
    //initial bullet location is past enemy (dx/2)
    var bullet = new Bullet(this.xFire + dx/2,this.yFire + dy/2,dx,dy); 
    bullets.push(bullet);
    this.counter = enemyFireSpeed;
  }
};

//returns true if dead
Enemy.prototype.hit = function() {
  //gets closer to 255 at life gets lower. 
  var brighter = Math.floor(255 - 255 * (this.life)/enemyLife);
  //every hit color gets closer to yellow rgb(255,255,0)
  this.color = 'rgb(255,'+ brighter + ',0)';
  if (--this.life <= 0) { 
    //less bright the less life
    return true;
  }
}
