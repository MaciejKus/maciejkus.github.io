var paddle = {
  x: canvas.width/2,
  y: canvas.height - 45,
  width: 60,
  height: 20,
  draw: function() {
    context.beginPath();
    context.rect(this.x,this.y,this.width,this.height);
    context.fillStyle = 'red';
    context.fill();
    context.stroke();
  }
};

function getMouseX(c,e) {
  var rect = c.getBoundingClientRect();
  return e.clientX - rect.left -paddle.width/2;
}
 
canvas.addEventListener('mousemove', function(e) {
  var mouseX = getMouseX(canvas, e);
  paddle.x = mouseX;
});
