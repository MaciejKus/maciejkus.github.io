//create first level
newLevel(level);

theGame = function() {
  drawBackground();
  drawScore();
  //go through bullets looking for collisions
  for(var i = 0; i < bullets.length; i++) {
    //if bullet hit hero or is outside of canvas
    if (bullets[i].checkBounds() || bullets[i].checkHeroCollision() || bullets[i].checkEnemyCollision()) {
      bullets.splice(i--, 1);
      continue;
    }
    // move after looking for collision because collision 
    // checks to see where the bullet will be after the move
    bullets[i].move();
    bullets[i].draw();
  } //end for
  //loop through enemies
  for (var j = 0; j < enemies.length; j++) {
    enemies[j].move();
    enemies[j].findTarget();
    enemies[j].draw();
    enemies[j].shoot();
  }
  hero.checkBorderCollision();
  hero.move();
  hero.rotate();
  hero.shoot();
  hero.draw();
};


var theGameInterval = setInterval(theGame, 50);

