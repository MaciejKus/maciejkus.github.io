var bullets = [];

var Bullet = function(x,y,dx,dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
};

Bullet.prototype.move = function() {
  this.x += this.dx;
  this.y += this.dy;
};

Bullet.prototype.draw = function() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, bulletSize, bulletSize);
  ctx.fillStyle = 'blue';
  ctx.fill();
};

Bullet.prototype.checkHeroCollision = function() {
  //first do simple check 
  //treat hero as a circle
  //find bullet center:
  var bulCentX = this.x + bulletSize/2;
  var bulCentY = this.y + bulletSize/2;
  var dx = hero.x - bulCentX;
  var dy = hero.y - bulCentY;
  //distance between bullet center and hero center
  var dist = Math.sqrt(dx*dx+dy*dy);
  //sum of bullet size and hero size
  var radSum = bulletSize + heroSize;
  if(dist < radSum) {
    //if the above sinmple check is true
    //check for line against line collisions. that is, if a line of the edge
    // of the hero intercets the line from where the bullet currentlyis to 
    //where the bullet will be next move (current location + this.dx)
    if(intersects(hero.x1,hero.y1,hero.x2,hero.y2,bulCentX,bulCentY,bulCentX + this.dx,bulCentY + this.dy) ||
         intersects(hero.x1,hero.y1,hero.x3,hero.y3,bulCentX,bulCentY,bulCentX + this.dx,bulCentY + this.dy) ||
         intersects(hero.x2,hero.y2,hero.x3,hero.y3,bulCentX,bulCentY,bulCentX + this.dx,bulCentY + this.dy) ) {
      //console.log('HIT');
      hero.hit();
      return true;
    } //end if
    //console.log('Close Call');
  } //end if dist < radSum
  return false;
};

Bullet.prototype.checkEnemyCollision = function() {
  var bulCentX = this.x + bulletSize/2;
  var bulCentY = this.y + bulletSize/2;
  for(var i = 0; i < enemies.length; i++) {
    var dx = enemies[i].x - bulCentX;
    var dy = enemies[i].y - bulCentY;
    var dist = Math.sqrt(dx*dx+dy*dy);
    var radSum = bulletSize + enemySize;
    if(dist < radSum) {
      //if out of life
      if(enemies[i].hit()) {
        enemies.splice(i--,1);
            if(enemies.length <= 0) {
              level++;
              newLevel(level);
            }
      };
      //console.log('enemy hit');
      return true;
    }
  }
}

//if bullet is outside of canvas window, return true;
Bullet.prototype.checkBounds = function() {
  return (this.x > canvas.height || this.x<0 || this.y > canvas.height || this.y < 0);
}


//http://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersects(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};
