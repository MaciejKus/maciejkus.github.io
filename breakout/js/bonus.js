var bonuss =[];

function Bonus(x,y) {
  this.x = x;
  this.y = y;
}

Bonus.prototype.r = 15;
Bonus.prototype.dy = 5;

Bonus.prototype.draw = function() {
  context.beginPath();
  context.fillStyle = 'red';
  context.rect(this.x,this.y,this.r,this.r);
  context.stroke();
  context.fill();
};

Bonus.prototype.move = function() {
  this.y += this.dy;
};

function checkBonus() {
  for (var i =0; i < bonuss.length; i++) {
    if( bonuss[i].y > canvas.height) bonuss.splice(i,1);
    else if(bonuss[i].y+bonuss[i].r > paddle.y && bonuss[i].y < paddle.y+paddle.height && bonuss[i].x > paddle.x && bonuss[i].x+bonuss[i].r < paddle.x+paddle.width) {
      bonuss.splice(i,1);
      addBall();
    }
  }
}
