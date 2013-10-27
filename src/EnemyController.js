function EnemyController(game) {
  this.enemyTypes = ENEMYTYPES();
  this.numberOfWaves = 0;
  this.timeLeftOfWave = 0;
  this.game = game;
  this.enemies = [];
}


EnemyController.prototype.nextWave = function(t, cb){
  this.waveStartTime = t*20;
  this.numberOfWaves++;
  this.cb = cb;
  if (WAVES.length > 0) {
    this.currentWave = WAVES.shift();
  } else {
    this.currentWave = {
      monsters: Object.keys(this.enemyTypes),
      numberOfMonsters: this.numberOfWaves*3,
      scaling: this.numberOfWaves,
      duration: 10000 + 5000*this.numberOfWaves
    };
  }
  this.currentWave.interval = this.currentWave.duration / this.currentWave.numberOfMonsters;
  this.currentWave.numberOfMonstersSpawned = 0;
  this.timeLeftOfWave = this.currentWave.duration;
};


EnemyController.prototype.update = function(t){
  if (this.currentWave !== undefined) {
    var waveTime = t*20-this.waveStartTime;
    this.timeLeftOfWave -= 20;
    if (this.timeLeftOfWave == 0) {
      this.currentWave = undefined;
      this.cb();
    } else {
      if (waveTime > this.currentWave.numberOfMonstersSpawned*this.currentWave.interval) {
        this.currentWave.numberOfMonstersSpawned++;
        this.enemies.push(Enemy.spawnRandom(
          this.generateEnemyType(this.currentWave.monsters)
        ));
      }
    }
  }

  for (var i=0;i<this.enemies.length;i++){
    var enemy = this.enemies[i];
    if (!enemy.update()) {
      this.enemies[i] = this.enemies[this.enemies.length - 1];
      this.enemies.pop();
      if (!this.game.pot.lostLife()) {
        this.game.gameOver();
        break;
      }
    }
  }
};

EnemyController.prototype.render = function(ctx) {
  for (var i=0;i<this.enemies.length;i++){
    var enemy = this.enemies[i];
    enemy.render(ctx);
  }
};


EnemyController.prototype.generateEnemyType = function(enemyTypes) {
  var enemyId = enemyTypes[Math.floor(Math.random()*enemyTypes.length)];
  return this.enemyTypes[enemyId];
}