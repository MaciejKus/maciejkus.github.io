movedThis = false;
var hero = {
  life: heroLife,
  counter: 1, //able to shoot right away
  r: enemySize,
  color: 'green',
  angle: 0,

  //centers hero
  center: function() {
    this.x = canvas.width/2;
    this.x1 = canvas.width/2-heroSize;
    this.x2 = canvas.width/2;
    this.x3 = canvas.width/2;
    this.y = canvas.height/2;
    this.y1 = canvas.height/2,
    this.y2 = canvas.height/2+heroSize;
    this.y3 = canvas.height/2 - heroSize;
  },

  draw: function() {
    ctx.beginPath();
    var theX = this.x*Math.cos(this.angle)+this.y*Math.sin(this.angle);
    var theY = this.y*Math.cos(this.angle)-this.x*Math.sin(this.angle);
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.lineTo(this.x3,this.y3);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  },

  rotate: function(a) {
    // variable a passed when needing to rotate certain amount, such as 180 degreees
    // in radians of course
    this.angle = a ||  heroSpin * heroAngle;
    //to rotate around centroid rather than origin
    var u = this.x;
    var v = this.y;
    //using temp numbers so that the first three equations for x 
    //do not affect the second three equations for y. 
    //otherwise the triangle shrinks
    var tempx1 = this.x1,
        tempx2 = this.x2,
        tempx3 = this.x3;
    this.x1 = u + (this.x1-u) * Math.cos(this.angle) + (this.y1-v)*Math.sin(this.angle);
    this.x2 = u + (this.x2-u) * Math.cos(this.angle) + (this.y2-v)*Math.sin(this.angle);
    this.x3 = u + (this.x3-u) * Math.cos(this.angle) + (this.y3-v)*Math.sin(this.angle);
    this.y1 = v + (this.y1-v)*Math.cos(this.angle) - (tempx1-u) * Math.sin(this.angle);
    this.y2 = v + (this.y2-v)*Math.cos(this.angle) - (tempx2-u) * Math.sin(this.angle);
    this.y3 = v + (this.y3-v)*Math.cos(this.angle) - (tempx3-u) * Math.sin(this.angle);
    //find new centroid
    this.x = (this.x1 + this.x2 + this.x3)/3;
    this.y = (this.y1 + this.y2 + this.y3)/3;
  },

  //move vertically or horizontally, not rotation
  move: function() { 
    //find direction of movement by finding vector from centroid to 'forward' point of triangle
    var xDiff = this.x1 - this.x;
    var yDiff = this.y1 - this.y;
    var forwardMultiplier = 1.6; //spped increase if forward arrow pressed
    //move each coordinant point in triangle
    //xDiff/yDiff is directon of movement
    // heroSize is used to slow down the direction of movemnet.
    // probably can use something other than heroSize, but it works nicely
    // parseInt seems to have stopped minor bug where hero would someitmes
    // get 'stuck' when moving through circle boudry
    this.x1 += parseInt((forwardMultiplier + heroDir) * (moveSpeed * xDiff /heroSize));
    this.x2 += parseInt((forwardMultiplier + heroDir) * (moveSpeed * xDiff /heroSize));
    this.x3 += parseInt((forwardMultiplier + heroDir) * (moveSpeed * xDiff /heroSize));
    this.y1 += parseInt((forwardMultiplier + heroDir) * (moveSpeed * yDiff /heroSize));
    this.y2 += parseInt((forwardMultiplier + heroDir) * (moveSpeed * yDiff /heroSize));
    this.y3 += parseInt((forwardMultiplier + heroDir) * (moveSpeed * yDiff /heroSize));
  },

  checkBorderCollision: function() {
    //assuming circle is in center of canvas
    if(movedThis) return;
    var xDist = this.x - canvas.width/2;
    var yDist = this.y - canvas.height/2;
    var distance = Math.sqrt(xDist * xDist + yDist * yDist);
    //out of bounds
    if (distance > backgroundRadius) {
      this.x1 = canvas.width - this.x1;
      this.x2 = canvas.width - this.x2;
      this.x3 = canvas.width - this.x3;
      this.y1 = canvas.height - this.y1;
      this.y2 = canvas.height - this.y2;
      this.y3 = canvas.height - this.y3;
      this.x = (this.x1 + this.x2 + this.x3)/3;
      this.y = (this.y1 + this.y2 + this.y3)/3;
      this.rotate(Math.PI); //rotate 180 degrees
    } 
  },

  shoot: function() {
    //only shoot if counter is ok and space bar was pressed
    if(--this.counter <= 0 && heroShoot ) {
      var dx = this.x1 - this.x;
      var dy = this.y1 - this.y;
      //start position is this.x1+dx/2 so the hero doesnt get hit by 
      //the bullet she just fired
      var bullet = new Bullet(this.x1 + dx/2, this.y1 +dy/2, dx, dy);
      bullets.push(bullet);
      this.counter = heroShootSpeed; //reset shoot clock
    } //end if
  },

  hit: function() {
    if(--this.life <=0) {
      //console.log('HERO DIED');
      newLevel(level);
    }
  }
};

