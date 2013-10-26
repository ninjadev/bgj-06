function GameState(){
}

GameState.prototype.init = function(){
  this.elements = [];
  this.t = 0;

  this.pot = new Pot();
  this.cash = new Cash();

  this.spawnRate = 100;
  this.enemyHP = 10;
  this.enemySpeed = 0.03;

  this.enemies = [];
  for(var i = 0; i < 3; i++){
    this.enemies[i] = Enemy.spawnRandom(this.enemyHP,this.enemySpeed);
  }

  this.laserController = new LaserController();
}

GameState.prototype.pause = function(){
}

GameState.prototype.resume = function(){

}

GameState.prototype.render = function(ctx){
  this.pot.render();

  for (var i=0;i<this.enemies.length;i++){
    var enemy = this.enemies[i];
    enemy.render(ctx);
  }
  this.laserController.render();
}

GameState.prototype.update = function(){
  this.t++;

  if(this.t % this.spawnRate == 0){
    this.enemies.push(Enemy.spawnRandom(this.enemyHP,this.enemySpeed))
  }

  for (var i=0;i<this.enemies.length;i++){
    var enemy = this.enemies[i];
    enemy.update();
  }
  this.laserController.update(t);
}
