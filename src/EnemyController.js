function EnemyController(game) {
  this.enemyTypes = ENEMYTYPES();
  this.numberOfWaves = 0;
  this.timeLeftOfWave = 0;
  this.game = game;
  this.enemies = [];
  this.WAVES = WAVES.slice();
}

EnemyController.prototype.nextWave = function(t, cb){
  this.waveStartTime = t*20;
  this.numberOfWaves++;
  this.cb = cb;
  if (this.WAVES.length > 0) {
    this.currentWave = this.WAVES.shift();
  } else {
    this.currentWave = {
      monsters: Object.keys(this.enemyTypes),
      numberOfMonsters: this.numberOfWaves*3,
      scaling: this.numberOfWaves/400,
      duration: 10000 + 4500*this.numberOfWaves
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
      if (this.enemies.length > 0) {
        this.timeLeftOfWave = 20;
      } else {
        this.currentWave = undefined;
        this.game.achievements.give('first_wave_completed');
        this.numberOfWaves == 2 && this.game.achievements.give('good_luck');
        this.cb();
      }
    } else {
      if (waveTime > this.currentWave.numberOfMonstersSpawned*this.currentWave.interval) {
        this.currentWave.numberOfMonstersSpawned++;
        this.enemies.push(Enemy.spawnRandom(
          this.generateEnemyType(this.currentWave.monsters), this.currentWave.scaling
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

EnemyController.prototype.slowDownWithinRadius = function(radius, speedFactor, tickDuration) {
  for (var i=0;i<this.enemies.length;i++){
    var enemy = this.enemies[i];
      if (enemy.getDistanceToCenter() < radius) {
        enemy.addEffect(new SpeedEffect(speedFactor, tickDuration));
      }
  }
}
