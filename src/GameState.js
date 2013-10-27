function GameState(){
}

GameState.prototype.init = function(){

  var that = this;
  this.elements = [
    [function(){
      that.rainbow.ps.explode(CENTER.x, CENTER.y, 8);
      that.achievements.give('first');
      that.spawnMoneyEffect({amount: 1, x: CENTER.x, y: CENTER.y-1});
      that.cash.add(1);
      that.pot.click();
    }, {x:7.5, y:4, w:1, h:1}],
    [function(){that.audioButton.toggleActivated();}, {x:15, y:0, w:1, h:1}]
  ];
  this.t = 0;

  this.bg = loadImage('res/bg.png');
  this.vignette = loadImage('res/vignette.png');

  this.moneyEffects = [];

  this.achievements = new Achievements();

  this.isGameOver = false;

  var playerHP = 20;
  this.pot = new Pot(playerHP);
  this.rainbow = new Rainbow();
  this.cash = new Cash(this.achievements, this);

  this.enemies = new EnemyController(this);
  this.timeToWave = 3000;

  this.laserController = new LaserController();

  this.audioButton = new AudioButton();
  this.upgrades = new Upgrades(this);
  this.shockWave = null;
  this.stats = new Stats(this.achievements);
}

GameState.prototype.spawnMoneyEffect = function(options){
    this.moneyEffects.push(new MoneyEffect(options));
}


GameState.prototype.pause = function(){
}

GameState.prototype.resume = function(){

}

GameState.prototype.render = function(ctx){
  ctx.save();
  var scaler = 16*GU/this.bg.width;
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.bg, 0, 0);
  ctx.restore();
  ctx.save();
  scaler = 16*GU/this.vignette.width;
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.vignette, 0, 0);
  ctx.restore();
  this.rainbow.render();
  this.audioButton.render();

  this.laserController.render();
  this.pot.render();

  this.enemies.render(ctx);

  for (var i=0;i<this.moneyEffects.length;i++){
    var moneyEffect = this.moneyEffects[i];
    moneyEffect.render(ctx);
  }

  if (null !== this.shockWave) {
    this.shockWave.render();
  }
}

GameState.prototype.update = function(){
  var that = this;
  this.t++;

  if (!this.isGameOver) {

    if (this.timeToWave > 0){
      this.timeToWave -= 20;
    } else if (this.enemies.timeLeftOfWave == 0) {
      this.enemies.nextWave(this.t, function () {
        that.timeToWave = 15000;
      });
    } 

    this.enemies.update(this.t);

    this.rainbow.update(t);
    this.laserController.update(t);

    for (var i=0;i<this.moneyEffects.length;i++){
      var moneyEffect = this.moneyEffects[i];
      if(!moneyEffect.update()){
        this.moneyEffects[i] = this.moneyEffects[this.moneyEffects.length-1];
        this.moneyEffects.pop();
      }
    }

    this.pot.update();
    if (null !== this.shockWave) {
      if (!this.shockWave.update()) {
        this.shockWave = null;
      }
    }
  }
}

GameState.prototype.gameOver = function() {
  this.isGameOver = true;
  this.audioButton.pause();
  
  $('#overlay').removeClass('template');
  $('#game-over').removeClass('template');
}

GameState.prototype.activateShockWave = function(type, duration) {
  this.shockWave = new ShockWave(type, this.enemies, duration);
  console.log(this.enemies);
}
