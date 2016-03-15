function newLevel(x) {
  bullets = [];
  enemies = [];
  hero.center();
  hero.life = heroLife; 
  //populate x enemies
  while(x > 0) {
    enemies.push(new Enemy);
    x--;
  }
  //stop game loop and start game loop
  //this gives player a chance to see new settings
  if(theGameInterval !== undefined) {
    clearInterval(theGameInterval);
    //quick message for player
    ctx.fillStyle = 'black';
    ctx.fillText('Ready', canvas.width/2, canvas.height/2);
    setTimeout(startNewInterval, 2000);
  }
}

function startNewInterval() {
  theGameInterval = setInterval(theGame, 50);
}
