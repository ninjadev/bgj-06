function GameState(){
}

GameState.prototype.init = function(){
    this.elements = [];
    this.t = 0;
    this.spawnRate = 100;
    this.enemyHP = 10;
    this.enemySpeed = 0.01;

    this.lasers = [];
    this.lasers[0] = new Laser("rgb(255,0,0)", Math.PI/4, Math.random()/2-.25);
    this.lasers[1] = new Laser("rgb(0,255,0)", -Math.PI/4, Math.random()/2-.25);

    
    this.enemies = [];
    for(var i = 0; i < 3; i++){
      this.enemies[i] = Enemy.spawnRandom(this.enemyHP,this.enemySpeed);
    }
}

GameState.prototype.pause = function(){
}

GameState.prototype.resume = function(){

}

GameState.prototype.render = function(ctx){
  for (var i=0;i<this.lasers.length;i++){
    var laser = this.lasers[i];
    laser.render();
  }

  for (var i=0;i<this.enemies.length;i++){
    var enemy = this.enemies[i];
    enemy.render(ctx);
  }

}

GameState.prototype.update = function(){
  this.t++;

  if(this.t % this.spawnRate == 0){
    this.enemies.push(Enemy.spawnRandom(this.enemyHP,this.enemySpeed))
  }

  for (var i=0;i<this.lasers.length;i++){
    var laser = this.lasers[i];
    laser.update(this.t);
  }

  for (var i=0;i<this.enemies.length;i++){
    var enemy = this.enemies[i];
    enemy.update();
  }
}
